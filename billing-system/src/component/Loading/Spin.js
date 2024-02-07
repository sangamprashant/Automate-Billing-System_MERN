import React from "react";
import { Spin, message } from "antd";

function Spiner() {
  return (
    <Spin tip="Loading.." size="large" className="mt-5">
      <div className="content" />
    </Spin>
  );
}

export default Spiner;
