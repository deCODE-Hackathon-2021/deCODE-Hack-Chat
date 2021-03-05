import React from 'react';
import styled from "styled-components";

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
`;

const HeaderInnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 900px;
    width: 100%;
    margin-top: 24px;
    margin-bottom: 16px;
`;

const HeaderTitle = styled.h2`
    margin-bottom: 8px;
`

const HeaderSubtitle = styled.div`
    fontSize: 0.9em;
    color: rgba(0,0,0,0.75);
`

const HeaderImage = styled.img`
    width: 100%;
    display: block;
    margin-top: -32px;
`

const LiveIndicator = styled.div`
    background-color: #DD3F4F;
    padding: 6px;
    font-weight: 500;
    text-transform: capitalize;
    color: white;
    border-radius: 8px;
    margin-left: 16px;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderImage src={'./header.png'}/>
            <HeaderInnerWrapper>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                    <HeaderTitle>
                        What's it like to work at Facebook?
                    </HeaderTitle>
                    <LiveIndicator>
                        LIVE
                    </LiveIndicator>
                </div>

                <HeaderSubtitle>
                    Audio Session • Free
                </HeaderSubtitle>
            </HeaderInnerWrapper>
        </HeaderWrapper>
    )
}

export default Header
