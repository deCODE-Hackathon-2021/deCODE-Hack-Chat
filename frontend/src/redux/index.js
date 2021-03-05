import {combineReducers} from "redux";
import chatReducer from "./chat";

const rootReducer = combineReducers({
    chat: chatReducer
})

export default rootReducer
