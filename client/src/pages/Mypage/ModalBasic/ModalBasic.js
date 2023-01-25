import axios from "axios";
import React, {useCallback, useState} from "react";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import Toast from "../../../components/Toast/Toast";
import { toast } from "react-toastify";


const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const [info, setInfo] = useState([]);
  const [pwd, setPwd] = useState("");

  const Navigate = useNavigate();

  //todo : 회원정보 수정 patch 성공해야 수정 페이지로 연결되게 추후 변경 예정

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://whatu1.kro.kr:8080/members/prevModify`, 
      {
        password: pwd
      },
      
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setPwd(res.data.data);  
        toast.success("비밀번호가 확인되었습니다")
        Navigate("/modify")
      })
      .catch((error) => {
        console.log(error);

      });
    };

    const onChangePwd = (e) => {
      setPwd(e.target.value);
    }



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
          type="password"
          pwd={pwd}
          onChange={onChangePwd}
          // onChange={onChangeConfirmPwd}
          
        />
      </S.InputItem>
      <S.CloseBtn className="submit" onClick={onSubmit} >
        확인
      </S.CloseBtn>
    </S.Container>
  );
};

export default ModalBasic;
