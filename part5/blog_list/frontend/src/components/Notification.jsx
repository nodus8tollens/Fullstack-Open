import "./Notification.css";

const Notification = ({ notification }) => {
  if (!notification) return null;

  const className = notification.error ? "error" : "notification";

  return (
    <h3 className={className}>
      {notification.error ? "Error: " : "Notification: "}
      {notification.message}
    </h3>
  );
};

export default Notification;
