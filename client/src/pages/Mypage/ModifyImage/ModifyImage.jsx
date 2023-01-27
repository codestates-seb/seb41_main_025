import React from "react";
import { useState } from "react";
import axios from "axios";
import ImageModal from "./imageModal";

const ModifyImage = ({ refetch }) => {
  //todo: 이미지 미리보기

  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };









  return (
    <div>
      
      <button className="Modal_Open_Button" onClick={showModal}>
        이미지 바꾸기
      </button>
      {modalOpen && (
        <ImageModal
          refetch={refetch}
          setModalOpen={setModalOpen}
          userProfileImage={image}
          setImage={setImage}
        />
      )}
      {/* <input type="file" accept="img/*" onChange={onChangeImage}></input> */}
      {/* onChange={handleFileInput} */}
      {/* <button label="이미지 업로드" onClick={onSubmitImage}>
        이미지 업로드
      </button>
      <button label="이미지 업로드" onClick={onSubmit}>
        이미지 변경
      </button> */}
    </div>
  );
};

export default ModifyImage;
