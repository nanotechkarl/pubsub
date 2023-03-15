import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ADVISORIES } from "topics/topics";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./store";
import { pubsubIsolated } from "./store";

const Counter = () => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const state = useSelector((state) => state);

  useEffect(() => {
    const callback = (data) => {
      setCounter(data);
    };
    pubsubIsolated.subscribe(ADVISORIES.counter, callback);
    // dispatch(pubsub.subscribeAction(ADVISORIES.counter));
    // setCounter(pubsub.getState(ADVISORIES.counter));

    return () => {
      pubsubIsolated.unsubscribe(ADVISORIES.counter, callback);
      // dispatch(pubsub.unsubscribeAction(ADVISORIES.counter));
    };
  }, [dispatch, counter]);

  const handleClick = () => {
    const increment = counter + 1;
    // dispatch(pubsubIsolated.publishAction(ADVISORIES.counter, increment));
    pubsubIsolated.publish(ADVISORIES.counter, increment);
    setCounter(increment);
  };

  const handleClick1 = () => {
    dispatch(setData("Normal"));
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
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

export default Counter;
