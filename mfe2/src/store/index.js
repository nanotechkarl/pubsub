import React, { useEffect, useState } from "react";
import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { createSharingMiddleware, sharedReducer, setCount } from "mfe1/share";
import PubsubClass, { pubsub } from "topics/pubsub";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case setCount.type:
      return action.payload;
    default:
      return state;
  }
};

// export const pubsubIsolated = new PubsubClass("MFE2"); //TODO put in constants
export const pubsubIsolated = pubsub; //TODO put in constants

const store2 = configureStore({
  reducer: { counterReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pubsubIsolated.middleware),
  devTools: {
    name: "MFE2", //TODO put in constants
  },
});

export default store2;
