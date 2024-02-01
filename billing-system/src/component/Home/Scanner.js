import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner({
  scanResult,
  setScanResult,
  isScannerOpen,
  setIsScannerOpen,
}) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 60,
    });

    // Render the scanner and set up callbacks
    scanner.render(onSuccess, onError);

    // Cleanup the scanner when the component unmounts
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [isScannerOpen]);

  // Callback when QR code is successfully scanned
  function onSuccess(qrCodeMessage) {
    setScanResult(qrCodeMessage);
  }

  // Callback when an error occurs during scanning
  function onError(errorMessage) {
    console.warn(errorMessage);
  }

  return (
    <div className="profile-web-cam-container  ">
      <div className="bg-white p-2 rounded-3 shadow col-md-4">
        {!scanResult ? <div id="reader"></div> : <p>{scanResult}</p>}
        <div className="mt-4">
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              setIsScannerOpen(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
