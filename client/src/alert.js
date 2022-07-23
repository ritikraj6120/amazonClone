import { toast } from 'react-toastify';
const notifySuccess = (x) => {
	toast.success(x, {
		autoClose: 2000,
		position: "top-center",
	});
}
const notifyError = (x) => {
	toast.error(x, {
		autoClose: 2000,
		position: "top-right",
	});
}
const notifyWarning = (x,timing=2000) => {
	toast.warn(x, {
		autoClose: timing,
		position: "top-center",
	})
}
const notifyUnAuthorized = (x) => {
	toast.error(x, {
		autoClose: 500,
		position: "top-center",
	});
}

export {notifySuccess, notifyError, notifyWarning, notifyUnAuthorized };