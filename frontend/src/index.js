import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const socket = io(serverUrl);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", value);
    setValue("");
  };

  return (
    <div>
      <form>
        <input type="text" value={value} onChange={(e) => handleChange(e)} />
        <button onClick={(e) => handleSubmit(e)}>送信</button>
      </form>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
