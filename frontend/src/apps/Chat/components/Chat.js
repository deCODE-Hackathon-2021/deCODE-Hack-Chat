import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {chatSendMessage} from "../../../redux/chat/actions";
import {connect} from "react-redux";

const m = [{}, {}];

const Wrapper = styled.div``;

const MessageList = styled.div`
    height: 100%;
    width: 100%;
`;

const mapState = (state) => {
    console.log(state);
    return  ({
        messages: state.chat.messages
    })
}

const mapDispatch = { chatSendMessage }

const Chat = connect(mapState, mapDispatch)((props) => {
    const {
        chatSendMessage,
        messages
    } = props;

    const messageRef = useRef(null);

    const sendMessage = e => {
        e.preventDefault();

        chatSendMessage(messageRef.current.value);
        messageRef.current.value = '';
    };

    const renderMessageList = ({ messages }) => {
        return (
            <MessageList>
                {messages.map(message => (
                    <Message key={message.sid} message={message}/>
                ))}
            </MessageList>
        );
    };

    return (
        <Wrapper>
            {renderMessageList({ messages })}
            <form onSubmit={sendMessage}>
                <input
                    ref={messageRef}
                />
                <input type="submit" value="Submit" />
            </form>
        </Wrapper>
    );
});

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const messageMapState = (state, props) => {
    console.log(props.message.author)
    console.log(state.chat.members)
    console.log(state.chat.members[props.message.author])
    return ({
        member: state.chat.members[props.message.author]
    })

}
const Message = connect(messageMapState)(({ message, member }) => {
    return (
        <MessageWrapper>
            <b>
                {member?.friendlyName}
            </b>
            {message.body}
        </MessageWrapper>
    );
})

export default Chat;
