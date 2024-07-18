import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

// Initializes a global store for component states
// by creating a store object from the reducer function
const store = createStore(reducer);

const App = () => {
  // Handler for dispatching a "GOOD" action
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  // ...
  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };
  // ...
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  // Handler for dispatching a "RESET" action
  const reset = () => {
    store.dispatch({
      type: "ZERO",
    });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
