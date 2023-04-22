import React from "react";

import blobGreen from "./assets/blobGreen.svg";
import Header from "./components/Header/Header";

import "./App.css";
import Footer from "./components/Footer/Footer";
import Card from "./components/Card/Card";

function App() {
  return (
    <div className="App">
      <Header />
      <Card />
      <img
        alt="Green Blob with Blut"
        className="blob blob-end"
        src={blobGreen}
      />
      <img
        alt="Green Blob with Blut"
        className="blob blob-right"
        src={blobGreen}
      />
      <Footer />
    </div>
  );
}

export default App;
