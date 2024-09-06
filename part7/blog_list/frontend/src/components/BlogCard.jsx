import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../context/NotificationContext";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Blog = () => {
  const id = useParams().id;
  const queryClient = useQueryClient();
  const { state: notification, dispatch: dispatch } = useNotification();
  const { state: userState } = useUser();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const inlineStyle = {
    display: "inline-block",
    marginRight: 10,
  };

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlogById(id),
    onError: (error) => {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error fetching blog: ${error.message}`,
          error: true,
        },
      });
    },
  });

  const [blogLikes, setBlogLikes] = useState(0);

  useEffect(() => {
    if (blog) {
      setBlogLikes(blog.likes);
    }
  }, [blog]);

  const increaseLikeMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.updateBlog(id, blog),
    onSuccess: (updatedBlog) => {
      const oldBlogs = queryClient.getQueryData(["blogs"]);

      if (oldBlogs) {
        queryClient.setQueryData(["blogs"], (oldBlogs) => {
          return oldBlogs.map((blog) =>
            blog.id === updatedBlog.id ? updatedBlog : blog,
          );
        });
      }

      queryClient.invalidateQueries(["blog", id]);
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error liking blog: ${error.message}`,
          error: true,
        },
      });
    },
    onSettled: () => {
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleLike = () => {
    if (!blog) return;

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    };

    setBlogLikes(updatedBlog.likes);
    increaseLikeMutation.mutate({ id: blog.id, blog: updatedBlog });
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) => {
        return oldBlogs.filter((blog) => blog.id !== id);
      });
      queryClient.invalidateQueries(["blogs"]);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: "Blog deleted successfully",
          error: false,
        },
      });
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error deleting blog: ${error.message}`,
          error: true,
        },
      });
    },
    onSettled: () => {
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>
        {" "}
        <a href={blog.url}>{blog.url} </a>{" "}
      </p>
      <p>Likes: {blogLikes}</p>
      <p>Added by: {blog.user ? blog.user.name : ""}</p>
      <button onClick={handleLike}>Like</button>
      {blog.user && userState.user?.username === blog.user.username && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default Blog;
