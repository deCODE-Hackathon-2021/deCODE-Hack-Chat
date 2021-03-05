import React, { Component, useEffect, useState } from 'react';
import styled from 'styled-components';

import Chat from 'apps/Chat';

import Voice from './Voice';

import Box from 'common/Box';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './style.css'

const Header = styled.div`
    display: flex;
    background-color: white;
    height: 350px;
    justify-content: center;
    padding: 16px;
`;

const Content = styled.div`
    display: flex;
    height: 700px;
    justify-content: center;
    background-color: #e5e5e5;
    padding: 8px;
`;

const HeaderInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
    height: 600px;
`;

const ContentInnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    max-width: 900px;
    width: 100%;
    height: 600px;
`;

const VoiceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
`;

const AskButton = styled.button`
    background: ${props => props.primary ? "#0066ff" : "white"};
    color: ${props => props.primary ? "white" : "#0066ff"};
    font-size: 1em;
    margin-top: 31em;
    padding: 0.25em 1em;
    border: 2px solid #0066ff;
    border-radius: 3px;
    width: 100%;
`;

const Submit = styled.button`
    background: ${props => props.primary ? "#0066ff" : "white"};
    color: ${props => props.primary ? "white" : "#0066ff"};
    font-size: 1.5em;
    margin-top: 7em;
    padding: 0.25em 1em;
    border: 2px solid #0066ff;
    border-radius: 3px;
    width: 100%;
`;

const QuesInputForm = styled.form`
    display: flex;
    margin-top: 15px;
`

const QuesInput = styled.input`
    padding: 10px;
    line-height: 140%;
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 1.5em;
`;

const Room = () => {

    return (
        <>
            <Header>
                <HeaderInnerWrapper>
                    <h2>Dealing with anxiety?</h2>
                    Free - Voice Event
                </HeaderInnerWrapper>
            </Header>
            <Content>
                <ContentInnerWrapper>
                    <VoiceWrapper>
                        <Box height={45}>
                            <Voice />
                        </Box>
                        <Box title="Chat" height={55} styles>
                            <Chat />
                        </Box>
                    </VoiceWrapper>
                    <MessageWrapper>
                        <Box title="Q&A" height={100} styles>
                            <Popup trigger={
                                <AskButton primary>Ask Question</AskButton>}
                                modal
                                nested
                            >
                                {close => (
                                    <div className="modal">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header">Submit a Question </div>
                                        <QuesInputForm>
                                            <QuesInput placeholder={"What's your question?"} />
                                        </QuesInputForm>
                                        <Submit primary
                                            onClick={() => {
                                                console.log('modal closed ');
                                                close();
                                            }}
                                        >
                                            Submit
                                            </Submit>
                                    </div>
                                )}
                            </Popup>
                        </Box>
                    </MessageWrapper>
                </ContentInnerWrapper>
            </Content>
        </>
    );
};


export default Room;
