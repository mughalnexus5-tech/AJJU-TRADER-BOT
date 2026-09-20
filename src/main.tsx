import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { TerminalApp } from "@/components/TerminalApp";
import { AdminPanel } from "@/components/AdminPanel";

const isAdmin = window.location.pathname.replace(/\/+$/, "").toLowerCase() === "/ajjubot";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>{isAdmin ? <AdminPanel /> : <TerminalApp />}</React.StrictMode>,
);
