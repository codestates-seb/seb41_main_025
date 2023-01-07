import styled from "styled-components";
import GreenButton from "../components/item/Button";
// import Item from "../components/item/item";
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
const Item = styled.div `
    margin: 0 90px 90px 90px;
    .poster {
        width: 300px;
        height: 350px;
        border-radius: 40px;
    }
    .movieTitle {
        margin: 10px 0 0 20px;
    }
`;

const ChangeBtn = styled.div`
    display : flex;
    justify-content: flex-end;
`


const FavoriteMovie = () =>{

    return (
        <MainWarp>
            <MainContainer>
                <Title>
                    <span className="title">00님의 인생작품</span>
                    {/* <Item/> */}
                    <SearchBar>
                    <input type="text" placeholder="검색할 내용을 입력하세요."></input>
                    </SearchBar>
                </Title>
                <Items>
                    {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
                    <Item>
                        <img src ='/assets/avatar2.jpeg' className='poster' alt="" />
                        <h2 className="movieTitle">영화 제목</h2>
                        <h3 className="movieTitle">국가, 개봉년도</h3>
                        <h4 className="movieTitle">평점</h4>
                    </Item>
                    <Item>
                        <img src ='/assets/avatar2.jpeg' className='poster' alt="" />
                        <h2 className="movieTitle">영화 제목</h2>
                        <h3 className="movieTitle">국가, 개봉년도</h3>
                        <h4 className="movieTitle">평점</h4>
                    </Item>
                    <Item>
                        <img src ='/assets/avatar2.jpeg' className='poster' alt="" />
                        <h2 className="movieTitle">영화 제목</h2>
                        <h3 className="movieTitle">국가, 개봉년도</h3>
                        <h4 className="movieTitle">평점</h4>
                    </Item>
                </Items>
                    <ChangeBtn>
                        <GreenButton name={"수정하기"}/>
                    </ChangeBtn>
            </MainContainer>
        </MainWarp>
    )
};

export default FavoriteMovie;
