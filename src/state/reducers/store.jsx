import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import allReducers from "./index.js";

export const store = createStore(allReducers, {}, applyMiddleware(thunk));
