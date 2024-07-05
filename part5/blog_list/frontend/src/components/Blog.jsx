import { useState } from "react";

const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      {!viewDetails ? (
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleDetails}>View</button>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleDetails}>Hide</button>
          <br />
          {blog.url}
          <br />
          {blog.likes} <button>Like</button>
          <br />
          {blog.user && blog.user.name ? blog.user.name : ""}
        </div>
      )}
    </div>
  );
};

export default Blog;
