import {combineReducers} from "redux";
import chatReducer from "./chat";
import questionsReducer from "./questions";

const rootReducer = combineReducers({
    chat: chatReducer,
    questions: questionsReducer
})

export default rootReducer
