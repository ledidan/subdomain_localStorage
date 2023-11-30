import React from "react";
import { v4 as uuidv4 } from "uuid";
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

  // Check if the event origin matches the expected pattern
  subdomainFrame.contentWindow.postMessage(
    event?.data,
    "https://skiplisalon.com"
  );
  const expectedOrigin = new RegExp("^https://skiplisalon/shop/\\w+$");
  if (expectedOrigin.test(event.origin) && event.data !== null) {
    // Extract UUID from the redirected URL
    const uuid = event.data;

    // Update state and local storage with the extracted UUID
    this.setState({ uuid });
    localStorage.setItem(`uuid`, uuid);
  } else {
    // If the origin doesn't match the expected pattern, fall back to local storage
    const storedUuid = localStorage.getItem("uuid");
    if (storedUuid) {
      this.setState({ uuid: storedUuid });
    } else {
      // Generate a new UUID if not found in local storage
      const newUuid = uuidv4();
      localStorage.setItem("uuid", newUuid);
      this.setState({ uuid: newUuid });
    }
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
