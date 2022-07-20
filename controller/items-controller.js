const Item = require('../models/Items')

const fetchItems =async (req,res)=>{
    try {
        const items = await Item.find()
        // const {paswword,__v,...others}
        console.log(items)
        res.status(200).json(items)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


module.exports={fetchItems}
  