/* eslint-disable react/prop-types */
const Notification = (props) => {
  const style = {
    display: props.notificationMessage ? "block" : "none",
  };

  return (
    <div className="message" style={style}>
      {props.notificationMessage}
    </div>
  );
};

export default Notification;
