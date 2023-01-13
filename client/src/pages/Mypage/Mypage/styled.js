import styled from "styled-components";

export const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  /* height: 655px; */
  margin-bottom: 30px;
  padding: 60px 60px 0px;
  margin: 0 auto;
  form {
    display: flex;
    width: 100%;
    height: 300px;
    padding: 60px 0px;
    align-items: center;
  }
`;

export const UserInfoHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 60px;
  @media only screen and (max-width: ${'600px'}) {
    padding: 30px;
    display: grid;
  } 
  .userImage {
    padding-left: 80px;
    @media only screen and (max-width: ${'600px'}) {
    padding-left: 0;
  } 

    & > .memberPicture {
      border-radius: 30%;
      @media only screen and (max-width: ${'600px'}) {
    width: 200px;
    height: 200px;
  } 
    }
  }
  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 80px;
    @media only screen and (max-width: ${'600px'}) {
    padding: 20px 0 0 0;

  } 
  }
  .userName {
    padding: 0px 0px 80px 30px;
    font-size: 30px;
    @media only screen and (max-width: ${'600px'}) {
    padding: 10 0 0 30;

  } 
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  align-items: end;
  padding-right: 100px;
  margin-right: 120px;

  @media only screen and (max-width: ${'600px'}) {
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
  @media only screen and (max-width: ${'600px'}) {
  display: grid;
  margin: 10px;
  width: 30px;
  } 
`;

export const InputLabel = styled.div`
  padding-right: 30px;

  @media only screen and (max-width: ${'600px'}) {
  font-size: 20px;
  padding-right: 0;
  } 
`;

export const InputDiv = styled.div`
`;

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
  width: 240px;
  height: 60px;
  background-color: #167e6c;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 32px;
  font-weight: 300;
  @media only screen and (max-width: ${'600px'}) {
  width: 150px;
  height: 40px;
  font-size: 20px;
  } 
`;

export const SaveBtn = styled(ModifyBtn)`
  width: 100px;
  @media only screen and (max-width: ${'600px'}) {
    margin: 10px 0px 0px 220px;
  }
`;

export const DeleteBtn = styled(ModifyBtn)`
  width: 160px;
  height: 80px;
  padding: 10px;
  margin: 50px;
  @media only screen and (max-width: ${'600px'}) {
    /* margin: 10px 0px 10px 220px; */
    font-size: 15px;
  }
`;

export const FormStyle = styled.div`
  display: grid;
`;