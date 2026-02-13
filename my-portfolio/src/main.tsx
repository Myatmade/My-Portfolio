import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AnimationProvider } from "./context/AnimationContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <AnimationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AnimationProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
