import React from 'react';
import styled from 'styled-components';

const BoxWrapper = styled.div`
    height: ${props => props.height}%;
    ${props => props.styles && `
        background-color: white;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin: 8px;
        padding: 16px;
        position: relative;
    `}
`;

const Box = ({ title, children, height, styles }) => {
    return (
        <BoxWrapper height={height} styles={styles}>
            {title && <h3>{title}</h3>}
            {children}
        </BoxWrapper>
    );
};

export default Box;
