import { useState } from "react";
import * as S from "./styled";
import axios from "axios";
import ModifyImage from "../ModifyImage/ModifyImage";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Loading from "../../../components/Loading/Loading";
import Empty from "../../../components/Empty/Empty";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../../components/util/useMutation";

const Modify = () => {
  const memberId = localStorage.getItem("memberId");

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/members/${memberId}`,
    ["members", memberId]
  );

  if (isLoading) return <Loading />;
  if (error) return <Empty />;
  return (
    <ModifySecond refetch={refetch} info={data.data} memberId={memberId} />
  );
};

export default Modify;

const ModifySecond = ({ refetch, info, memberId }) => {
  const [nickname, setNickname] = useState(info.nickName);
  const [name, setName] = useState(info.name);
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const { mutate } = useCustomMutation(
    `/members/${memberId}`,
    `memberId=${memberId}`,
    "PATCH"
  );

  const onSubmit = () => {
    pwd !== ""
      ? mutate({
          password: pwd,
          name: name,
          nickName: nickname,
        })
      : mutate({
          name: name,
          nickName: nickname,
        });
    navigate(`/members/${memberId}`);
    toast.success("회원정보 수정이 완료되었습니다");
    refetch();
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (pwd !== "") {
  //     axios
  //       .patch(
  //         `http://whatu1.kro.kr:8080/members/${memberId}`,
  //         {
  //           password: pwd,
  //           name: name,
  //           nickName: nickname,
  //         },
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("accessToken"),
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         navigate(`/members/${memberId}`);
  //         refetch();
  //         toast.success("회원정보 수정이 완료되었습니다");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else if (pwd === "") {
  //     axios
  //       .patch(
  //         `http://whatu1.kro.kr:8080/members/${memberId}`,
  //         {
  //           name: name,
  //           nickName: nickname,
  //         },
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("accessToken"),
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         navigate(`/members/${memberId}`);
  //         refetch();
  //         toast.success("회원정보 수정이 완료되었습니다");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };


  const onChangePwd = (e) => {
    setPwd(e.target.value);
  };
  console.log("pwd", pwd);

  return (
    <S.MypageDiv>
      <S.UserInfoHeader>
        <div className="userImage">
          <img
            src={info.memberPicture}
            className="memberPicture"
            alt="사용자 이미지"
            width={"200px"}
            height={"200px"}
          ></img>
        </div>
        <div className="userInfo">
          <ModifyImage refetch={refetch} />
        </div>
        <div className="userInfo">
          <div className="userName">{nickname}</div>
        </div>
      </S.UserInfoHeader>
      <S.FormDiv>
        <S.InputItem>
          <S.InputLabel htmlFor="name">이름</S.InputLabel>
          <S.InputDiv>
            <S.MyInput
              id="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="수정할 이름를 입력해주세요"
            />
          </S.InputDiv>
        </S.InputItem>
        <S.InputItem>
          <S.InputLabel htmlFor="nickName">닉네임</S.InputLabel>
          <S.InputDiv>
            <S.MyInput
              id="nickName"
              defaultValue={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="수정할 닉네임을 적어주세요"
            />
          </S.InputDiv>
        </S.InputItem>
        <S.InputItem>
          <S.InputLabel htmlFor="user_pwd">비밀번호</S.InputLabel>
          <S.InputDiv>
            <S.MyInput
              id="user_pwd"
              type="password"
              value={pwd}
              // onChange={(e) => setPwd(e.target.value)}
              autocomplete="off"
              onChange={onChangePwd}
              placeholder="수정할 비밀번호를 입력해주세요"
            />
            {console.log("pwd", pwd)}
          </S.InputDiv>
        </S.InputItem>
        <S.SaveBtn type="submit" value="저장" onClick={onSubmit}>
          저장
        </S.SaveBtn>
      </S.FormDiv>
    </S.MypageDiv>
  );
};
