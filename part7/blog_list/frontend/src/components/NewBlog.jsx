import { useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotification } from "../context/NotificationContext";

const NewBlog = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useNotification();

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      const blogs = queryClient.getQueryData(["blogs"]);
      console.log("blogs: ", blogs);
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "New blog created", error: false },
      });
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error creating blog: ${error.message}`,
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

  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;

    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    newBlogMutation.mutate({ title, author, url });

    await dispatch({
      type: "SHOW_NOTIFICATION",
      payload: { message: "New blog created", error: false },
    });

    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000);
  };

  const inlineStyle = {
    display: "inline-block",
    marginRight: 10,
  };

  return (
    <>
      <h3>Create New: </h3>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <input
          className="title-input"
          data-testid="title-input"
          type="text"
          name="title"
        />
        <br />
        <label htmlFor="author">Author: </label>
        <input
          className="author-input"
          data-testid="author-input"
          type="text"
          name="author"
        />
        <br />
        <label htmlFor="url">URL: </label>
        <input
          className="url-input"
          data-testid="url-input"
          type="text"
          name="url"
        />
        <br />
        <button
          style={inlineStyle}
          data-testid="create-blog-button"
          className="create-blog-button"
          type="submit"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default NewBlog;
