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
    // Validate the origin of the message for security reasons
    const subdomainFrame = document.getElementById("subdomain-frame");
    // Post a message to the subdomain
    subdomainFrame.contentWindow.postMessage("https://www.skiplisalon.com");
    if (event.origin === "https://www.skiplisalon.com") {
      console.log("Received message from root domain:", event.data);
      console.log("Received message from root domain uuid:", event.data.uuid);

      // Handle the data received from the root domain
      const rootDomainUUID = event.data.uuid;

      // Save the root domain UUID to local storage
      localStorage.setItem("rootDomainUUID", rootDomainUUID);

      // Optionally, you can update the state if needed
      this.setState({ uuid: rootDomainUUID });
    }
  };

  render() {
    const { uuid } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>SUB DOMAIN SKIPLI LOCAL STORAGE</h1>
          <p>UUID: {uuid}</p>
        </header>
        <iframe
          // style={{ display: "none" }}
          id="subdomain-frame"
          title="Subdomain Frame"
          src="https://www.skiplisalon.com"
        ></iframe>
      </div>
    );
  }
}

export default App;
