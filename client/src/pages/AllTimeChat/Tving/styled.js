import styled from "styled-components";

export const ContentList = styled.div`
width: 100%;
height: auto;
padding-top: 10px;
`;

export const ContentItem = styled.div`
padding: 20px;
.userInfo {
  text-align: left;
  padding-bottom: 10px;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 356px;
  min-height: 50px;
  padding: 15px;
  color: #ffffff;
  background: #58bfad;
  border-radius: 30px;
}
.memberPicture {
  border-radius: 30px;
  width: 48px;
}
`;
export const ContentItemMe = styled.div`
  padding: 20px;
  .userInfo {
  text-align: right;
  padding-bottom: 10px;
}
.content {
  margin-left:64%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 356px;
  height: 50px;
  color: beige;
  background: #58bfad;
  border-radius: 30px;
}
.memberPicture {
  border-radius: 30px;
  width: 48px;
}
`;
