import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const { id } = useParams();
  const location = useLocation();
  const { userName } = location.state || {};

  const result = useQuery({
    queryKey: ["userBlogs", id],
    queryFn: () => blogService.getBlogsByUser(id),
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  if (result.isError) {
    return <div>Blog service not available due to a problem in the server</div>;
  }

  const blogs = result.data;

  return (
    <div>
      <h2>{userName}</h2>
      <h3>added blogs</h3>
      {blogs.length === 0 ? (
        <p>No blogs found for this user</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;
