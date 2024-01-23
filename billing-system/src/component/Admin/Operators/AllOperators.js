import React from "react";

import { VisibilityIcon } from "../../../assets/icons";
import { Tooltip } from "antd";

function AllOperators({ tableData }) {
  return (
    <>
      <h5>Operators List</h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td className="d-flex gap-2">
                <Tooltip title={`View ${data.name}'s profile.`}>
                  <button className="btn btn-primary mr-2">
                    <VisibilityIcon />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AllOperators;
