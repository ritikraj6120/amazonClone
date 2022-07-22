import Cookies from 'js-cookie'

export const getCookie=(cookieName)=>{
	return Cookies.get(cookieName)
}

export const removeCookie=(cookieName)=>{
	Cookies.remove(cookieName)
}

export const setCookie=(name,value)=>{
	var inThreeDays = new Date(new Date().getTime() +  3*24*60*60*1000)
	Cookies.set(name, value, { expires: inThreeDays, path: '/' })
}
