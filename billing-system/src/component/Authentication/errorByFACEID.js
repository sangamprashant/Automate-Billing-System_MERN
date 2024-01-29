import { message } from "antd";

function handleError(errCode) {
    switch (errCode) {
        case 1:
            message.error("Access to the Camera stream was denied by the end user");
            break;
        case 2:
            message.error("No faces were detected during the enroll or authentication process");
            break;
        case 3:
            message.error("Unrecognized face on this application's Facial Index");
            break;
        case 4:
            message.error("Two or more faces were detected during the scan process");
            break;
        case 5:
            message.error("User enrolled previously (facial features already recorded). Cannot enroll again!");
            break;
        case 6:
            message.error("Minors are not allowed to enroll on this application!");
        break;
        case 7:
            message.error("Presentation (Spoof) Attack (PAD) detected during the scan process");
            break;
        case 8:
            message.error("Calculated Facial Vectors of the user being enrolled do not matches");
            break;
        case 9:
            message.error("Wrong PIN code supplied by the user being authenticated");
            break;
        case 10:
            message.error("Server side error");
            break;
        case 11:
            message.error("Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information");
            break;
        case 12:
            message.error("Terms & Conditions set out by FACEIO/host application rejected by the end user");
            break;
        case 13:
            message.error("The FACEIO Widget could not be (or is being) injected onto the client DOM");
            break;
        case 14:
            message.error("Client session expired. The first promise was already fulfilled but the host application failed to act accordingly");
            break;
        case 15:
            message.error("Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)");
            break;
        case 16:
            message.error("Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications");
            break;
        case 17:
            message.error("Origin or Referer HTTP request header is empty or missing");
            break;
        case 18:
            message.error("Domain origin is forbidden from instantiating fio.js");
            break;
        case 19:
            message.error("Country ISO-3166-1 Code is forbidden from instantiating fio.js");
            break;
        case 20:
            message.error("Another authentication or enrollment session is in progress");
            break;
        case 21:
            break;
        default:
            message.error("Error while establishing network connection with the target FACEIO processing node");
            break;
    }
}

export {
    handleError
}