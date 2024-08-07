import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.jsx";
import App from "./App.jsx";
import { ThemeProvider } from "@teishi/bulma_theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider initialTheme={{ primary: "primary", secondary: "dark" }}>
  <App />
</ThemeProvider>
    //<RouterProvider router={Router} />
);






/*import { createRoot } from "react-dom/client";
const root= createRoot(document.getElementById("root"));
root.render(<app/>)*/
