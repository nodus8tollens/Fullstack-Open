import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteFilter from "./components/AnecdoteFilter";
import Notification from "./components/Notification";
import { useReducer } from "react";
import NotificationContext from "./NotificationContext";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <Notification notification={notification} />
        <h2>Anecdotes</h2>
        <AnecdoteFilter />
        <AnecdoteList notificationDispatch={notificationDispatch} />
        <AnecdoteForm notificationDispatch={notificationDispatch} />
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
