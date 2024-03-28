import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/error-page";
import UserHome from "./components/userHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "userHome/:userId",
    //     element: <UserHome />,
    //   },
    // ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
