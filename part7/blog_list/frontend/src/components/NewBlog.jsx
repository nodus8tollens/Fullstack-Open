import { useState } from "react";

const NewBlog = ({ addBlog, setNotification }) => {
  //States for the NewBlog (create blog) form
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  //Handler func for creating a new blog, adding a new blog in the db (addBlog func),
  //refreshing the states, and setting notifications
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

  const inlineStyle = {
    display: "inline-block",
    marginRight: 10,
  };

  return (
    <>
      <h3>Create New: </h3>
      <form onSubmit={handleCreateBlog}>
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
