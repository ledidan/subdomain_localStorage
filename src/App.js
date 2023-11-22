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
    // Check if UUID is already in local storage
    const storedUUID = localStorage.getItem("uuid");
    this.sendMessageToSubdomain();
    if (storedUUID) {
      // If UUID exists, use it
      this.setState({ uuid: storedUUID });
    }
    // else {
    //   // If UUID doesn't exist, generate a new one and save it to local storage
    //   const newUUID = uuidv4();
    //   localStorage.setItem("uuid", newUUID);
    //   this.setState({ uuid: newUUID });
    // }
  }

  sendMessageToSubdomain = () => {
    // Get the iframe element
    const subdomainFrame = document.getElementById("subdomain-frame");

    // Post a message to the subdomain
    subdomainFrame.contentWindow.postMessage(
      "Hello from the root domain!",
      "https://www.skiplisalon.com"
    );
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
      </div>
    );
  }
}

export default App;
