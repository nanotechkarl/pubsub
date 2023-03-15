import React from "react";
import { Provider } from "react-redux";
import store from "./store";

const withRedux = (Component) => {
  const WithRedux = (props) => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
  return WithRedux;
};

export default withRedux;
