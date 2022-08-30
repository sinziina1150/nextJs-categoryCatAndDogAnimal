import { userReducer } from "./reducers/userReducer";
import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "../redux/reducers/rootReducer";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

const middlewares = [thunk];

const combineReducer = combineReducers({
  user: userReducer,
});

const initStore = () => {
  return createStore(
    combineReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export const warpper = createWrapper(initStore);
