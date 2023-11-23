import React from "react";

import logo from "./logo.svg";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state with an empty UUID
    this.state = {
      uuid: "",
    };
  }

  componentDidMount() {
    window.addEventListener("message", this.handleMessage);
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.handleMessage);
  }
  handleMessage = (event) => {
    const subdomainFrame = document.getElementById("subdomain-frame");
    // Post a message to the subdomain
    subdomainFrame.contentWindow.postMessage(
      event?.data,
      "https://www.skiplisalon.com"
    );
    if (event.origin === "https://www.skiplisalon.com") {
      this.setState({ uuid: event.data });
      localStorage.setItem("uuid", event.data);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>SUB DOMAIN SKIPLI LOCAL STORAGE</h1>
          <p>UUID: {localStorage.getItem("uuid")}</p>
        </header>
        <iframe
          style={{
            visibility: "hidden",
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            width: "1px",
            height: "1px",
          }}
          id="subdomain-frame"
          title="Subdomain Frame"
          src="https://www.skiplisalon.com"
        ></iframe>
      </div>
    );
  }
}

export default App;
