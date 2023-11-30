import React from "react";
import { v4 as uuidv4 } from "uuid";
import logo from "./logo.svg";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: "",
    };
  }

  componentDidMount() {
    window.addEventListener("message", this.handleMessage);

    // Get the UUID from the query parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const uuidFromQuery = urlSearchParams.get("uuid");

    if (uuidFromQuery) {
      // If UUID exists in the query parameters, use it and save to localStorage
      localStorage.setItem("uuid", uuidFromQuery);
      this.setState({ uuid: uuidFromQuery });
    } else {
      // If UUID doesn't exist in the query parameters, check localStorage
      const storedUuid = localStorage.getItem("uuid");

      if (storedUuid) {
        this.setState({ uuid: storedUuid });
      } else {
        // If no UUID in localStorage, generate a new one
        const newUuid = uuidv4();
        localStorage.setItem("uuid", newUuid);
        this.setState({ uuid: newUuid });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.handleMessage);
  }

  handleMessage = (event) => {
    const subdomainFrame = document.getElementById("subdomain-frame");
    // Post a message to the subdomain
    subdomainFrame.contentWindow.postMessage(
      event?.data,
      "https://skiplisalon.com"
    );
    if (event.origin === "https://skiplisalon.com" && event.data !== null) {
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
          src="https://skiplisalon.com"
        ></iframe>
      </div>
    );
  }
}

export default App;
