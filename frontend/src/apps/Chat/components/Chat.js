import React, {useRef,} from 'react';
import styled from 'styled-components';
import {chatSendMessage} from "../../../redux/chat/actions";
import {connect} from "react-redux";


const Wrapper = styled.div`
    display: flex; 
    flex-direction: column;
    height: calc(100% - 24px);
`;

const MessageList = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    justify-content: stretch;
    overflow-y: auto;
`;

const ChatInputForm = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 8px;
`

const ChatInput = styled.input`
    border: none;
    border-radius: 32px;
    padding: 0.5em 0.75em;
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0,0,0,0.6);
    outline: none;
    flex-grow: 1;
`

const ChatSendButton = styled.svg`
    position: absolute;
    right: 8px;
    top: 5px;
    cursor: pointer;
`

const SelfImage = styled.img`
    border-radius: 32px;
    height: 28px;
    width: 28px;
    margin-right: 8px
`

const mapState = (state) => {
    console.log(state);
    return ({
        messages: state.chat.messages,
        self: state.chat.userData
    })
}

const mapDispatch = {chatSendMessage}

const Chat = connect(mapState, mapDispatch)((props) => {
    const {
        chatSendMessage,
        messages,
        self
    } = props;

    const messageRef = useRef(null);

    const sendMessage = e => {
        e?.preventDefault();

        chatSendMessage(messageRef.current.value);
        messageRef.current.value = '';
    };

    const renderMessageList = ({messages}) => {
        return (
            <MessageList>
                {messages.map(message => (
                    <Message key={message.sid} message={message}/>
                ))}
                <div id={'chat-anchor'} style={{overflowAnchor: 'auto', height: '1px'}}></div>
            </MessageList>
        );
    };

    return (
        <Wrapper>
            {renderMessageList({messages})}
            <ChatInputForm onSubmit={sendMessage}>
                <SelfImage src={self.picture?.data?.url} />
                <ChatInput
                    ref={messageRef}
                    placeholder={'Write a comment...'}
                />
                <ChatSendButton onClick={() => sendMessage()} width="18" height="19" viewBox="0 0 20 21" fill="#0584FE"
                                xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.8373 10.2033L3.11338 11.4914C3.02458 11.5062 2.94125 11.5441 2.87176 11.6014C2.80228 11.6586 2.74909 11.7331 2.71755 11.8175L0.0543605 18.9518C-0.19996 19.6081 0.48609 20.2336 1.11574 19.9188L19.5745 10.6894C19.7023 10.6256 19.8099 10.5274 19.885 10.4058C19.9602 10.2843 20 10.1442 20 10.0013C20 9.85842 19.9602 9.71834 19.885 9.5968C19.8099 9.47526 19.7023 9.37706 19.5745 9.31322L1.11574 0.0838532C0.48609 -0.230971 -0.19996 0.395601 0.0543605 1.05089L2.71857 8.18519C2.74997 8.2697 2.80309 8.34445 2.87259 8.40188C2.94208 8.45931 3.02549 8.49741 3.11441 8.51232L10.8384 9.7993C10.8859 9.80763 10.929 9.83245 10.96 9.8694C10.9911 9.90635 11.0081 9.95307 11.0081 10.0013C11.0081 10.0496 10.9911 10.0963 10.96 10.1332C10.929 10.1702 10.8859 10.195 10.8384 10.2033H10.8373Z"/>
                </ChatSendButton>
            </ChatInputForm>
        </Wrapper>
    );
});

const MessageWrapper = styled.div`
    display: flex;
    align-items: ${props => props.isSelf ? 'flex-end' : 'start'};
    justify-content: ${props => props.isSelf ? 'flex-end' : 'start'};
    margin-bottom: 8px;
    overflow-anchor: none;
`;

const MessageAuthor = styled.div`
    font-size: 0.75em;
    color: rgba(0,0,0, 0.4);
    padding-bottom: 0.15em;
    padding-left: 0.15em;
`

const MessageBubble = styled.div`
   border-radius: 16px;
   padding: 0.5em 0.75em;
   background-color: ${props => !props.isSelf ? 'rgba(0, 0, 0, 0.05)' : '#0584FE'};
   margin-right: 12px;
   max-width: 200px;
   color: ${props => props.isSelf ? 'white' : 'black'};
   word-break: break-all;
`

const MessagePicture = styled.img`
    border-radius: 32px;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    margin-top: 2px;
`

const messageMapState = (state, props) => {
    const member = state.chat.members[props.message.author]
    return ({
        member,
        isSelf: member.identity === state.chat.userIdentity
    })
}
const Message = connect(messageMapState)(({message, member, isSelf}) => {
    console.log(isSelf)
    return (
        <MessageWrapper isSelf={isSelf}>
            <div>
                {!isSelf && <MessageAuthor>
                    {member?.friendlyName}
                </MessageAuthor>}
                <div style={{display: 'flex', alignItems: 'start'}}>
                    {!isSelf && <MessagePicture src={member.attributes.picture}/>}
                    <MessageBubble isSelf={isSelf}>
                        {message.body}
                    </MessageBubble>
                    {isSelf && <MessagePicture src={member.attributes.picture}/>}
                </div>
            </div>
        </MessageWrapper>
    );
})

export default Chat;
