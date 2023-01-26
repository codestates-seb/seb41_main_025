import React from "react";
import { useState } from "react";
import axios from "axios";

const ModifyImage = () => {

  //todo: 이미지 미리보기
  const [memberPicture, setMemberPicture] = useState(null);

  const memberId = localStorage.getItem("memberId");

  const region = "ap-northeast-2";
  const bucket = "mypicture123";

  const AWS = require("aws-sdk");

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket, // 버킷 이름
        Key: memberId + ".png", // 유저 아이디
        Body: file, // 파일 객체
      },
    });

    const promise = upload.promise();
    promise
      .then((res) => {
        setMemberPicture(res.Location);
        console.log("성공");
      })
      .then((err) => {
        console.log(err);
      });
  };

  const onSubmitImage = () => {
    // const pictureURL = URL.createObjectURL(files);
    // setMemberPicture(pictureURL);
    // console.log(memberPicture);

    // const reader = new FileReader();
    // reader.readAsDataURL(files);
    // reader.onload = () => setMemberPicture(reader.result);

    axios
      .patch(
        `http://whatu1.kro.kr:8080/members/${memberId}`,
        { memberPicture: memberPicture },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} ></input>
      <button label="이미지 업로드" onClick={onSubmitImage}>
        이미지 업로드
      </button>
    </div>
  );
};

export default ModifyImage;
