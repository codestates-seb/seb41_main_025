import React from "react";
import * as S from "./styled";
import dummy from "../dummydata";

const Tving = () => {
  return (
    <S.ContentList>
      {dummy.map((item) => {
        return (
          <S.ContentItem key={item.id}>
            <div className="userInfo">
              <img
                src={item.memberPicture}
                className="memberPicture"
                alt="사용자 이미지"
                style={{}}
              ></img>
              {item.name}
            </div>
            <div className="content">{item.commentBody}</div>
          </S.ContentItem>
        );
      })}
    </S.ContentList>
  );
};

export default Tving;
