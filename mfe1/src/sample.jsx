import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ADVISORIES } from "topics/topics";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./store";
import { pubsubIsolated } from "./store";
import withRedux from "./provider";

const Sample = () => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const state = useSelector((state) => state);

  useEffect(() => {
    const callback = (data) => {
      setCounter(data);
    };
    pubsubIsolated.subscribeAction(ADVISORIES.counter, callback, dispatch);

    return () => {
      pubsubIsolated.unsubscribeAction(ADVISORIES.counter, callback, dispatch);
    };
  }, [dispatch]);

  const handleClick = () => {
    const increment = counter + 1;
    const res = pubsubIsolated.publishAction(
      ADVISORIES.counter,
      increment,
      dispatch
    );
    setCounter(res.payload.data);
  };

  const handleClick1 = () => {
    dispatch(setData("Normal"));
  };

  return (
    <div
      style={{
        border: "1px solid red",
        padding: "10px",
        marginTop: "10px",
        color: "red",
      }}
    >
      <h4>MFE1</h4>
      <p>result: {counter}</p>
      <p> Pubsub action call in store</p>
      <button onClick={handleClick}>Publish</button>
      <hr />
      <b> result: {state.data}</b>
      <p> Normal action call in store </p>
      <button onClick={handleClick1}>send</button>
    </div>
  );
};

export default withRedux(Sample);
