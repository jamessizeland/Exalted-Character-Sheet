import React from "react";
import { Container } from "react-bootstrap";
import { Head } from "./components/head.component";
import { Abilities } from "./components/abilities.component";
import { Attributes } from "./components/attributes.component";

import "./App.scss";

function App() {
  return (
    <div>
      <h1>Abyssal Exalted Character Sheet</h1>
      <Head />
      <Container>
        <Attributes />
        <Abilities />
        <Abilities />
      </Container>
    </div>
  );
}

export default App;
