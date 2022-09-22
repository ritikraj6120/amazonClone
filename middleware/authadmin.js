var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchadmin = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('admin-token');
    if (!token) {
       return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.adminId = data._id;
        next();
    } catch (error) {
       return res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchadmin;