import React from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import './styles/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {handleLogout} from '../actions/userAction.js'
const Header = () => {
  const dispatch=useDispatch();
  let history=useHistory();
  const userLoginState = useSelector(state=>state.userLogin); 
  const {isloggedIn,email}= userLoginState.userInfo;
  const orderState = useSelector(state=>state.orderState)
  const basket=orderState.basket;
  const handleAuthenticaton = () => {
    if (isloggedIn) {
      dispatch(handleLogout(history));
    }
  }
  return (
    <div className="header">
        <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
        </Link>
       
        <div className="header_search">
            <input className="header_searchInput" type="text"/>
            <SearchIcon className="header_searchIcon"/>
        </div>
        <div className="header_nav">
            <Link to ={{pathname: !isloggedIn ? '/login':'/userdetail'}}>
            <div className="header_option" onClick={handleAuthenticaton}>
                <span className="header_optionLineOne">Hello {!isloggedIn ? 'Guest' : email}</span>
                <span className="header_optionLineTwo">{email ? 'Sign Out' : 'Sign In'}</span>
            </div>

            </Link>
            <div className="header_option">
                <span className="header_optionLineOne"> Returns</span>
                <span className="header_optionLineTwo">& Orders</span>
            </div>
            <div className="header_option">
                <span className="header_optionLineOne"> Your</span>
                <span className="header_optionLineTwo">Prime</span>
            </div>
            <Link to="/checkout">
                 <div className="header_optionBasket">
                  <ShoppingBasketIcon/>
                  <span className="header_optionLineOne header_basketCount">{basket.length}</span>
                </div>
            </Link>
           
        </div>
    </div>
  )
}

export default Header