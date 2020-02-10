import { createStore, applyMiddleware } from "redux";
import { RootReducer, IRootState } from "./reducers/RootReducer";
import logger from "redux-logger";
import thunk, { ThunkMiddleware } from "redux-thunk";

export const store = createStore(
    RootReducer, 
    applyMiddleware(thunk as ThunkMiddleware<IRootState> ,logger)
);