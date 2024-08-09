import "./Notification.css";

const Notification = ({ notification }) => {
  if (!notification) return null;
  //Adds a corresponding class (styling) by checking if the notification state var
  //contains an error variable
  const className = notification.error ? "error" : "notification";

  return (
    <h3 className={className}>
      {notification.error ? "Error: " : "Notification: "}
      {notification.message}
    </h3>
  );
};

export default Notification;
