const NewBlog = ({
  handleCreateBlog,
  title,
  titleChange,
  author,
  authorChange,
  url,
  urlChange,
}) => {
  return (
    <>
      <h3>Create New: </h3>
      <form onSubmit={handleCreateBlog}>
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={title} onChange={titleChange} />
        <br />
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={authorChange}
        />
        <br />
        <label htmlFor="url">URL: </label>
        <input type="text" name="url" value={url} onChange={urlChange} />
        <br />
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default NewBlog;
