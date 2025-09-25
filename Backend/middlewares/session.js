const jwtAuthMiddleware = require('./jwtAuth');
return module.exports = (req, res, next) => { 

    if (req.headers.authorization){
        return jwtAuthMiddleware(req, res, next);
    }
    
    const user = req.session.user;
    if(!user){
        return res.status(401).json({ code: 'UA', message: 'User not logged in!'});
    }
    req.user = user;
    next();
}