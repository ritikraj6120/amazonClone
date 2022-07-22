const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const signUp = async (req,res)=>{
		// console.log(req);
		let isAuthenticated = false;
		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ isAuthenticated, error: errors.array() });
		// }
		try {
			// Check whether the user with this email exists already
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(409).json({ isAuthenticated, error: "Sorry a user with this e-mail address already exists" })
			}
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);
	
			// Create a new user
			user = await User.create({
				name: req.body.name,
				password: secPass,
				email: req.body.email,
			});
			// res.json(user)
			isAuthenticated = true;
	
			return res.status(200).json({ isAuthenticated })
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
const signIn= async (req, res) => {
		let success = false;
		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
		// }

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				success = false
				return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
			}

			const passwordCompare = await bcrypt.compare(password, user.password);
			if (!passwordCompare) {
				success = false
				return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
			}
			success = true;
			const data= {
					_id: user._id
				}
			const maxAge=3*24*60*60
			const authtoken = jwt.sign(data, process.env.JWT_SECRET,{
				expiresIn: maxAge
			});			
			// res.cookie('token', authtoken, {domain: 'localhost:3000', path: '/', maxAge: maxAge * 1000 });
			return res.status(200).json({token:authtoken,email:user.email,userName:user.name });
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ success: false, error: "Internal Server Error" });
		}
	};

	// changePassword,userDetails
	const changePassword =async (req,res)=>{
		try {
			let { currentPassword, newPassword } = req.body;
			let user = await User.findById(req.userId);
			const oldPasswordCompare = await bcrypt.compare(currentPassword, user.password);
			if (!oldPasswordCompare) {
				return res.status(400).json("Current Password is not Correct");
			}
			else {
				const newUser = {};
				const salt = await bcrypt.genSalt(10);
				newPassword = await bcrypt.hash(newPassword, salt);
				newUser.password = newPassword;
				const updatePassword = await User.findByIdAndUpdate(req.userId, { $set: newUser }, { new: true })
				return res.status(200).json("Password Updated Successfully");
			}
		}
		catch (err) {
			console.log(err);
			return res.status(500).json("Internal Server Happenend");
		}
	}


	// userDetails

	const userDetails=async (req,res)=>{
		try {
			let userId = req.userId;
			const user = await User.findById(userId).select('-password -__v')
			// const {paswword,__v,...others}
			res.status(200).json(user)
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}


	module.exports={signUp,signIn,changePassword,userDetails}
      