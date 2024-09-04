import React from "react";
import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../context/UserContext";

const Blogs = () => {
  const { state: userState } = useUser();

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

  return (
    <div>
      <Togglable buttonLabel={{ show: "New Note", hide: "Cancel" }}>
        <NewBlog />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={userState.user} />
      ))}
    </div>
  );
};

export default Blogs;
