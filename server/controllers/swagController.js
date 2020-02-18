const swag = require('../models/swag');

getSwag = (req,res,next)=>{
    res.status(200).json(swag);

}

module.exports = {
    getSwag
}