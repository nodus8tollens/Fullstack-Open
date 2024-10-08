import React from "react";
import userService from "../services/users";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error fetching users</div>;
  }

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link state={{ userName: user.name }} to={`/users/${user.id}`}>
                  {user.name}
                </Link>{" "}
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
