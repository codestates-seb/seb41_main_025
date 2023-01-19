import styled from "styled-components";


export const Items = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px;
    
    @media only screen and (max-width: ${'600px'}) {
        display: grid;
    }
`;
