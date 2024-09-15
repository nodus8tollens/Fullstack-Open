import React from "react";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Blogs = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAllBlogs,
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Blog service not available due to a problem in the server</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel={{ show: "New Note", hide: "Cancel" }}>
        <NewBlog />
      </Togglable>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            {" "}
            {blog.title}{" "}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
