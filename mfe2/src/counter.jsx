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
      setCounter(data);
    };
    pubsubIsolated.subscribeAction(ADVISORIES.counter, callback, dispatch);

    return () => {
      pubsubIsolated.unsubscribeAction(ADVISORIES.counter, callback, dispatch);
    };
  }, [dispatch]);

  return (
    <div>
      <h2>MFE2 Counter: {counter}</h2>
    </div>
  );
};

export default Counter;
