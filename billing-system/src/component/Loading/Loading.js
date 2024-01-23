import React, { useContext } from "react";
import { PropagateLoader } from "react-spinners";
import "./Loading.css";
import { AppContext } from "../../AppContext";

function Loading() {
  const { isLoading } = useContext(AppContext);
  return (
    <div className={`loading-overlay ${isLoading ? "visible" : ""}`}>
      <div>
        {isLoading ? (
          <PropagateLoader color="blue" loading={true} size={15} />
        ) : (
          "Loaded"
        )}
      </div>
    </div>
  );
}

export default Loading;
