import React, {useRef,} from 'react';
import styled from 'styled-components';
import {chatSendMessage} from "../../../redux/chat/actions";
import {connect} from "react-redux";


const Wrapper = styled.div`
    margin: 16px;
    height: 220px;
`;

const MessageList = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    overflow-y: auto;
`;

const ChatInputForm = styled.form`
    display: flex;
`

const ChatInput = styled.input`
    border: none;
    border-radius: 32px;
    padding: 0.5em 0.75em;
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0,0,0,0.6);
    outline: none;
    margin-top: 8px;
    flex-grow: 1;
`

const mapState = (state) => {
    console.log(state);
    return ({
        messages: state.chat.messages
    })
}

const mapDispatch = {chatSendMessage}

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

    const renderMessageList = ({messages}) => {
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
            {renderMessageList({messages})}
            <ChatInputForm onSubmit={sendMessage}>
                <ChatInput
                    ref={messageRef}
                    placeholder={'Write a comment...'}
                />
            </ChatInputForm>
        </Wrapper>
    );
});

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 8px;
`;

const MessageAuthor = styled.div`
    font-size: 0.75em;
    color: rgba(0,0,0, 0.4);
    padding-bottom: 0.15em;
    padding-left: 0.15em;
`

const MessageBubble = styled.div`
   border-radius: 32px;
   padding: 0.5em 0.75em;
   background-color: rgba(0, 0, 0, 0.05);
   margin-right: 16px;
`

const messageMapState = (state, props) => {
    return ({
        member: state.chat.members[props.message.author]
    })

}
const Message = connect(messageMapState)(({message, member}) => {

    return (
        <MessageWrapper>
            <MessageAuthor>
                {member?.friendlyName}
            </MessageAuthor>
            <MessageBubble>
                {message.body}
            </MessageBubble>
        </MessageWrapper>
    );
})

export default Chat;
