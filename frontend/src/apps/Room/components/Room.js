import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Chat from 'apps/Chat';

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
    const renderChat = () => {
        return <Chat />;
    }

    return (
        <Wrapper>
            <VoiceWrapper>
                <h2>Topic: How to reduce stress?</h2>
                <Box title="3 speakers on stage" height={25} />
                <Box title="Listeners" height={25} />
            </VoiceWrapper>
            <MessageWrapper>
                <Box title="Q&A" height={50} />
                <Box title="Chat" height={50} content={renderChat} />
            </MessageWrapper>
        </Wrapper>
    );
};

const BoxWrapper = styled.div`
    width: 100%;
    min-height: ${props => props.height}%;
`;

const Box = ({ title, content = () => {}, height, width }) => {
    return (
        <BoxWrapper height={height} width={width}>
            <h2>{title}</h2>
            {content()}
        </BoxWrapper>
    );
};

export default Room;
