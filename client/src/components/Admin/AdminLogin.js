import React from 'react'
import '../styles/Login.css'
import { Link, useHistory } from "react-router-dom";
import {useState} from 'react'
import { useDispatch} from 'react-redux'
import { adminLogin } from '../../actions/adminAction.js';


const AdminLogin = () => {

    let history = useHistory();
	const dispatch = useDispatch();
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const signIn = e => {
      e.preventDefault();
      const user = {
			email: email,
			password: password
		};
		dispatch(adminLogin(user, history));
        // // auth
        // // .signInWithEmailAndPassword(email, password)
        // .then((auth) => {
        //     history.push('/')
        // })
        // .catch(error => alert(error.message))
    }


    
  return (
    <div className="login">
    <Link to = "/">
    <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
    </Link>
    <div className="login__container">
        <h1>Sign IN</h1>
        <form action='' method='post'>
            <h5>Admin E-mail</h5>
            <input type="text" value={email} onChange = {e => setemail(e.target.value)} autoComplete="true"/>
            <h5>Admin Password</h5>
            <input type="password"  value={password} onChange = {e => setpassword(e.target.value)} autoComplete="true"/>
            <button className="login__signInButton " type='submit' onClick={signIn}>Sign IN</button>
        </form>
    </div>
</div>
  )
}

export default AdminLogin