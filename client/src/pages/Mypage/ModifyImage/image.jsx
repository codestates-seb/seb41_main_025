import { useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import "./Styles/image.css";

const ImageUpload = ({ refetch, setModalOpen, setImage }) => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onSubmit = async () => {
    axios
      .post(
        `http://whatu1.kro.kr:8080/members/upload`,
        { memberPicture: images[0].file },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setModalOpen(false);
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "jpeg", "svg", "png"]}
      >
        {({ imageList, onImageUpdate, onImageRemove, dragProps, errors }) => (
          <div className="Upload_Image_Container">
            <div>
              <div className="Upload_Image_Modal_DropZone_Container">
                {imageList[0] ? (
                  <img
                    src={imageList[0].data_url}
                    alt="profileImage"
                    width="300"
                    height="300"
                  />
                ) : (
                  <button
                    className="Upload_Image_DropZone"
                    {...dragProps}
                    onClick={() => onImageUpdate(0)}
                  >
                    <div className="Upload_Image_Modal_Image">
                      <div className="Upload_Image_Text_Container">
                        <div className="Upload_Image_Text">
                          <b>여기로 이미지 파일을 드래그 해주세요!</b>
                          <p>to upload your image </p>
                        </div>
                      </div>
                    </div>
                  </button>
                )}
              </div>
              {imageList[0] && (
                <>
                  <div className="Upload_Image_Remove_Container">
                    <button
                      onClick={() => {
                        onImageRemove(0);
                      }}
                      className="Upload_Image_Remove_Button"
                    >
                      취소하고 다른 이미지 추가하기
                    </button>
                  </div>
                </>
              )}
            </div>
            {errors && (
              <div className="Upload_Image_Remove_Container">
                {errors.acceptType && (
                  <span className="Upload_Image_Error">
                    지원하는 파일 형식이 아닙니다.
                  </span>
                )}
                {errors.maxFileSize && (
                  <span className="Upload_Image_Error">
                    너무 큰 사이즈입니다.
                  </span>
                )}
                {errors.resolution && (
                  <span className="Upload_Image_Error">
                    Selected file is not match your desired resolution
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
      <div className="UploadImage_Submit_Container">
        <button width="130px" height="50px" onClick={onSubmit}>
          이미지 등록하기
        </button>
      </div>
    </>
  );
};

export default ImageUpload;
