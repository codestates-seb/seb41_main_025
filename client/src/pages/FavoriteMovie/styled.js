import styled from "styled-components";
import { SearchBar } from "../../components/Header/styled"

export const Items = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px;
    
    @media only screen and (max-width: ${'350px'}) {
        display: grid;
    }
`;

export const MainContainer = styled.div`
    max-width: 1440px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 60px;
`

export const Title = styled.div`
    max-width: 500px;
    margin: 100px 100px 0 100px;
    .title {
    font-size: 20px;
    text-decoration: underline #167E6C;
    text-decoration-thickness: 4px;
    text-underline-offset: 20px;

    @media only screen and (max-width: ${'700px'}) {
        font-size: 25px;
        }
    @media only screen and (max-width: ${'350px'}) {
        font-size: 15px;
        }
    }
    @media only screen and (max-width: ${'350px'}) {
        width: 40vh;
        margin: 80px 0 0 -120px;
    }
`

// const ChangeBtn = styled.div`
//     display : flex;
//     justify-content: flex-end;
// `

export const FavoriteSearch = styled(SearchBar)`
    input {
        margin-top: 100px;
        width: 620px;
        height: 50px;
        font-size: 20px;
        margin-top:30px;

        @media only screen and (max-width: ${'700px'}) {
            width: 300px;
            height: 40px;
            margin: 50px 0 10px -80px;
        }
        @media only screen and (max-width: ${'350px'}) {
            width: 300px;
            height: 40px;
            margin-top: 80px;
            margin: 30px 0 10px 0px;
        }
    }
`
