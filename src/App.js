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
      "https://www.skiplisalon.com"
    );
    if (event?.data) {
      this.setState({ uuid: event.data });
    }
  };

  render() {
    const { uuid } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>SUB DOMAIN SKIPLI LOCAL STORAGE</h1>
          <p>UUID: {uuid.length > 0 ? uuid : "No message from root domain"}</p>
        </header>
        <iframe
          id="subdomain-frame"
          title="Subdomain Frame"
          src="https://www.skiplisalon.com"
        ></iframe>
      </div>
    );
  }
}

export default App;
