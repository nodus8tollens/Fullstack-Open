import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs }) => {
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

  const increaseLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    };
    try {
      const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog);
      returnedBlog.user = blog.user;
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const deleteBlog = async (blog) => {
    console.log(blog);

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
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
          {blog.likes}{" "}
          <button
            onClick={() => {
              increaseLike(blog);
            }}
          >
            Like
          </button>
          <br />
          {blog.user && blog.user.name ? blog.user.name : ""}
          <br />
          <button
            onClick={() => {
              deleteBlog(blog);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
