import { Switch, Route, Redirect,useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from './actions/userAction.js'
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Checkout from './components/Checkout';
import User from './components/User';
import Summary from "./components/Summary";
import SingleProduct from "./components/SingleProduct.js";
const AllRoutes = () => {
	const dispatch = useDispatch();
	let history=useHistory();
	const userLoginState = useSelector(state => state.userLogin)
	const isloggedIn=userLoginState.userInfo.isloggedIn
	console.log(isloggedIn)
	// console.log(userLoginState)
	// console.log(isloggedIn)
	// useEffect(() => {
	// 	if( userLoginState.userInfo===null){
	// 		dispatch(handleLogout(history));
	// 	}
	// }, [userLoginState])
	
	return (
		<Switch>
			<Route exact path="/login">
				{
					isloggedIn ?
						<Redirect to="/"/> :
						<Login />
				}
			</Route>
			<Route exact path="/signup">
			{
				isloggedIn ?
					<Redirect to="/" /> :
					<Signup />
			}
			</Route>
			<Route exact path="/account">
			{
				isloggedIn ?
					<>
						<Header/>
						<User />
						</> 	 
						:
						<Redirect to="/login" />
				}
				
			</Route>
			<Route exact path='/checkout'>
			{
				isloggedIn ?
						<>
						<Header/>
						<Checkout/>
						</>	 :
						<Redirect to="/login" />
				}				
			</Route>
			<Route exact path="/summary/:orderId">
			{
				isloggedIn ?
						<>
						<Header/>
						<Summary/>
						</>	 :
						<Redirect to="/login" />
			}
			</Route>
			<Route exact path='/'>
					<Header/>
					<Home/>						
			</Route>
			<Route exact path="/product/:productId">
				<Header/>
				<SingleProduct/>
			</Route>
		</Switch>
	);
}

export default AllRoutes;