import React from "react";
import { UserImage } from "../../../assets/image";
import Webcam from "react-webcam";
import { Tooltip, message } from "antd";
import {
  CameraIcon,
  CheckIcon,
  CloseIcon,
  FaceRetouchingNaturalIcon,
  PhotoCameraFrontIcon,
} from "../../../assets/icons";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

function EditProfile({ operator,setUserData }) {
  const [data, setData] = React.useState(JSON.parse(JSON.stringify(operator)));
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [isCameraOpen, setCameraOpen] = React.useState(false);
  const [initialCapturePreview, setInitialCapturePreview] =
    React.useState(false);
  const webcamRef = React.useRef(null);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureImageFromWebcam = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((res) => res.blob());
    setSelectedImage(blob);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      const minSize = Math.min(img.width, img.height);
      const offsetX = (img.width - minSize) / 2;
      const offsetY = (img.height - minSize) / 2;
      canvas.width = minSize;
      canvas.height = minSize;
      ctx.drawImage(
        img,
        offsetX,
        offsetY,
        minSize,
        minSize,
        0,
        0,
        minSize,
        minSize
      );
      const croppedImageSrc = canvas.toDataURL("image/jpeg");
      setImagePreview(croppedImageSrc);
      setInitialCapturePreview(true);
    };
  };

  const handelUpdate = async () => {
    if (!data.name.trim()) {
      return message.warning("Please ener a valid name.");
    }
    if (selectedImage) {
      const fileRef = ref(
        storage,
        `automate-billing-system/operator/${Date.now() + selectedImage.name}`
      );
      uploadBytes(fileRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          handelSave(url);
        });
      });
    } else {
      handelSave();
    }
  };

  const handelSave = async (url) => {
    console.log({
      ...data,
      image: url,
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/update`, {
        ...data,
        image: url ? url : data.image,
      });
      if (response?.data?.success) {
        message.success(response.data.message || "Updated successfully");
        setUserData(response.data.data)
        setData(response.data.data)
      } else {
        message.error(response?.data?.message || "Something went wrong.");
      }
    } catch (error) {
      console.log("failed to update the profile:", error);
      message.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
    }
  };

  return (
    <>
      <h5>Update Profile</h5>
      <hr />
      <form>
        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={data?.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={data?.email}
              disabled
            />
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="profilePic">Profile Pic</label>

              <div className="d-flex gap-3 flex-column text-center">
                <Tooltip title="Select a image for the operator's profile">
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Tooltip>
                {"OR"}
                <Tooltip title="Click to open camera.">
                  <button
                    type="button"
                    name="profilePic"
                    className="form-control"
                    onClick={() => {
                      setCameraOpen(true);
                      setInitialCapturePreview(false);
                    }}
                  >
                    <PhotoCameraFrontIcon /> Capture a photo
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="">Image Preview</label>
            <div className="d-flex justify-content-around  bg-body-secondary">
              {imagePreview && (
                <div>
                  <p>Selected Image</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-fluid preview-image object-fit-cover my-3"
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div>
                <p>Initial image</p>

                <img
                  src={data?.image ? data?.image : UserImage}
                  alt="Preview"
                  className="img-fluid preview-image object-fit-cover my-3"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handelUpdate}
          >
            Update
          </button>
        </div>
      </form>
      {isCameraOpen && (
        <div className="profile-web-cam-container  ">
          <div className="bg-white p-2 rounded-3 shadow col-md-4">
            {!initialCapturePreview ? (
              <Webcam ref={webcamRef} width={"100%"} className="ratio-1x1" />
            ) : (
              <img src={imagePreview} width={"100%"} className="ratio-1x1" />
            )}
            {!initialCapturePreview ? (
              <div className="d-flex justify-content-evenly p-3">
                <button
                  className="shadow btn btn-danger"
                  onClick={() => setCameraOpen(false)}
                >
                  <CloseIcon /> Cancel
                </button>
                <Tooltip title="Capture a image for the operator's profile">
                  <button
                    className="shadow btn btn-primary"
                    onClick={captureImageFromWebcam}
                  >
                    <CameraIcon /> Capture
                  </button>
                </Tooltip>
              </div>
            ) : (
              <div className="d-flex justify-content-evenly p-3 capture-bod-confirm-box">
                <div
                  className="icon-box-danger shadow"
                  onClick={() => setInitialCapturePreview(false)}
                >
                  <CloseIcon color="white" />
                </div>
                <div
                  className="icon-box-primary shadow"
                  onClick={() => setCameraOpen(false)}
                >
                  <CheckIcon />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
