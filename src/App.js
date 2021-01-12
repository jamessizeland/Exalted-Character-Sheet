import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Bio } from "./components/bio.component";
import connectDB from "./modules/db.module";
import { Abilities } from "./components/abilities.component";
import { Attributes } from "./components/attributes.component";

import "./App.scss";

function App() {
  // Private Data

  useEffect(() => {
    connectDB(prompt("enter password"));
    // return () => {};
  }, []);

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
