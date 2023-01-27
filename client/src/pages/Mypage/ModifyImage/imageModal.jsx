import "./Styles/image.css";
import ImageUpload from "./image";

function ImageModal({ refetch, setModalOpen, userProfileImage, setImage }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="Image_Modal_Container">
      <div className="Image_Modal_Upload_Container">
        <ImageUpload
          userProfileImage={userProfileImage}
          setModalOpen={setModalOpen}
          setImage={setImage}
          refetch={refetch}
        />
        <svg
          className="Image_Modal_Close"
          onClick={closeModal}
          width="40"
          height="25"
          viewBox="0 0 13 14"
        >
          <path d="M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default ImageModal;
