const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const Items = require('../models/Items')
const  Stocks =require('../models/Stock')

const adminLogin= async (req, res) => {
		let success = false;

		const { email, password } = req.body;
		try {
			let admin = await Admin.findOne({ email });
			if (!admin) {
				success = false
				return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
			}

			const passwordCompare = password=== admin.password;
			if (!passwordCompare) {
				success = false
				return res.status(400).json({ success, error: "The e-mail address and/or password you specified are not correct." });
			}
			success = true;
			const data= {
					_id: admin._id
				}
			const maxAge=3*24*60*60
			const authtoken = jwt.sign(data, process.env.JWT_SECRET,{
				expiresIn: maxAge
			});			
			// res.cookie('token', authtoken, {domain: 'localhost:3000', path: '/', maxAge: maxAge * 1000 });
			return res.status(200).json({token:authtoken});
		} catch (error) {
			console.error(error.message);
			res.status(500).json({ success: false, error: "Internal Server Error" });
		}
	};

	const adminAddNewProduct=async(req,res)=>{
		const {title, image,price,description,category,stocks}=req.body; 
		console.log("jj")
		try{
			const admin=await Admin.findById(req.adminId);
			const item=await Items.create({admin:admin._id,adminName:admin.name,title, image,price,description,category});
			console.log(item)
			await Stocks.create({item:item._id,quantity:stocks})
			return res.status(200).send("success");
		}catch(err){
			return res.status(500).send();
		}
	}

	




	module.exports={adminLogin,adminAddNewProduct}
      