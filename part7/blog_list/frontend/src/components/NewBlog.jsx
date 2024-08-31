import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotification } from "../context/NotificationContext";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "New blog created", error: false },
      });
    },
    onError: (error) => {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error creating blog: ${error.message}`,
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

  const addBlog = async (event) => {
    event.preventDefault();

    newBlogMutation.mutate({ title, author, url });

    await dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { message: "New blog created", error: false },
    });

    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const inlineStyle = {
    display: "inline-block",
    marginRight: 10,
  };

  return (
    <>
      <h3>Create New: </h3>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <input
          className="title-input"
          data-testid="title-input"
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor="author">Author: </label>
        <input
          className="author-input"
          data-testid="author-input"
          type="text"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <br />
        <label htmlFor="url">URL: </label>
        <input
          className="url-input"
          data-testid="url-input"
          type="text"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <br />
        <button
          style={inlineStyle}
          data-testid="create-blog-button"
          className="create-blog-button"
          type="submit"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default NewBlog;
