import { createSlice, configureStore } from "@reduxjs/toolkit";
import PubsubClass, { pubsub } from "topics/pubsub";

//#region reducer.ts
const mySlice = createSlice({
  name: "mySlice",
  initialState: {
    data: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { setData } = mySlice.actions;
//#endregion

// export const pubsubIsolated = new PubsubClass("MFE1"); //TODO put in constants
export const pubsubIsolated = pubsub;

//#region store/index.ts
// Create a Redux store that includes the middleware and the pubsub slice
const store = configureStore({
  reducer: mySlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pubsubIsolated.middleware),
  devTools: {
    name: "MFE1", //TODO put in constants
  },
});

export default store;
//#endregion
