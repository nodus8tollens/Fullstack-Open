/* eslint-disable react/prop-types */
const Notification = ({ notificationMessage }) => {
  if (!notificationMessage) return null;

  const notificationStyle = {
    color: notificationMessage.error ? "red" : "green",
    background: "lightgrey",
    fontSize: "20px",
    border: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={notificationStyle}>{notificationMessage.message}</div>;
};

export default Notification;
