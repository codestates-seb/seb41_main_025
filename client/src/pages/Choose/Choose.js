import React, {useState} from "react";
import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Title } from "../FavoriteMovie/styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem";
import axios from "axios";

const Choose = () => {
  const memberId = localStorage.getItem("memberId");
    const [nickName, setNickName] = useState("")

    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "AutHorization" : localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setNickName(res.data.data.nickName);
        console.log(nickName)
      })
      .catch((error) => {
        console.log(error);
      });

  return (
    <MainWarp>
      <MainContainer>
        <Title>
          <span className="title">"{nickName}"님의 찜한 목록</span>
        </Title>
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
  );
};
export default Choose;
