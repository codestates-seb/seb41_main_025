import styled from "styled-components";
import { SearchBar } from "../../components/Header/styled"
import { MainContainer} from "../Main/styled"

export const Items = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px;
    
    @media only screen and (max-width: ${'600px'}) {
        display: grid;
    }
`;

export const Title = styled(MainContainer)`
    width: 500px;
    height: 100px;
    margin: 100px 100px 0 100px;
    .title {
    font-size: 30px;
    text-decoration: underline #167E6C;
    text-decoration-thickness: 4px;
    text-underline-offset: 20px;

    @media only screen and (max-width: ${'600px'}) {
        font-size: 15px;
        }
    }
    @media only screen and (max-width: ${'600px'}) {
        width: 320px;
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

        @media only screen and (max-width: ${'600px'}) {
          width: 300px;
          height: 40px;
          margin-top: 80px;
        }
    }
`
