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
const AllRoutes = () => {
	const dispatch = useDispatch();
	let history=useHistory();
	const userLoginState = useSelector(state => state.userLogin.userInfo.authtoken)
	// const authtoken=userLoginState.userInfo.authtoken
	console.log(userLoginState.userInfo.authtoken)
	console.log(userLoginState)
	const authtoken=userLoginState
	// useEffect(() => {
	// 	if( userLoginState.userInfo===null){
	// 		dispatch(handleLogout(history));
	// 	}
	// }, [userLoginState])
	
	return (
		<Switch>
			<Route exact path="/login">
				{
					authtoken ?
						<Redirect to="/"/> :
						<Login />
				}
			</Route>
			<Route exact path="/signup">
				{
					authtoken ?
						<Redirect to="/" /> :
						<Signup />
				}
			</Route>
			<Route exact path="/userdetail">
			{
				authtoken ?
					<>
						<Header/>
						<User />
						</> 	 
						:
						<Redirect to="/login" />
				}
				
			</Route>
			<Route path='/checkout'>
			{
				authtoken ?
						<>
						<Header/>
						<Checkout/>
						</>	 :
						<Redirect to="/login" />
				}				
			</Route>
			<Route path='/'>
					<Header/>
					<Home/>						
			</Route>
		</Switch>
	);
}

export default AllRoutes;