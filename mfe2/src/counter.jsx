import React from "react";
import { useEffect, useState } from "react";
import { ADVISORIES } from "topics/topics";
import { useDispatch } from "react-redux";
import { pubsubIsolated } from "./store";

const Counter = () => {
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const callback = (data) => {
      console.log("receive:", data);
      setCounter(data);
    };
    pubsubIsolated.subscribe(ADVISORIES.counter, callback);
    // dispatch(pubsubIsolated.subscribeAction(ADVISORIES.counter));
    // setCounter(pubsubIsolated.getState(ADVISORIES.counter));
    return () => {
      pubsubIsolated.unsubscribe(ADVISORIES.counter, callback);
      // dispatch(pubsubIsolated.unsubscribeAction(ADVISORIES.counter));
    };
  }, []);

  return (
    <div>
      <h2>MFE2 Counter: {counter}</h2>
    </div>
  );
};

export default Counter;
