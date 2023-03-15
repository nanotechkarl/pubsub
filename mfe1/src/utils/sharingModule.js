import { createAction } from "@reduxjs/toolkit";

// Define actions that will update the shared state
export const setCount = createAction("SET_COUNT");

// Define the shared state
const initialState = { count: 0 };

// Function that takes in a store object and returns a Redux middleware that will listen for changes to the shared state and update the other stores accordingly
export const createSharingMiddleware = (store) => {
  return (next) => (action) => {
    // console.log("next :", next);
    // const result = next(action);
    const result = store.dispatch(action);
    // If the action updates the shared state, update the other stores
    if (action.type === setCount.type) {
      store.liftedStore.dispatch(action);
    }

    return result;
  };
};

// Export the shared state
export const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case setCount.type:
      return { ...state, count: 1 };
    default:
      return state;
  }
};
