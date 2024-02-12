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
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import faceIO from "@faceio/fiojs";
import { handleError } from "../../Authentication/errorByFACEID";
import axios from "axios";

const fio = new faceIO(process.env.REACT_APP_PUBLIC_ID);

function AddOperator({setFrame}) {
  const [imagePreview, setImagePreview] = React.useState(null);
  const [selectImage, setSelectedImage] = React.useState(null);
  const [isCameraOpen, setCameraOpen] = React.useState(false);
  const [initialCapturePreview, setInitialCapturePreview] =
    React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [foundEmail,setFoundEmail] = React.useState(true)

  const webcamRef = React.useRef(null);

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

  React.useEffect(() => {
      checkEmail();
  }, [email]);
  const checkEmail = async () => {
    setFoundEmail(true)
    if(!isEmailValid){
      return 
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/email`,
        {
          email,
        }
      );
      if (response.data.success) {
        message.success(response.data.message || "proceed");
        setFoundEmail(false)
      } else {
        message.warning(response.data.message || "proceed");
      }
    } catch (error) {
      message.error(error.response.data.message || "Something went wrong.");
    }
  };

  const handelRegister = async () => {
    if (!email.trim() || !name.trim() || !selectImage) {
      return message.warning("All fielde are required");
    }
    if(foundEmail){
      return message.warning("Email already used.")
    }
    const fileRef = ref(
      storage,
      `automate-billing-system/operator/${Date.now() + selectImage.name}`
    );
    uploadBytes(fileRef, selectImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleEnrollFace(url)
      });
    });
  };

  const handleEnrollFace = async (url) => {
    try {
      const response = await fio.enroll({
        payload: {
          email:email.trim(),
        },
      });
      handleSaveToDb(response?.facialId,url)
    } catch (error) {
      console.log(error);
      message.error(handleError(error));
    }
  };

  const handleSaveToDb = async (fId,url) => {
    try {
      const dbBody = {
        faceId: fId,
        name:name,
        email:email,
        image:url
      };
      console.log(url)
      const dbREsponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/user/register`,
        dbBody
      );
      if (dbREsponse.status === 200) {
        console.log("Registered successfully");
        message.success(dbREsponse.data.message || "Operator created")
        setFrame("add")
      }
      console.log("Enrollment successful!");
    } catch (error) {
      console.log("Failed to save the operator:",error)
      message.error(error.response.data.message||"Something went wrong")
    }
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
                  className={`form-control border-3 border-${name.trim()?"success":"danger"}`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                  className={`form-control border-3 border-${(!foundEmail)?"success":isEmailValid && foundEmail?"warning":"danger"}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="row mt-3">
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
            <div className="d-flex justify-content-center bg-body-secondary">
              <img
                src={imagePreview ? imagePreview : UserImage}
                alt="Preview"
                className="img-fluid preview-image object-fit-cover my-3"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <Tooltip title="Please enroll a face for authentication.">
            <button
              type="button"
              className={`btn btn-${(!foundEmail && name.trim() && selectImage ) ? "success" : "danger"}`}
              onClick={handelRegister}
              disabled={(foundEmail || !name.trim() || !selectImage )}
            >
              <FaceRetouchingNaturalIcon />{" "}
              {(!foundEmail && name.trim() && selectImage ) ? "Click to enroll " : "All fields are required"}
            </button>
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
