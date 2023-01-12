import React, {useState} from "react";
import styled from "styled-components";
import dummy from "../AllTimeChat/dummydata";
import ModalBasic from "./ModalBasic";

const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  /* width: 1440px; */
  /* height: 655x; */
  margin-bottom: 30px;
  padding: 60px 60px 0px;
  margin: 0 auto;
  form {
    display: flex;
    /* width: 100%;
    height: 300px; */
    padding: 60px 0px;
    align-items: center;
  }
`;

const UserInfoHeader = styled.div`
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
  }
  .userName {
    padding: 0px 0px 80px 30px;
    font-size: 30px;
  }
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 1000px; */
  align-items: end;
  padding-right: 100px;
  margin-right: 120px;
`;
const InputItem = styled.div`
  display: flex;
  align-items: center;
  height: 200x;
`;
const InputLabel = styled.div`
  padding-right: 30px;
`;
const InputDiv = styled.div``;
const MyInput = styled.input`
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

const SaveBtn = styled(ModifyBtn)`
  width: 140px;
`;

const DeleteBtn = styled(ModifyBtn)`
  width: 150px;
  margin: 50px;
`;

const Mypage = () => {
  const filteredDummy = dummy.filter((item) => item.id === "1");
  console.log(filteredDummy);
  // const [id, onChangeId, setId] = useInput("");

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  };



  return (
    <MypageDiv>
      {filteredDummy.map((item) => {
        return (
          <UserInfoHeader key={item.id}>
            <div className="userImage">
              <img
                src={item.memberPicture}
                className="memberPicture"
                alt="사용자 이미지"
                width={"300px"}
              ></img>
            </div>
            <div className="userInfo">
              <div className="userName">{item.name}</div>
              <ModifyBtn type="submit" value="저장" onClick={showModal}>
                회원 정보 수정
              </ModifyBtn>
              {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
            </div>
          </UserInfoHeader>
        );
      })}
      <form>
        <FormDiv>
          <InputItem>
            <InputLabel htmlFor="profile">프로필</InputLabel>
            <InputDiv>
              <MyInput
                id="profile"
                // value={id}
                // onChange={onChangeId}
                placeholder="수정할 프로필을 적용해주세요"
                required
              />
            </InputDiv>
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="nickName">닉네임</InputLabel>
            <InputDiv>
              <MyInput
                id="nickName"
                // value={pwd}
                // onChange={onChangePwd}
                placeholder="수정할 닉네임을 적어주세요"
                required
              />
            </InputDiv>
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="user_pwd">이메일</InputLabel>
            <InputDiv>
              <MyInput
                id="user_pwd"
                // value={pwd}
                // onChange={onChangePwd}
                placeholder="수정할 이메일을 입력해주세요"
                required
              />
            </InputDiv>
          </InputItem>
          <InputItem>
            <InputLabel htmlFor="user_pwd">비밀번호</InputLabel>
            <InputDiv>
              <MyInput
                id="user_pwd"
                // value={pwd}
                // onChange={onChangePwd}
                placeholder="수정할 비밀번호를 입력해주세요"
                required
              />
            </InputDiv>
          </InputItem>
        </FormDiv>
        <SaveBtn type="submit" value="저장">
          저장
        </SaveBtn>
      </form>

      <DeleteBtn type="submit" value="저장">
        회원탈퇴
      </DeleteBtn>
    </MypageDiv>
  );
};

export default Mypage;
