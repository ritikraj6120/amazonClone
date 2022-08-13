import { Typography } from "@mui/material";
import * as React from "react";
import { Link} from "react-router-dom";
import "../styles/AdminPage.css";
import "../styles/Header.css";
const AdminPage = () => {
  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            className="header_logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          />
        </Link>
        <div className="header_nav">
          <h1 style={{ color: "white", align: "centre" }}>Admin</h1>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <Link to="/admin/additem"className="col-sm AdminCard">
		  	<Typography variant="h3">ADD ITEM</Typography>
          </Link>
		  <Link  to="/admin/edititem" className="col-sm AdminCard" >
		  	<Typography variant="h3">UPDATE ITEM</Typography>
          </Link>	  
		  <Link  to="/admin/deleteitem" className="col-sm AdminCard" >
		  	<Typography variant="h3">DELETE ITEM</Typography>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
