import {chatHelpers} from "./chat";

export const ACTION_CHAT_RECEIVE_MEMBERS = 'chat/receiveMembers';
export const ACTION_CHAT_JOIN_MEMBER = 'chat/joinMember';
export const ACTION_CHAT_LEAVE_MEMBER = 'chat/leaveMember';
export const ACTION_CHAT_SEND_MESSAGE = 'chat/sendMessage';
export const ACTION_CHAT_RECEIVE_MESSAGE = 'chat/receiveMessage';
export const ACTION_CHAT_SET_USER_IDENTITY = 'chat/setUserIdentity';

export const chatReceiveMembers = (members) => ({
    type: ACTION_CHAT_RECEIVE_MEMBERS,
    payload: {
        members
    }
})

export const chatJoinMember = (member) => ({
    type: ACTION_CHAT_JOIN_MEMBER,
    payload: {
        member
    }
})

export const chatLeaveMember = (member) => ({
    type: ACTION_CHAT_LEAVE_MEMBER,
    payload: {
        member
    }
})

export const chatReceiveMessage = (message) => ({
    type: ACTION_CHAT_RECEIVE_MESSAGE,
    payload: {
        message
    }
})


export const chatSendMessage = (content) => () => {
    return chatHelpers.sendMessage(content)
}


export const chatSetUserIdentity = (identity) => ({
    type: ACTION_CHAT_SET_USER_IDENTITY,
    payload: {
        identity
    }
})
