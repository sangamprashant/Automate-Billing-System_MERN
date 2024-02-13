import { Button } from "antd";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import React, { useState } from "react";

function ButtonSection({
  categories,
  categorySelected,
  setCategorySelected,
  setScrollIndex,
}) {
  const [scrollIndex, setScrollIndexButton] = useState(0);

  const handleScroll = (index) => {
    const targetElement = document.getElementById(`scroll-button-${index}`);
    setScrollIndexButton(index);
    if (targetElement) {
      try {
        targetElement.scrollIntoView({ behavior: "smooth" });
        console.log(`Scrolling to product item ${index} initiated.`);
      } catch (error) {
        console.error("Scrolling failed:", error);
      }
    } else {
      let temp = 0;
      if (index <= 0) {
        temp = 0;
        setScrollIndexButton(0);
      } else {
        temp = categories.length - 1;
        setScrollIndexButton(categories.length - 1);
      }
      document
        .getElementById(`scroll-button-${temp}`)
        .scrollIntoView({ behavior: "smooth" });
    }
  };

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
          onClick={() => handleScroll(scrollIndex - 5)}
        />
      </div>

      {/* Main Content Section */}
      <div className=" button-section-scroll p-2">
        {categories?.map((data, index) => (
          <button
            key={index}
            id={`scroll-button-${index}`}
            className={`w-100 mb-4 p-3 btn btn-${
              categorySelected === data.category ? "primary" : "secondary"
            }`}
            onClick={() => {
              setCategorySelected(data.category);
              setScrollIndex(0);
            }}
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
          onClick={() => handleScroll(scrollIndex + 5)}
        />
      </div>
    </div>
  );
}

export default ButtonSection;
