import React, { useState } from "react";
import "./App.css";
import { Form, Link, Outlet, useNavigate } from "react-router-dom";
import UserHome from "./components/userHome";

function App() {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  // const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";

  const feedDBWithData = async () => {
    try {
      const response = await fetch(baseUrl + "/api/feedDB", { method: "POST" });
      const data = await response.json();
      if (data) {
        setNotificationMessage(data?.message || "");
      } else {
        setNotificationMessage("Error in loading DB");
      }
    } catch (error) {
      console.error("Failed to load data to db:", error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const textFieldValue = e.target.elements.textField.value;
    setSelectedUser(textFieldValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        {notificationMessage && (
          <div className="h3 d-flex gap-3 align-items-center bg-primary">
            <p className="my-1">{notificationMessage}</p>
            <button
              className="btn fs-5 py-1"
              onClick={() => setNotificationMessage("")}
            >
              X
            </button>
          </div>
        )}
        <h1>Start of the application</h1>
        <button onClick={() => feedDBWithData()} className="btn btn-primary">
          Click to feed data to the db
        </button>

        <div className="d-flex flex-column gap-2 my-4">
          {/* <Form method="post" action="/usersHome">
            <input type="text"></input>
            <button type="submit">Go</button>
          </Form> */}
          <form onSubmit={handleSubmit}>
            <label>
              Add a user's id to see their details:
              <input type="text" name="textField"></input>
            </label>
            <button type="submit">Go</button>
          </form>
          {/* <Link to={"/userHome/2"}>Click to display a User's home page</Link> */}
        </div>
        {/* <Outlet /> */}
        {selectedUser && <UserHome userId={selectedUser} />}
      </header>
    </div>
  );
}

export default App;
