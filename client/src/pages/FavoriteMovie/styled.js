import styled from "styled-components";
import { SearchBar } from "../../components/Header/styled"

export const Items = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px;
    
    @media only screen and (max-width: ${'350px'}) {
        display: grid;
        width: 200px;
    }
`;

export const MainContainer = styled.div`
    max-width: 1440px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 60px;
    @media only screen and (max-width: ${'350px'}) {
        display: grid;
    }
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
        margin: 100px 0 0 -40px;
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
            margin: 50px 0 10px -120px;
        }
        @media only screen and (max-width: ${'350px'}) {
            width: 250px;
            height: 30px;
            margin-top: 80px;
            margin: 30px 0 10px 0px;
            font-size:10px;
        }
    }
`
export const MainWarp = styled.div`
  padding: 60px 60px;
  width: 100%;
  @media only screen and (max-width: ${'700px'}) {
    background-color: beige;
  }
  @media only screen and (max-width: ${'350px'}) {
    width: 350px;
    padding:0;
  } 
`
