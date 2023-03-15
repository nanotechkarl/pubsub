import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Provider } from "react-redux";
import store from "./store";
import Counter from "./counter";

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
