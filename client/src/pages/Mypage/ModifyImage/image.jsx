import { useState } from 'react';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';

import './Styles/image.css';

const ImageUpload = ({ setModalOpen, setImage }) => {
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onSubmit = async () => {
    //   setImage();
    //   const host = 'http://43.201.92.36';
    // if (images.length === 0) return;
    // const { data } = await axios
    //   .post(`${host}/api/v1/user/setting/profileimage`, {
    //     userId,
    //     image: images[0].data_url,
    //   })
    //   .catch((e) => {
    //     setImages([]);
    //   });
    // if (data) {
    //   setModalOpen(false);
    // } else {
    //   setImages([]);
    // }
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
        acceptType={['jpg', 'jpeg', 'svg', 'png']}
      >
        {({ imageList, onImageUpdate, onImageRemove, dragProps, errors }) => (
          <div className="Upload_Image_Container">
            <div>
              <div className="Upload_Image_Modal_DropZone_Container">
                {imageList[0] ? (
                  <img
                    src={imageList[0].data_url}
                    alt="profileImage"
                    width="200"
                    height="200"
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
                          <b>Drag and drop or click here</b>
                          <p>to upload your image (max 2mb)</p>
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
                    Your selected file type is not allow
                  </span>
                )}
                {errors.maxFileSize && (
                  <span className="Upload_Image_Error">
                    Selected file size exceed maxFileSize
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
