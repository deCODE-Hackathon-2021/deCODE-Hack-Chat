import {questionsHelper} from "./questions";

export const ACTION_QUESTIONS_RECEIVE_QUESTIONS = 'questions/receiveQuestions';
export const ACTION_QUESTIONS_RECEIVE_QUESTION = 'questions/receiveQuestion';
export const ACTION_QUESTIONS_ADD_QUESTION = 'questions/addQuestion';
export const ACTION_QUESTIONS_TOGGLE_VOTE = 'questions/toggleVote';


export const questionsReceiveQuestions = (questions) => ({
    type: ACTION_QUESTIONS_RECEIVE_QUESTIONS,
    payload: {
        questions
    }
})

export const questionsReceiveQuestion = (question) => ({
    type: ACTION_QUESTIONS_RECEIVE_QUESTION,
    payload: {
        question
    }
})

export const questionsAddQuestion = (question) => () => {
    questionsHelper.addQuestion(question);
}

export const questionsAddVote = (questionId) => () => {
    questionsHelper.addVote(questionId);
}

export const questionsRemoveVote = (questionId) => () => {
    questionsHelper.removeVote(questionId);
}
