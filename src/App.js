import React from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
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

    // this.handleGetPost();
  }
  // handleGetPost = () =>
  //   new Promise((resolve, reject) => {
  //     axios
  //       .get("http://localhost:8000/allPosts")
  //       .then(({ data }) => resolve(data))
  //       .catch(reject);
  //   });
  componentWillUnmount() {
    window.removeEventListener("message", this.handleMessage);
  }

  handleMessage = (event) => {
    const subdomainFrame = document.getElementById("subdomain-frame");
    subdomainFrame.contentWindow.postMessage(
      event?.data,
      "https://skiplisalon.com"
    );
    if (event.origin === "https://skiplisalon.com" && event.data !== null) {
      const receivedData = event.data;
      const { uuid } = receivedData;
      this.setState({ uuid });
      localStorage.setItem("uuid", uuid);
      console.log('uuid from data', receivedData);
      console.log('event.data', event.data);
    } else {
      const storedUuid = localStorage.getItem("uuid");
      if (storedUuid) {
        this.setState({ uuid: storedUuid });
      } else {
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
          <p>UUID: {this.state.uuid}</p>
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
