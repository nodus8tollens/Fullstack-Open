import { useState } from "react";

const NewBlog = ({ addBlog, setNotification }) => {
  /*
    const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      const result = await blogService.create(newBlog);
      setBlogs(blogs.concat(result));
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification({ message: "New blog created", error: false });
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (error) {
      setNotification({
        message: `Error creating blog: ${error}`,
        error: true,
      });
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  */

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      await addBlog(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification({ message: "New blog created", error: false });
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (error) {
      setNotification({
        message: `Error creating blog: ${error}`,
        error: true,
      });
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  return (
    <>
      <h3>Create New: </h3>
      <form onSubmit={handleCreateBlog}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <br />
        <label htmlFor="url">URL: </label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewBlog;
