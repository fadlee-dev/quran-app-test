import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Create a new Helmet context
const helmetContext = {};

// Check for dark mode preference
const darkModePreference =
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

// Apply dark mode class if needed
if (darkModePreference) {
  document.documentElement.classList.add("dark");
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
