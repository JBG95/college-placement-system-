import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Toaster position="top-center" />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>
);
