import styled from "styled-components";


export const Items = styled.div`
    display: flex;
    flex-wrap: wrap;   
    margin-top: 10px;
    
    @media only screen and (max-width: ${'350px'}) {
        display: grid;
        width: 200px;
    }
`;
