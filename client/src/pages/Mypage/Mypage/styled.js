import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* background-color: #f9f9f9; */
  /* position: absolute; */
  /* overflow: scroll; */
`;

export const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  /* height: 655px; */
  /* margin-bottom: 30px; */
  padding-top: 60px;
  /* margin: 0 auto; */
  /* form {
    display: flex;
    width: 100%;
    height: 300px;
    padding: 60px 0px;
    align-items: center;
  } */
`;

export const UserInfoHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  /* padding: 60px; */
  @media only screen and (max-width: ${"300px"}) {
    padding: 30px;
    display: grid;
  }

  .memberPicture {
    border-radius: 30%;
    /* &:hover {
        transform: scale(1.5);
      } */
    @media only screen and (max-width: ${"300px"}) {
      width: 200px;
      height: 200px;
    }
  }
`;

export const UserImage = styled.div`
  padding-left: 80px;

  & > .memberPicture {
    border-radius: 30%;
    @media screen and (max-width: 390px) and (max-height: 844px) {
      width: 100px;
      height: 100px;
      padding: 10px;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 80px;
  @media only screen and (max-width: ${"300px"}) {
    padding: 20px 0 0 0;
  }
`;
export const UserName = styled.div`
  padding: 0px 0px 80px 30px;
  font-size: 30px;
  @media only screen and (max-width: ${"300px"}) {
    padding: 10 0 0 30;
  }
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  align-items: end;
  padding-right: 100px;
  margin-right: 120px;

  @media only screen and (max-width: ${"300px"}) {
    display: grid;
    margin: 0;
    padding: 0;
    align-items: center;
    flex-direction: row;
  }
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;
  height: 200x;
  @media only screen and (max-width: ${"300px"}) {
    display: grid;
    margin: 10px;
    width: 30px;
  }
`;

export const InputLabel = styled.div`
  padding-right: 30px;

  @media only screen and (max-width: ${"300px"}) {
    font-size: 20px;
    padding-right: 0;
  }
`;

export const InputDiv = styled.div``;

export const MyInput = styled.input`
  display: flex;
  width: 360px;
  height: 50px;
  border: none;
  border-bottom: 1px solid #999999;
  :focus {
    outline: none;
    border-bottom: 2px solid #167e6c;
  }
`;

export const ModifyBtn = styled.button`
  width: 120px;
  height: 40px;
  background-color: #167e6c;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 500;
  @media only screen and (max-width: ${"300px"}) {
    width: 150px;
    height: 40px;
    font-size: 20px;
  }
`;

export const SaveBtn = styled(ModifyBtn)`
  width: 80px;
  margin: 20px 0 0 385px;
  font-size: 20px;
  @media only screen and (max-width: ${"300px"}) {
    margin: 10px 0px 0px 220px;
  }
`;

export const DeleteBtn = styled(ModifyBtn)`
  width: 80px;
  height: 40px;
  padding: 10px;
  margin: 50px;
  margin-left: 400px;
  font-size: 15px;
  @media only screen and (max-width: ${"300px"}) {
    /* margin: 10px 0px 10px 220px; */
    font-size: 15px;
  }
`;

// export const FormStyle = styled.div`
//   display: grid;
// `;
