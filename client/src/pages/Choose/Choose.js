import React from "react";
import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Title } from "../FavoriteMovie/styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem";

const Choose = () => {
  return (
    <MainWarp>
      <MainContainer>
        <Title>
          <span className="title">00님의 찜한 목록</span>
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
