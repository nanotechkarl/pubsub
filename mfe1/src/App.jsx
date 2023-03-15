import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { pubsub } from "topics/pubsub";
import { ADVISORIES } from "topics/topics";
import { Provider } from "react-redux";
import store, { pubsubIsolated } from "./store";
import Counter from "./counter";
import Sample from "./sample";

const App = () => {
  return (
    <>
      <Counter />
      <Sample />
    </>
  );
};

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
