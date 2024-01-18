import { Button } from "antd";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import React from "react";

function ButtonSection() {
  return (
    <div className="home-main button-section p-2 bg-ui">
      {/* North Section */}
      <div className="north-section py-3 ">
        <Button
          shape="round "
          icon={<NorthIcon />}
          size="large"
          className="w-100"
          type="primary"
        />
      </div>

      {/* Main Content Section */}
      <div className=" button-section-scroll p-2">
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-primary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-secondary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-secondary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-secondary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-secondary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-secondary">hello</button>
        <button className="w-100 mb-4 p-3 btn btn-secondary">hello</button>
        {/* Add other buttons or components here */}
      </div>

      {/* South Section */}
      <div className="south-section py-2">
        <Button
          shape="round"
          icon={<SouthIcon />}
          size="large"
          className="w-100"
          type="primary"
        />
      </div>
    </div>
  );
}

export default ButtonSection;
