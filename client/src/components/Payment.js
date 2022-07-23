
import { getCookie } from "../Cookies/Cookie";
const verifyPayment=async(response,history)=>{
	const response2 = await fetch('http://localhost:5000/verifypayment', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			"auth-token": getCookie('token')
		},
		body: JSON.stringify(response)
	});
	console.log("response2 is here")
	if(response2.status===200){
		const responseID=response.razorpay_order_id;
		history.push(`/summary/${responseID}`);
	}else if(response.status===400){
		alert("Payment not legitimate");
		history.push('/');
	}else{
		history.push('/');
	}
}

const optionsCreater = (amount, order_id,history) => {
	const options = {
		"key": "rzp_test_pBc3IC0wxhVEBR",
		"amount": amount,
		"currency": "INR",
		"name": "Shopping",
		"order_id": order_id,
		"handler": async (response) => {
			// const json=await response.json()
			// console.log(response)
			 verifyPayment(response,history);
			console.log("payment verified");
		},
		"theme": {
			"color": "#2300a3"
		},
		prefill: {
			name: "Ritik raj",
			email: "ritik@gmail.com",
			contact: "9999999999",
		  },
	};
	return options;
}

export const handlePayment = async (event,money,items,history) => {
	event.preventDefault();
	let result = items.map(a => a.id);
	// eslint-disable-next-line no-console
	const amount_details = {
		amount: money,
		items:result
	};
	const response = await fetch('http://localhost:5000/orders', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			"auth-token": getCookie('token')
		},
		body: JSON.stringify(amount_details)
	});

	if (response.status === 200) {
		const data = await response.json();
		const orderid=data.id;
		const options = optionsCreater(parseInt(money), orderid,history)
		var razorpayObject = new window.Razorpay(options);
		// console.log(razorpayObject);
		razorpayObject.on('payment.failed', function (response) {
			// console.log(response);
			alert("Payment Failed. Please Try Again");
		});

		razorpayObject.open();
	}
	else {
		const error = await response.json()
		alert("payment Failed. Please Try Again")
	}
};