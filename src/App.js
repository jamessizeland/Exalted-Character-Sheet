import React, { useEffect, useState } from "react";
import { ipcRenderer } from "electron";
import path from "path";
import { Container } from "react-bootstrap";
import { Bio } from "./components/bio.component";
import { Abilities } from "./components/abilities.component";
import { Attributes } from "./components/attributes.component";
import "./App.css";
let password;
let errorCount = 0;

function App() {
  // Private Data
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    // get settings & values
    ipcRenderer.on("settings:get", (e, settings) => {
      password = settings.databaseKey;
      console.log(password);
    });
    ipcRenderer.on("error:report", (e, error) => {
      errorCount++;
      console.log(errorCount);
      console.error(JSON.parse(error));
    });
    // connectDB(prompt("enter password"));
    // return () => {};
  }, []);

  function showAlert(message, variant = "success", timeout = 3000) {
    setAlert({
      show: true,
      message,
      variant,
    });
    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, timeout);
  }

  // Output
  return (
    <div>
      <h1>Abyssal Exalted Character Sheet</h1>
      <Bio />
      <Container>
        <Attributes />
        <Abilities />
        <Abilities />
      </Container>
    </div>
  );
}

export default App;
