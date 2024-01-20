import React, { useContext, useState } from "react";
import "./Home.css";
import ProductSection from "./ProductSection";
import ButtonSection from "./ButtonSection";
import AddedItems from "./AddedItems";
import Payment from "./Payment";
import { AppContext } from "../../AppContext";

function Home() {
  const { isLogged, setIsLogged, goToPayment, setGoToPayment } =
    useContext(AppContext);
  return (
    <div className="d-flex bg-white">
      <AddedItems />
      {!goToPayment ? (
        <>
          <ButtonSection />
          <ProductSection />
        </>
      ) : (
        <Payment />
      )}
    </div>
  );
}

export default Home;
