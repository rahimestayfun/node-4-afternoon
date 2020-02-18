const swag = require('./../models/swag');

addSwag = (req,res)=>{
    const {id} = req.params;
    // const {title,category,price} = req.body;
    const index = swag.findIndex(el => el.id === +id);

    if(index !== -1){
        const selectedSwag = swag[index];
        req.session.user.cart.push(selectedSwag);
        req.session.user.total += selectedSwag.price;
    }
    res.status(200).json(req.session.user)
}

deleteSwag = (req,res)=>{
    const {id} = req.params;
    const index = req.session.user.cart.findIndex(swag => swag.id === +id);
    if(index !== -1){
        const swagToDelete = swag.find(swag=> swag.id === +id);
        req.session.user.cart.splice(index,1);
        req.session.user.total -= swagToDelete.price;
    }
    res.status(200).json(req.session.user);
}

checkout = (req,res)=>{
    // req.session.user.cart = [],
    // req.session.user.total =0,
    // res.status(200).send(req.session.user);
    console.log(req.session);

    const {user}= req.session;
    user.cart = [];
    user.total=0;
    res.status(200).json(user)
}

module.exports = {
    addSwag,
    deleteSwag,
    checkout
}
   
   