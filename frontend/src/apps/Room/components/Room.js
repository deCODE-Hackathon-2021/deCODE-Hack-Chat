import React from 'react';
import styled from 'styled-components';

import Chat from 'apps/Chat';

import Voice from './Voice';

import Box from 'common/Box';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

const VoiceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 3;
`;

const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
`;

const Room = () => {
    return (
        <Wrapper>
            <VoiceWrapper>
                <h2>Topic: How to reduce stress?</h2>
                <Box height={50}>
                    <Voice />
                </Box>
            </VoiceWrapper>
            <MessageWrapper>
                <Box title="Q&A" height={50} />
                <Box title="Chat" height={50}>
                    <Chat />
                </Box>
            </MessageWrapper>
        </Wrapper>
    );
};

export default Room;
