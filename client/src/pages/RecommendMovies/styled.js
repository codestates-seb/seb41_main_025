import styled from "styled-components";

export const RecommendButton = styled.button`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 60px;
    margin-bottom: 20px;
    margin-left: 60px;
    background-color: #167E6C;
    border-radius: 15px;
    border: 0;
    color: white;
    font-size: 20px;
    :active {
        color: #167E6C;
        background-color: whitesmoke;
    }
    
    @media only screen and (max-width: ${'600px'}) {
        width: 200px;
    }
`