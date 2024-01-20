import { Button, Card, Col, Row, Space, Table, Tooltip } from "antd";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import AddIcon from "@mui/icons-material/Add";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import SearchIcon from "@mui/icons-material/Search";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReplayIcon from "@mui/icons-material/Replay";
import { SearchOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { TableHead } from "@mui/material";
import { AppContext } from "../../AppContext";
const { Meta } = Card;
// Sample array of data for cards
const cardData = [
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    id: 1,
    title: "Europe Street beat",
    description: "www.instagram.com",
    imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  // Add more data items as needed
];

const dataSource = [
  {
    p_name: "example p_name here with string type",
    Barcode: "example Barcode here with number type",
    qty: "example qty here with number type",
    rate: "example rate here with number type",
    total: "example total here with number type",
  },
  {
    p_name: "item1",
    Barcode: 1234,
    qty: 10,
    rate: 5,
    total: 50,
  },
  {
    p_name: "item2",
    Barcode: 5678,
    qty: 10,
    rate: 10,
    total: 100,
  },
];

function AddedItems() {
  const { isLogged, setIsLogged, goToPayment, setGoToPayment } =
    useContext(AppContext);
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
                />
              </td>
              <td>
                <label className=" text-nowrap">Dics Amt PU:</label>
                <input
                  className="form-control bg-warning-subtle "
                  type="number"
                  placeholder="0.00"
                  disabled={goToPayment}
                />
              </td>

              <td>
                <label className=" text-nowrap">Total Disc Amt:</label>
                <input
                  className="form-control bg-warning-subtle"
                  placeholder="0.00"
                  type="number"
                  disabled={goToPayment}
                />
              </td>
              <td>
                <label className=" text-nowrap">Total Amount:</label>
                <input
                  className="form-control bg-warning-subtle "
                  placeholder="0.00"
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-end">
          {/* buttons */}
          <Space size={[8, 16]} wrap className="justify-content-center">
            <Tooltip title="Reset the billing items">
              <button className="btn btn-primary" disabled={goToPayment}>
                Reset
              </button>
            </Tooltip>
            <Tooltip title="Undo">
              <button className="btn btn-primary" disabled={goToPayment}>
                <UndoIcon />
              </button>
            </Tooltip>
            <Tooltip title="Redo">
              <button className="btn btn-primary" disabled={goToPayment}>
                <RedoIcon />
              </button>
            </Tooltip>
          </Space>
        </div>
      </div>

      <div className="product-section-scroll border p-2">
        {/* table content here */}
        <Table
          dataSource={dataSource}
          pagination={false}
          style={{ height: "100%" }}
        >
          <Table.Column title="Product Name" dataIndex="p_name" key="_id" />
          <Table.Column title="Barcode" dataIndex="Barcode" />
          <Table.Column title="Qty" dataIndex="qty" />
          <Table.Column title="Rate" dataIndex="rate" />
          <Table.Column title="Total" dataIndex="total" />
        </Table>
      </div>

      {/* South Section */}
      <div className="south-section py-2 d-flex justify-content-between align-items-center flex-column px-4 bg-ui">
        {/* order details */}
        <table className="table text-center ">
          <thead>
            <tr>
              <td className="box-cell-top bg-primary text-white shadow">
                ITEMS
              </td>
              <td className="box-cell-top bg-primary text-white shadow">QTY</td>
              <td className="box-cell-top bg-primary text-white shadow">
                DISCOUNT
              </td>
              <td className="box-cell-top bg-primary text-white shadow">TAX</td>
              <td className="box-cell-top bg-primary text-white shadow ">
                TOTAL BILL AMT
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="box-cell-bottom shadow">0</td>
              <td className="box-cell-bottom shadow">0</td>
              <td className="box-cell-bottom shadow">0.00</td>
              <td className="box-cell-bottom shadow">0.00</td>
              <td className="box-cell-bottom shadow">0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddedItems;
