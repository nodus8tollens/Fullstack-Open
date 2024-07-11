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

  const inlineStyle = {
    display: "inline-block",
    marginRight: 10,
  };

  const toggleDetails = () => {
    setViewDetails(!viewDetails);
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
              Likes:
              {blog.likes}
            </div>
            <button
              className="like-blog-button"
              style={inlineStyle}
              data-testid="like-blog-button"
              onClick={() => increaseLike(blog)}
            >
              Like
            </button>
          </div>

          <div className="blog-user">
            {blog.user && blog.user.name ? blog.user.name : ""}
          </div>
          <div>
            <button
              className="hide-details-button"
              onClick={toggleDetails}
              style={inlineStyle}
            >
              Hide
            </button>
            <button
              style={inlineStyle}
              className="delete-blog-button"
              data-testid="delete-blog-button"
              onClick={() => deleteBlog(blog)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
