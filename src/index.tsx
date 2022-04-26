import React from "react";
import ReactDOM from "react-dom/client";
import DevPanel from "./DevPanel";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DevPanel />
  </React.StrictMode>
);
