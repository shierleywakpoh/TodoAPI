const jwt = require('jsonwebtoken') 

module.exports = function auth(req,res,next){
    const authHeader = req.headers.authorization || '';
    const [scheme,token] = authHeader.split(' ');

    console.log("type token", typeof(token) )

    if ((scheme !=='Bearer') || (!token)) return res.status(401).json({message :'Missing or invalid Authorization header'});
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user ={ name : decode.name , email : decode.email};
        next();
    }
    catch(err){
        if (err.name === 'TokenExpiredError'){
            return res.status(401).json({ message: 'Access token expired' })
        }
        return res.status(401).json({ message: 'Unauthorized' })
    }
}