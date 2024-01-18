import React from "react";
import "./Home.css"
import ProductSection from "./ProductSection";
import ButtonSection from "./ButtonSection";
import AddedItems from "./AddedItems";

function Home() {
  return (
    <div className="d-flex bg-white">
      <AddedItems  />
      <ButtonSection  />
      <ProductSection  />
    </div>
  );
}

export default Home;
