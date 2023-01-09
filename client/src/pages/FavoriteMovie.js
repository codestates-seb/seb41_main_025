import styled from "styled-components";
// import GreenButton from "../components/item/Button";
import Item from "../components/item/item";
import { MainWarp, MainContainer} from "./Main/Main"
import { SearchBar } from "../components/Header"

const Items = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px;
`;

const Title = styled(MainContainer)`
    width: 500px;
    height: 100px;
    margin: 100px;
    .title {
    font-size: 30px;
    text-decoration: underline #167E6C;
    text-decoration-thickness: 4px;
    text-underline-offset: 20px;
  }
`

// const ChangeBtn = styled.div`
//     display : flex;
//     justify-content: flex-end;
// `

const FavoriteSearch = styled(SearchBar)`
    input {
        margin-top: 100px;
        width: 620px;
        height: 50px;
        font-size: 20px;
    }
`


const FavoriteMovie = () =>{

    return (
        <MainWarp>
            <MainContainer>
                <Title>
                    <span className="title">00님의 인생작품</span>
                    {/* <Item/>
                    TODO : 만약 길이가 3개가 아니라면 검색 창 뜨게하기 */}
                    <FavoriteSearch>
                        {/* TODO : POST */}
                        <input type="text" placeholder="검색할 내용을 입력하세요."></input>
                    </FavoriteSearch>
                </Title>
                    {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
                <Items>
                    <Item/>
                    <Item/>
                    <Item/>
                </Items>
                    {/* <ChangeBtn>
                        <GreenButton name={"수정하기"}/>
                    </ChangeBtn> */}
            </MainContainer>
        </MainWarp>
    )
};

export default FavoriteMovie;
