import React, { useState } from "react";
import "./App.css";

function App() {
  const [notificationMessage, setNotificationMessage] = useState("");
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
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <h1>Start of the application</h1>
        <button onClick={() => feedDBWithData()} className="btn btn-primary">
          Click to feed data to the db
        </button>
      </header>
    </div>
  );
}

export default App;
