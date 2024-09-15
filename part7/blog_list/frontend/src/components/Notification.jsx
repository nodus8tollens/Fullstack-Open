import "./Notification.css";
import { Alert } from "react-bootstrap";

const Notification = ({ notification }) => {
  if (!notification) return null;
  //Adds a corresponding class (styling) by checking if the notification state var
  //contains an error variable
  const className = notification.error ? "error" : "notification";

  return (
    <Alert className={className}>
      {notification.error ? "Error: " : "Notification: "}
      {notification.message}
    </Alert>
  );
};

export default Notification;
