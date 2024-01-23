import React, { useRef, useState } from "react";
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
import "./Operators.css";

function AddOperator() {
  const [imagePreview, setImagePreview] = useState(null);
  const [isCameraOpen, setCameraOpen] = useState(false);
  const [initialCapturePreview, setInitialCapturePreview] = useState(false);
  const [isFaceEnrolled, setIsFaceEnrolled] = useState(false);
  const webcamRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const captureImageFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
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
  const handleEnrollFace = async () => {
    if (isFaceEnrolled) {
      return message.warning("Face is already enrolled");
    }

    setIsFaceEnrolled(true);
  };

  return (
    <>
      <h5>Add Operators</h5>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="operatorName">Name</label>
              <Tooltip title="Name of the Operator">
                <input
                  type="text"
                  id="operatorName"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                />
              </Tooltip>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="operatorEmail">Email</label>
              <Tooltip title="Email of the operator">
                <input
                  type="text"
                  id="operatorEmail"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="profilePic">Profile Pic</label>
              <div className="d-flex gap-3">
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

              <div className="d-flex justify-content-center">
                <img
                  src={imagePreview ? imagePreview : UserImage}
                  alt="Preview"
                  className="img-fluid preview-image object-fit-cover my-3"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="profilePic">Face Enroll</label>
              <Tooltip title="Please enroll a face for authentication.">
                <button
                  type="button"
                  className={`form-control btn btn-${
                    isFaceEnrolled ? "success" : "danger"
                  }`}
                  onClick={handleEnrollFace}
                >
                  <FaceRetouchingNaturalIcon />{" "}
                  {isFaceEnrolled
                    ? "A face is enrolled"
                    : "Click to scan a face"}
                </button>
              </Tooltip>
              <div
                className={`d-flex justify-content-center flex-column w-100 align-items-center bg-secondary-subtle text-${
                  isFaceEnrolled ? "success" : "danger"
                }`}
              >
                <FaceRetouchingNaturalIcon style={{ fontSize: "130px" }} />
                <p>
                  <b>
                    {!isFaceEnrolled
                      ? "No face enrolled"
                      : "A face is enrolled"}
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Tooltip title="Add the Operator">
            <button className="btn btn-primary">Submit</button>
          </Tooltip>
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

export default AddOperator;
