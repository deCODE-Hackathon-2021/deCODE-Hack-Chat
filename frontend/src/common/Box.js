import React from 'react';
import styled from 'styled-components';

const BoxWrapper = styled.div`
    width: 100%;
    min-height: ${props => props.height}%;
`;

const Box = ({ title, children, height, width }) => {
    return (
        <BoxWrapper height={height} width={width}>
            {title && <h2>{title}</h2>}
            {children}
        </BoxWrapper>
    );
};

export default Box;