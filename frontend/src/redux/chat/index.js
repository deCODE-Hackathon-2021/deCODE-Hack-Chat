import {
    ACTION_CHAT_JOIN_MEMBER,
    ACTION_CHAT_RECEIVE_MEMBERS,
    ACTION_CHAT_RECEIVE_MESSAGE,
    ACTION_CHAT_SET_USER_IDENTITY
} from "./actions";
import produce from "immer";

const initialState = {
    members: {},
    messages: [],
    userIdentity: undefined
}

const chatReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case ACTION_CHAT_RECEIVE_MEMBERS:
            const {members} = action.payload;

            return produce(state, draft => {
                members.forEach(m => {
                    draft.members[m.identity] = m
                })
            });
        case ACTION_CHAT_JOIN_MEMBER:
            const {member} = action.payload;

            return produce(state, draft => {
                draft.members[member.identity] = member
            })
        case ACTION_CHAT_RECEIVE_MESSAGE:
            const {message} = action.payload;

            return produce(state, draft => {
                draft.messages.unshift(message)
            })
        case ACTION_CHAT_SET_USER_IDENTITY:
            return produce(state, draft => {
                draft.userIdentity = action.payload.identity
            })
        default:
            return state;
    }
}

export default chatReducer
