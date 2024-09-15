import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import blogService from "../services/blogs";
import { v4 as uuidv4 } from "uuid";

const Comments = ({ blog }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.comments);
  const { state: notification, dispatch: dispatch } = useNotification();
  const queryClient = useQueryClient();

  const postCommentMutation = useMutation({
    mutationFn: ({ id, blog }) => blogService.updateBlog(id, blog),
    onSuccess: () => {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Comment posted.", error: false },
      });

      queryClient.invalidateQueries(["blog", blog.id]);
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error posting comment: ${error.message}`,
          error: true,
        },
      });
    },
    onSettled: () => {
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleComment = (event) => {
    event.preventDefault();
    const newComment = { id: uuidv4(), text: comment };
    const updatedBlog = { ...blog, comments: [...blog.comments, newComment] };

    postCommentMutation.mutate({ id: blog.id, blog: updatedBlog });
    setComment("");
    setComments(updatedBlog.comments);
  };

  return (
    <div>
      <h3>Comments:</h3>

      <form onSubmit={handleComment}>
        <input
          placeholder="Add a comment..."
          type="text"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">Post</button>
      </form>
      {comments.length === 0 ? (
        <p>No comments yet...</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
