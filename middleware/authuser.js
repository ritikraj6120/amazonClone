var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
	// console.log(token);
    // console.log(token)
    if (!token) {
       return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.userId = data._id;
        console.log(req.userId);
        next();
    } catch (error) {
        console.log("mamldjdljjdvwv")
       return res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;