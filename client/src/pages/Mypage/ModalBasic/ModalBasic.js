import axios from "axios";
import React, {useCallback, useState} from "react";
import * as S from "./styled";


const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const [info, setInfo] = useState([]);

  const token = localStorage.getItem("accessToken");
  console.log(token);

  const [pwd, setPwd] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://whatu1.kro.kr:8080/members/prevModify`, 
      {
        password: pwd
      },
      
      {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPwd(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };

    const onChangeConfirmPwd = useCallback((e) => {
      const currentConfirmPwd = e.target.value;
      setPwd(currentConfirmPwd);

      // if (currentConfirmPwd !== pwd) {
      //   setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
      //   setIsPasswordConfirm(false);
      // } else {
      //   setConfirmPwdMsg("올바른 비밀번호입니다.");
      //   setIsPasswordConfirm(true);
      // }
    },[pwd]);



  // const 


  return (
    <S.Container>
      <S.CloseBtn className="close" onClick={closeModal}>
        X
      </S.CloseBtn>
      <S.InputItem>
        <S.MyInput
          id="password"
          placeholder="비밀번호를 입력해주세요"
          type="text"
          pwd={pwd}
          onChange={onChangeConfirmPwd}
          
        />
      </S.InputItem>
      <S.CloseBtn className="submit" onClick={onSubmit} >
        확인
      </S.CloseBtn>
    </S.Container>
  );
};

export default ModalBasic;
