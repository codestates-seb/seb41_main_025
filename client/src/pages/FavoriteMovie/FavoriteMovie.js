import * as S from "./styled";
// import GreenButton from "../components/item/Button";
import SeleteItem from "../../components/item/SelectItem/SeleteItem";
import { MainWarp, MainContainer} from "../Main/styled"

const FavoriteMovie = () =>{

    return (
        <MainWarp>
            <MainContainer>
                <S.Title>
                    <span className="title">00님의 인생작품</span>
                    {/* <Item/>
                    TODO : 만약 길이가 3개가 아니라면 검색 창 뜨게하기 */}
                    <S.FavoriteSearch>
                        {/* TODO : POST */}
                        <input type="text" placeholder="검색할 내용을 입력하세요."></input>
                    </S.FavoriteSearch>
                </S.Title>
                    {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
                <S.Items>
                    <SeleteItem/>
                    <SeleteItem/>
                    <SeleteItem/>
                </S.Items>
                    {/* <ChangeBtn>
                        <GreenButton name={"수정하기"}/>
                    </ChangeBtn> */}
            </MainContainer>
        </MainWarp>
    )
};

export default FavoriteMovie;
