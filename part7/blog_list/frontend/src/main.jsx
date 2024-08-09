import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
);