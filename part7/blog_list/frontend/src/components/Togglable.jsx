import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button data-testid="new-blog-button" onClick={toggleVisibility}>
          {props.buttonLabel.show}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabel.hide}</button>
      </div>
    </>
  );
};

export default Togglable;
