import { useState } from "react";

const Togglable = (props) => {
  const [visible, setVisible] = useState(false);
  //This component uses the "display" css attribute in order to determine the visibility
  //of its child components via the visible/setVisible state.
  //If the visible variable is non-true, the showWhenVisible (css display attribute) defaults to none
  //thus "hiding" the components' children.
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel.show}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabel.hide}</button>
      </div>
    </>
  );
};

export default Togglable;
