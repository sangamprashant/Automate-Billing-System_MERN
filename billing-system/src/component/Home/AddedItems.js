import { Button, Card, Col, Row, Space, Table, Tooltip, message } from "antd";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import AddIcon from "@mui/icons-material/Add";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReplayIcon from "@mui/icons-material/Replay";
import { SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";

function AddedItems({ selectedProducts, handleUndo, handleRedo }) {
  const { isLogged, setIsLogged, goToPayment, setGoToPayment } =
    useContext(AppContext);

  const [discountPercentagePerUnit, setDiscountPercentagePerUnit] = useState(0.0);
  const [discountAmountPerUnit, setDiscountAmountPerUnit] = useState(0.0);
  const [totalDiscountGivenInOverall, setTotalDiscountGivenInOverall] = useState(0.0);
  const [calculatedTotalDiscountOfAllDiscount, setCalculatedTotalDiscountOfAllDiscount] = useState(0.0);
  const [selectItemsTotal,setSelectItemsTotal] = useState(0.0)
  const [qtyCount, setQtyCount] = useState(0);

  const handlePositiveNumberChange = (inputValue, setterFunction) => {
    if (inputValue === "") {
      setterFunction(0);
    } else {
      const numericValue = parseFloat(inputValue);
      if (!isNaN(numericValue) && numericValue >= 0) {
        if (selectItemsTotal <= (calculatedTotalDiscountOfAllDiscount+numericValue)) {
          setterFunction(0)
          message.error("Discount can't be more than total price");
        } else {
          setterFunction(numericValue);
        }
      } else {
        message.error("Enter a non-negative number");
      }
    }
  };
  const handleDiscountPercentageChange = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue > 100) {
      return message.error("Percentage can't be more than 100%");
    }
    handlePositiveNumberChange(inputValue, setDiscountPercentagePerUnit);
  };

  const handleDiscountAmountChange = (e) => {
    const inputValue = e.target.value.trim();
    handlePositiveNumberChange(inputValue, setDiscountAmountPerUnit);
  };
  const handleOverallDiscountChange = (e) => {
    const inputValue = e.target.value.trim();
    handlePositiveNumberChange(inputValue, setTotalDiscountGivenInOverall);
  };

  useEffect(() => {
    let totalDiscount = 0.0;
    let itemsTotal = 0.0;
    let QuantityCount = 0;
    selectedProducts.forEach((product) => {
      const discountPerUnit = product.p_total * (discountPercentagePerUnit / 100);
      totalDiscount += discountPerUnit;
      itemsTotal += product.p_total;
      QuantityCount += product.p_count;
    });
  
    totalDiscount += selectedProducts.length * Number(discountAmountPerUnit);
    totalDiscount += Number(totalDiscountGivenInOverall);
    setCalculatedTotalDiscountOfAllDiscount(totalDiscount);
    setSelectItemsTotal(itemsTotal);
    setQtyCount(QuantityCount);
  }, [selectedProducts, discountPercentagePerUnit, discountAmountPerUnit, totalDiscountGivenInOverall]);

  return (
    <div className="home-main item-section">
      {/* North Section */}
      <div className="north-section py-3 d-flex  px-3 gap-4 flex-column bg-ui">
        {/* product search */}
        <table>
          <tbody>
            <tr className="d-flex  align-items-end gap-2">
              <td className="">
                <strong className=" text-nowrap text-primary">
                  Search By Product:
                </strong>
                <input
                  className="form-control bg-warning-subtle"
                  placeholder="Search"
                  disabled={goToPayment}
                />
              </td>
              <td>
                <strong className=" text-nowrap text-primary">Barcode:</strong>
                <input
                  className="form-control bg-warning-subtle "
                  placeholder="Barcode"
                  disabled={goToPayment}
                />
              </td>
              <td>
                <strong className=" text-nowrap text-primary">Qty:</strong>
                <input
                  className="form-control bg-warning-subtle"
                  placeholder="QTY"
                  disabled={goToPayment}
                />
              </td>
              <td className="d-flex  align-items-center">
                <button className="btn btn-primary" disabled={goToPayment}>
                  <SearchIcon />
                </button>
                {/* <button className="btn btn-primary" disabled={goToPayment}><AddIcon/></button> */}
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr className="d-flex  align-items-end gap-2">
              <td className="">
                <label className=" text-nowrap">Disc%PU:</label>
                <input
                  className="form-control bg-warning-subtle"
                  type="number"
                  placeholder="00%"
                  disabled={goToPayment}
                  value={discountPercentagePerUnit}
                  onChange={handleDiscountPercentageChange}
                />
              </td>
              <td>
                <label className=" text-nowrap">Dics Amt PU:</label>
                <input
                  className="form-control bg-warning-subtle "
                  type="number"
                  placeholder="0.00"
                  disabled={goToPayment}
                  value={discountAmountPerUnit}
                  onChange={handleDiscountAmountChange}
                />
              </td>

              <td>
                <label className=" text-nowrap">Overall Disc Amt:</label>
                <input
                  className="form-control bg-warning-subtle"
                  placeholder="0.00"
                  type="number"
                  disabled={goToPayment}
                  value={totalDiscountGivenInOverall}
                  onChange={handleOverallDiscountChange}
                />
              </td>
              <td>
                <label className=" text-nowrap">Total Disc Amount:</label>
                <input
                  className="form-control bg-warning-subtle "
                  placeholder="0.00"
                  disabled
                  value={calculatedTotalDiscountOfAllDiscount.toFixed(2)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          {/* buttons */}
          <Space size={[8, 16]} wrap className="justify-content-center">
            <Tooltip title="Reset the billing items">
              <button className="btn btn-primary" disabled={goToPayment} >
                Reset
              </button>
            </Tooltip>
            <Tooltip title="Undo" onClick={handleUndo}>
              <button className="btn btn-primary" disabled={goToPayment} >
                <UndoIcon />
              </button>
            </Tooltip>
            <Tooltip title="Redo" onClick={handleRedo}>
              <button className="btn btn-primary" disabled={goToPayment} >
                <RedoIcon />
              </button>
            </Tooltip>
          </Space>
        </div>
      </div>

      <div className="product-section-scroll border p-2">
        {/* table content here */}
        <Table
          dataSource={selectedProducts}
          pagination={false}
          style={{ height: "100%" }}
        >
          <Table.Column
            title="Product image"
            dataIndex="p_image"
            key="p_image"
            render={(text, record) => (
              <img
                src={record.p_image}
                alt={record.p_name}
                style={{ width: 50, height: 50, objectFit: "contain" }}
              />
            )}
          />
          <Table.Column title="Product Name" dataIndex="p_name" key="p_name" />
          <Table.Column title="Barcode" dataIndex="p_id" key="p_id" />
          <Table.Column title="Qty" dataIndex="p_count" key="p_count" />
          <Table.Column title="Rate" dataIndex="p_price" key="p_price" />
          <Table.Column title="Total" dataIndex="p_total" key="p_total" />
        </Table>
      </div>

      {/* South Section */}
      <div className="south-section py-2 d-flex justify-content-between align-items-center flex-column px-4 bg-ui">
        {/* order details */}
        <table className="table table-product text-center ">
          <thead>
            <tr>
              <td className="box-cell-top bg-primary text-white shadow">
                ITEMS
              </td>
              <td className="box-cell-top bg-primary text-white shadow">QTY</td>
              <td className="box-cell-top bg-primary text-white shadow">
                TOTAL
              </td>
              <td className="box-cell-top bg-primary text-white shadow">TAX</td>
              <td className="box-cell-top bg-primary text-white shadow ">
                TOTAL BILL AMT
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="box-cell-bottom shadow">
                {selectedProducts.length}
              </td>
              <td className="box-cell-bottom shadow">{qtyCount}</td>
              <td className="box-cell-bottom shadow">
              ₹{selectItemsTotal.toFixed(2)}
              </td>
              <td className="box-cell-bottom shadow">0.00%</td>
              <td className="box-cell-bottom shadow">₹{(selectItemsTotal - calculatedTotalDiscountOfAllDiscount).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddedItems;
