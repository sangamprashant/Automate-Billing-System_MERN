import { Button } from "antd";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import React, { useState } from "react";
import { ProductCategory } from "../Admin/Products/rawData";

function ButtonSection({ categories, categorySelected, setCategorySelected }) {
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
        {categories?.map((data, index) => (
          <button
            key={index}
            className={`w-100 mb-4 p-3 btn btn-${
              categorySelected === data.category ? "primary" : "secondary"
            }`}
            onClick={() => setCategorySelected(data.category)}
          >
            {data.category}
          </button>
        ))}
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
