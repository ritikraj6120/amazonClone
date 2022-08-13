import { Switch, Route, Redirect} from "react-router-dom";
import {useSelector } from 'react-redux';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Checkout from './components/Checkout';
import User from './components/User';
import Summary from "./components/Summary";
import SingleProduct from "./components/SingleProduct.js";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminPage from "./components/Admin/AdminPage";
import AdminWork from "./components/Admin/AdminWork";
const AllRoutes = () => {
	const userLoginState = useSelector(state => state.userLogin)
	const isloggedIn=userLoginState.userInfo.isloggedIn
	const adminState=useSelector(state=>state.adminLogin)
	const isAdmin=adminState.adminInfo.isAdmin
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
		<Route exact path="/admin">
		{
			isAdmin?
			<AdminPage/>:
			<Redirect to="/adminlogin"/>
		}
		</Route>

		<Route exact path="/adminlogin">
		{
			isAdmin?
			<Redirect to="/admin"/>:
			<AdminLogin/>
		}
		</Route>
		<Route exact path="/admin/:work">
			{
				!isAdmin?
				<Redirect to="/adminlogin"/>:
				<AdminWork/>
			}
		</Route>
		
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