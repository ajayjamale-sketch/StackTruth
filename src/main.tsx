import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("[StackTruth Diagnostics] Initializing React DOM tree mounting...");

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("[StackTruth Diagnostics] CRITICAL: Root element #root not found in document!");
  } else {
    console.log("[StackTruth Diagnostics] Mounting to #root element successfully.");
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("[StackTruth Diagnostics] ReactDOM.render invoked successfully.");
  }
} catch (error) {
  console.error("[StackTruth Diagnostics] CRITICAL MOUNTING ERROR CAPTURED:", error);
}

