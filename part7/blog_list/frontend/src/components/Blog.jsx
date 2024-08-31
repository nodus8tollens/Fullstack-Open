import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../context/NotificationContext";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotification();

  const [viewDetails, setViewDetails] = useState(false);

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

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };

  const increaseLikeMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.updateBlog(id, blog),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) => {
        oldBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog,
        );
      });
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (error) => {
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

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    };
    increaseLikeMutation.mutate({ id: blog.id, blog: updatedBlog });
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) => {
        oldBlogs.filter((blog) => blog.id !== id);
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error deleting blog ${error.message}`,
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

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  return (
    <div style={blogStyle} className="blog-container">
      {!viewDetails ? (
        <div className="blog-summary">
          <div className="blog-title">Title: {blog.title}</div>
          <div className="blog-author">Author: {blog.author}</div>
          <button
            className="view-details-button"
            data-testid="view-details-button"
            onClick={toggleDetails}
          >
            View
          </button>
        </div>
      ) : (
        <div className="blog-details">
          <div className="blog-title">Title: {blog.title}</div>
          <div className="blog-author">Author: {blog.author}</div>
          <div className="blog-url">URL: {blog.url}</div>
          <div>
            <div
              className="blog-likes"
              data-testid="blog-likes"
              style={inlineStyle}
            >
              Likes: {blog.likes}
            </div>
            <button
              className="like-blog-button"
              style={inlineStyle}
              data-testid="like-blog-button"
              onClick={() => handleLike(blog)}
            >
              Like
            </button>
          </div>
          <div className="blog-user">
            User: {blog.user && blog.user.name ? blog.user.name : ""}
          </div>
          <div>
            <button
              className="hide-details-button"
              onClick={toggleDetails}
              style={inlineStyle}
            >
              Hide
            </button>
            {blog.user && blog.user.username === user.username && (
              <button
                style={inlineStyle}
                className="delete-blog-button"
                data-testid="delete-blog-button"
                onClick={() => handleDelete(blog)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
