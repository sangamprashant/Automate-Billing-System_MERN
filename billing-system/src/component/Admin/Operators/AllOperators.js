import React from "react";

import { VisibilityIcon } from "../../../assets/icons";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { UserImage } from "../../../assets/image";

function AllOperators({ tableData }) {
  return (
    <>
      <h5>Operators List</h5>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Profile Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={data.image || UserImage}
                  alt="profile image"
                  height={50}
                  width={50}
                  className="object-fit-contain"
                />
              </td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td >
                <Tooltip title={`View ${data.name}'s profile.`}>
                  <Link className="btn btn-primary mr-2" to={`/admin/operators/${data._id}`}>
                    <VisibilityIcon />
                  </Link>
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
