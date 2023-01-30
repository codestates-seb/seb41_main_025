import React from "react";
import { useState } from "react";
import ImageModal from "./imageModal";
import { TfiPencilAlt } from "react-icons/tfi";

const ModifyImage = ({ refetch }) => {
  //todo: 이미지 미리보기

  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <div style={{margin:"160px 0px 0px"}}>
      <TfiPencilAlt size="30px" color="#4BA6B2" cursor="pointer" onClick={showModal} />
      {modalOpen && (
        <ImageModal
          refetch={refetch}
          setModalOpen={setModalOpen}
          userProfileImage={image}
          setImage={setImage}
        />
      )}
    </div>
  );
};

export default ModifyImage;
