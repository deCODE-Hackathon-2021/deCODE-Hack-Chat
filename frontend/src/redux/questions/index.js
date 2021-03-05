import {ACTION_QUESTIONS_RECEIVE_QUESTION, ACTION_QUESTIONS_RECEIVE_QUESTIONS} from "./actions";
import produce from "immer";

const initialState = {
    questions: []
}

const questionsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_QUESTIONS_RECEIVE_QUESTIONS:
            return produce(state, draft => {
                draft.questions = action.payload.questions
                draft.questions.sort((a, b) => b.likes.length - a.likes.length);
            })
        case ACTION_QUESTIONS_RECEIVE_QUESTION:
            const {question} = action.payload;

            return produce(state, draft => {
                const existingQuestionIndex = draft.questions.findIndex(q => q.questionId === question.questionId);
                if(existingQuestionIndex >= 0) {
                    draft.questions[existingQuestionIndex] = question;
                } else {
                    draft.questions.push(action.payload.question)
                }
                draft.questions.sort((a, b) => b.likes.length - a.likes.length);
            })
        default:
            return state;
    }
}

export default questionsReducer
