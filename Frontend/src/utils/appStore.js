import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import problemReducer from "./problemSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    problems: problemReducer,
  },
});

export default appStore;
