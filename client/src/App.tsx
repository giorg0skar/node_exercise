import { useState } from "react";
import "./App.css";
import UserHome from "./components/userHome";
import { backendBaseUrl } from "./helpers";

function App() {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const feedDBWithData = async () => {
    try {
      const response = await fetch(backendBaseUrl + "/api/feedDB", {
        method: "POST",
      });
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
          <div className="h3 d-flex gap-3 align-items-center bg-success">
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
          <form onSubmit={handleSubmit}>
            <label>
              Add a user's id to see their details:
              <input type="text" name="textField"></input>
            </label>
            <button type="submit">Go</button>
          </form>
        </div>
        {selectedUser && <UserHome userId={selectedUser} />}
      </header>
    </div>
  );
}

export default App;
