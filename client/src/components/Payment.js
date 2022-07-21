
const verifyPayment=async(response)=>{
	const response2 = await fetch('http://localhost:5000/verifypayment', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: response
	});
	if(response2.status===200){
		const json=await response2.json()
		const responseID=response
		history.push(`/summary:${responseID}`);
	}else if(response.status===400){
		alert("Payment not legitimate");
	}else{
		history.push('/');
	}
}

const optionsCreater = (amount, order_id) => {
	const options = {
		"key": "rzp_test_pBc3IC0wxhVEBR",
		"amount": amount,
		"currency": "INR",
		"name": "Shopping",
		"order_id": order_id,
		"handler": function (response) {
			console.log(response)
			await verifyPayment(response);
			console.log("payment verified");
		},
		"theme": {
			"color": "#2300a3"
		}
	};
	return options;
}

export const handlePayment = async (event,money,items) => {
	event.preventDefault();
	console.log(items)
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
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(amount_details)
	});

	if (response.status === 200) {
		const data = await response.json();
		const orderid=data.id;
		const options = optionsCreater(parseInt(money), orderid)
		var razorpayObject = new window.Razorpay(options);
		console.log(razorpayObject);
		razorpayObject.on('payment.failed', function (response) {
			console.log(response);
			alert("Payment Failed. Please Try Again");
		});

		razorpayObject.open();
	}
	else {
		const error = await response.json()
		alert("payment Failed. Please Try Again")
	}
};