import {w3cwebsocket} from 'websocket'
import {questionsReceiveQuestion, questionsReceiveQuestions} from "./actions";

export const questionsHelper = {};

const initializeQuestions = async (store, user) => {
    const {
        identity
    } = user;

    try {
        const client = new w3cwebsocket(`ws://${window.location.hostname}:3002`)

        questionsHelper.addQuestion = (question) => {
            console.log('adding question')
            client.send(JSON.stringify({
                type: 'addQuestion',
                payload: {
                    userId: identity,
                    question: question.question,
                    isAnon: question.isAnon
                }
            }))
        }

        questionsHelper.addVote = (questionId) => {
            client.send(JSON.stringify({
                type: 'addVote',
                payload: {
                    userId: identity,
                    questionId
                }
            }))
        }

        questionsHelper.removeVote = (questionId) => {
            client.send(JSON.stringify({
                type: 'removeVote',
                payload: {
                    userId: identity,
                    questionId
                }
            }))
        }

        client.onopen = () => {
            console.log('Websocket client connected');
        }
        client.onmessage = (message) => {
            console.log('receive message', message)
            const data = JSON.parse(message.data);
            switch(data.type) {
                case 'questions':
                    store.dispatch(questionsReceiveQuestions(data.payload))
                    break;
                case 'addQuestion':
                    store.dispatch(questionsReceiveQuestion(data.payload))
                    break;
                default:
                    console.log('received unknown message type');
            }
        }
    } catch(e) {
        console.log('Failed to initialize questions.', e);
    }
}
export default initializeQuestions
