import React from "react"
import ReactDOM from "react-dom/client"
import "./fonts.css"
import "./index.css"
import App from "./App"
import { NotificationProvider } from "web3uikit"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <NotificationProvider>
        <App />
    </NotificationProvider>
)
