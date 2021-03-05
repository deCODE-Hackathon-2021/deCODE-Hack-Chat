import React from 'react';
import styled from 'styled-components';

import Chat from 'apps/Chat';

import Voice from './Voice';

import Box from 'common/Box';
import Questions from "../../Questions";

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
                            <Questions/>
                        </Box>
                    </MessageWrapper>
                </ContentInnerWrapper>
            </Content>
        </>
    );
};

export default Room;
