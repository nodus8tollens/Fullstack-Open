import { useState } from "react";

const Blog = ({ blog, increaseLike, deleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
  };

  return (
    <div style={blogStyle} className="blog-container">
      {!viewDetails ? (
        <div className="blog-summary">
          {blog.title} {blog.author}
          <button className="view-details-button" onClick={toggleDetails}>
            View
          </button>
        </div>
      ) : (
        <div className="blog-details">
          {blog.title} {blog.author}
          <button className="hide-details-button" onClick={toggleDetails}>
            Hide
          </button>
          <br />
          {blog.url}
          <br />
          {blog.likes}{" "}
          <button
            className="like-blog-button"
            onClick={() => increaseLike(blog)}
          >
            Like
          </button>
          <br />
          {blog.user && blog.user.name ? blog.user.name : ""}
          <br />
          <button
            className="delete-blog-button"
            onClick={() => deleteBlog(blog)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
