
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    //verifyauthentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1]

    try{
         // Check if the token matches the admin credentials
         if (token === 'admin') {
            req.user = { role: 'admin' }; // You can add more admin info if needed
            return next();
        }
        // regular request
        const{_id} = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({_id}).select('_id')
        next()

    }catch(error) {
        console.log(error)
        res.status(401).json({error:'REQUEST IS NOT AUTHORIZED'});
    }
}

module.exports = requireAuth