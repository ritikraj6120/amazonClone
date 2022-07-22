import React from 'react'
import './styles/Login.css'
import { Link, useHistory } from "react-router-dom";
import {useState} from 'react'
import { useDispatch} from 'react-redux'
import { signup } from '../actions/userAction.js';
//import { auth } from './firebase'
const Signup = () => {
    let history = useHistory()
	const dispatch = useDispatch()
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const signUp = e => {
        e.preventDefault();
        const user = {
            name:name,
			email: email,
			password: password
		};
		dispatch(signup(user, history));
        // // auth
        // // .signInWithEmailAndPassword(email, password)
        // .then((auth) => {
        //     history.push('/')
        // })
        // .catch(error => alert(error.message))
    }
// const register = e => {
//     e.preventDefault();

    // auth
    // .createUserWithEmailAndPassword(email, password)
    // .then((auth) => {
    //     if (auth) {
    //         history.push('/')
    //     }
    // })
    // .catch(error => alert(error.message))
// }

  return (
    <div className="login">
        <Link to = "/">
        <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
        </Link>
        <div className="login__container">
            <h1>Sign Up</h1>
            <form action='' method='post'>
                <h5>Name</h5>
                <input type="text" value={name} onChange = {e => setname(e.target.value)} autoComplete = "off"/>
                <h5>E-mail</h5>
                <input type="text" value={email} onChange = {e => setemail(e.target.value)} autoComplete = "off"/>
                <h5>Password</h5>
                <input type="password"  value={password} onChange = {e => setpassword(e.target.value)} autoComplete = "off"/>
                <button className="login__signInButton " type='submit' onClick={signUp}>Sign UP</button>
            </form>
						<div className="login__signUp login__signIn">							
							<Link to="/login">
								Sign In
							</Link>
					</div>
            <p>
            By signing-up you agree to the AMAZON Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            {/* <button  onClick={register} className="login__registerButton">Create your amazon account</button> */}
        </div>
    </div>
  )
}

export default Signup