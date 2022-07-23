import React from "react";
import { useSelector, useDispatch} from "react-redux"
import { useEffect,useState} from "react"
import { getUserDetails,editUserProfile } from "../actions/userAction"
import "./styles/User.css"
import {CircularProgress,Button} from "@mui/material"
import { useHistory,Link } from "react-router-dom"
const User = () => {
  let history=useHistory()
  const dispatch = useDispatch()
  const userDetailState = useSelector((state) => state.userDetails)
  const { loading, user } = userDetailState

	const [errorState,setErrorState]=useState('')
	const [togglePhone, setTogglePhone] = useState(false);
	const [toggleAddress, setToggleAddress] = useState(false);
	const [addPhone, setAddPhone] = useState("");
	const [addAddress,setAddAddress]= useState("");
  useEffect(() => {
    dispatch(getUserDetails(history))
  }, [])

	const handleTogglePhone=()=>{
		setErrorState('')
		setToggleAddress(false);
		setTogglePhone(true);
	}

	const handleToggleAddress=()=>{
		setErrorState('')
		setTogglePhone(false);
		setToggleAddress(true);
	}

	const handleCancelToggle=()=>{
		setErrorState('')
		setToggleAddress(false)
		setTogglePhone(false)
	}

	const handleAddAddress=(e)=>{
		e.preventDefault();
		if(addAddress.length<10 || addAddress.length>100){
			setErrorState('Enter Address length between 10 to 100 Characters long');
		}else{
			dispatch(editUserProfile(history,addAddress,null));
			setAddPhone('')
			setAddAddress('')
			setErrorState('')
			setToggleAddress(false);
		}
	}

	const handleAddPhone=(e)=>{
		e.preventDefault();
		if(addPhone.length!==10)
		{
			setErrorState('Phone Number must be of 10 digits long')
		}else{
			dispatch(editUserProfile(history,null,addPhone));
			setAddPhone('')
			setAddAddress('')
			setErrorState('')
			setTogglePhone(false);
		}
	}

  return (
    <>
      {
				loading === true ? (
        <CircularProgress color="success" />
      ) : (
        <section style={{ backgroundcolor: "#eee" }}>
          <div className="container py-5">
            <div className="row">
              <div className="col">
                <nav
                  aria-label="breadcrumb"
                  className="bg-light rounded-3 p-3 mb-4"
                >
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#">User</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      User Profile
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: "150px" }}
                    />
                    <h5 className="my-3">{user.name}</h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row ">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
        
                      <div className="col-sm-9">
											{
													togglePhone === false ?
													< div className="flex">
														<p className="text-muted mb-0">{user.phone===undefined? 'Your Phone':user.phone}</p>
														<Button onClick={handleTogglePhone} >Edit</Button>
													</div>
													: 
													<form>
															<input type="text" className="form-control " placeholder="Add Phone" value={addPhone} onChange={(e) => {
																setAddPhone(e.target.value);
															} } />
															<span  style={{color:"red"}}>{errorState}</span>
                              
                              <div className="form__button">
                                <Button onClick={handleAddPhone} size="small" variant="contained">Save</Button>
                                <Button onClick={handleCancelToggle} size="small" variant="contained" sx={{ml:2,color:'#100F0F',backgroundColor:'#A5C9CA', '&:hover':{backgroundColor:'#A5C9CA'}}}>
                                  Cancel
                                </Button>
                              </div>
													</form>
										}
                    </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Address</p>
                      </div>
                      <div className="col-sm-9">
											{
													toggleAddress === false ?
													<div className="flex">
													<p className="text-muted mb-0"> {user.address===undefined?'Your Address':user.address}</p>
														<Button onClick={(e) => {
															handleToggleAddress(true);
														}} >Edit</Button>
													</div>
													: 
                          
													<form>
															<input type="text" className="form-control " placeholder="Add Address" value={addAddress} onChange={(e) => {
																setAddAddress(e.target.value);
															} } />
															<span style={{color:"red"}}>{errorState}</span>
                              <div className="form__button">
                                <Button onClick={handleAddAddress} size="small" variant="contained" >Save</Button>
                                <Button onClick={handleCancelToggle} size="small"  sx={{color:'#100F0F',ml:2,backgroundColor:'#A5C9CA', '&:hover':{backgroundColor:'#A5C9CA'}}}>Cancel</Button>
                              </div>
                          </form>
                              
											}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default User