import React from "react";
import { ReactPhotoCollage } from "react-photo-collage";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
const OrderItem = (props) => {
    let history = useHistory();
    let { order } = props;
    let { order_id, amount, totalItems, items, date} = order;
    date = new Date();
    let imagesArray = [];
    for (let i = 0; i < items.length; i++) {
        let imgSrc = items[i].image;
        let imgObj = {};
        imgObj["source"] = imgSrc;
        imagesArray.push(imgObj);
    }
    const setting = {
        width: "600px",
        height: ["170px"],
        layout: [2],
        photos: imagesArray,
        showNumOfRemainingPhotos: true,
    };
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const handleSingleOrder = (orderid) => {
        history.push(`/orders/${orderid}`);
    };

    return (
        <div
            className="card"
            style={{ backgroundColor: "white", width: "100vw", height: "45vh" }}
        >
            <ReactPhotoCollage className="card-img-top" {...setting} />
            <div className="card-body">
                <p className="card-text">
                    Total <b>{totalItems}</b> items Ordered for Rs {amount}{" "}
                    <Button
                        variant="contained"
                        sx={{ marginLeft: "50px" }}
                        onClick={() => handleSingleOrder(order_id)}
                    >
                        See Full Details
                    </Button>
                </p>
                <p className="card-text">
                    <small className="text-muted">
                        Ordered on {date.getDate()}{" "}
                        {monthNames[date.getMonth()]} {date.getFullYear()}
                    </small>
                </p>
            </div>
        </div>
    );
};

export default OrderItem;
