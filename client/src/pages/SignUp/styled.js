import styled from "styled-components";

export const Hello = styled.div`
    display: flex;
    text-align: left;
    margin: auto;
    
`
export const HelloAnnouncement = styled.span`
    margin-top: 60px;
    margin-right: 90px;
    font-size: 30px;
    
    @media only screen and (max-width: ${'600px'}) {
        font-size: 20px;
        margin-right: 50px;
    }
`
