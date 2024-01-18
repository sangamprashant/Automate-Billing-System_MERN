import { Button, Card, Tooltip } from "antd";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
const { Meta } = Card;

function ProductSection() {
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

  return (
    <div className=" home-main product-section p-2 bg-ui">
      {/* North Section */}
      <div className="north-section py-3 d-flex  px-5 gap-4 justify-content-between ">
        <div className="d-flex gap-3">
          <Button
            shape="round "
            icon={<NorthIcon />}
            size="large"
            type="primary"
          />
          <h2>Product list : {"Fruits"}</h2>
        </div>
        <Button disabled className="bg-primary text-white">
          {" "}
          18% GST
        </Button>
      </div>

      {/* Main Content Section */}
      <div className="product-section-scroll p-2 bg-white rounded">
        <div className="product-section-container">
          {cardData.map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{
                width: 150,
                height: 200,
                margin: "0 10px 10px 0", // Adjust the margin as needed
              }}
              cover={
                <img
                  width="120"
                  height="120"
                  className="object-fit-cover"
                  alt="example"
                  src={item.imageUrl}
                />
              }
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          ))}
        </div>
        {/* Add other buttons or components here */}
      </div>

      {/* South Section */}
      <div className="south-section py-2 d-flex justify-content-between align-items-center px-5 ">
        <Button shape="round" icon={<SouthIcon />} size="large"   type="primary" />
        <Tooltip title="Payment">
          <button className="px-4 p-3 btn btn-success">
            <CurrencyRupeeIcon /> Pay
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ProductSection;
