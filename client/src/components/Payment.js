import { getCookie } from "../Cookies/Cookie";
import { emptyItemsFromBasket } from "../actions/orderAction";
import { notifyError, notifyWarning } from "../alert";
const verifyPayment = async (response, history, dispatch) => {
    const response2 = await fetch("http://localhost:5000/verifypayment", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
        },
        body: JSON.stringify(response),
    });
    if (response2.status === 200) {
        const responseID = response.razorpay_order_id;
        dispatch(emptyItemsFromBasket());
        history.push(`/summary/${responseID}`);
    } else if (response.status === 400) {
        alert("Payment not legitimate");
        history.push("/");
    } else {
        history.push("/");
    }
};

const optionsCreater = (amount, order_id, history, dispatch) => {
    const options = {
        key: "rzp_test_pBc3IC0wxhVEBR",
        amount: amount,
        currency: "INR",
        name: "Amazon Shopping",
		image: "http://pngimg.com/uploads/amazon/amazon_PNG11.png",
        order_id: order_id,
        handler: async (response) => {
            // const json=await response.json()
            // console.log(response)
			dispatch(emptyItemsFromBasket());
			history.push('/')
            // verifyPayment(response, history, dispatch);
            console.log("payment verified");
        },
        theme: {
            color: "#2300a3",
        },
        prefill: {
            name: "Ritik raj",
            email: "ritik@gmail.com",
            contact: "9999999999",
        },
    };
    return options;
};

export const handlePayment = async (event, money, basketDict, history, dispatch) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
	if(money<100){
		notifyWarning("Make Order Greater than Rs 100")
		return
	}
    const order_details = {
        amount: money,
        items: basketDict,
    };
    const response = await fetch("http://localhost:5000/make_order", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "auth-token": getCookie("token"),
        },
        body: JSON.stringify(order_details),
    });

    if (response.status === 200) {
        const json = await response.json();
        const orderid = json.id;
        const options = optionsCreater(
            parseInt(money),
            orderid,
            history,
            dispatch
        );
        var razorpayObject = new window.Razorpay(options);
        // console.log(razorpayObject);
        razorpayObject.on("payment.failed", function (response) {
            // console.log(response);
            notifyError("Payment Failed. Please Try Again");
        });

        razorpayObject.open();
    } else {
        const error = await response.json();
        notifyError(error);
    }
};
