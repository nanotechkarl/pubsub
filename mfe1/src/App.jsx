import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { pubsub } from "topics/pubsub";
import { ADVISORIES } from "topics/topics";
import { Provider } from "react-redux";
import store, { pubsubIsolated } from "./store";
import Counter from "./counter";

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
      <Counter />
    </Provider>
  );
};

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
