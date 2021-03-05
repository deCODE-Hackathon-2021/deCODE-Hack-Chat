import React, { useState } from 'react';
import styled from 'styled-components';

const m = [{}, {}];

const Wrapper = styled.div``;

const MessageList = styled.div`
    height: 100%;
    width: 100%;
`;

const Chat = () => {
    const [messageToSend, setMessageToSend] = useState('');

    const sendMessage = e => {
        e.preventDefault();

        // TODO: send message and update chat
    };

    const renderMessageList = ({ messages }) => {
        return (
            <MessageList>
                {messages.map(message => (
                    <Message key={message.id} userName={message.userName} text={message.text} time={message.time} />
                ))}
            </MessageList>
        );
    };

    return (
        <Wrapper>
            {renderMessageList({ messages: m })}
            <form onSubmit={sendMessage}>
                <input
                    value={messageToSend}
                    onChange={e => setMessageToSend(e.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
        </Wrapper>
    );
};

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Message = ({ userName, text, time }) => {
    return (
        <MessageWrapper>
            <b>{userName}</b>
            <div>{text}</div>
            <div>{time}</div>
        </MessageWrapper>
    );
};

export default Chat;
