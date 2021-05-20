"use strict";
// Node imports
const jwt = require('jsonwebtoken');
// Own imports
const { User } = require('../models');

// Middleware to control authentication
module.exports = async (req, res, next) => {
    try {
        // JWT Authentication (API)
        let reqToken = ( req.body['headers'] && req.body['headers']['Authorization']) || req.query.token || req.get('Authorization');
        if (!reqToken) {
            return res.status(401).json({
                data: 'Not Authorized'
            });
        }
        // Check JWT is expired
        if (reqToken.startsWith('Bearer') || reqToken.startsWith('bearer')) {
            reqToken = reqToken.split(' ')[1];
        }
        req.token = reqToken;
        const token = jwt.decode(req.token, process.env.SECRET);
        const now = new Date();
        const expire = new Date(token.payload.expires);
        if (now.getTime() >= expire.getTime()) {
            return res.status(401).json({
                data: 'Not Authorized'
            });
        }
        
        const user = await User.findOne({email: token.payload.email, jwt: reqToken});
        if (!user) {
            return res.status(401).json({
                data: 'Not Authorized'
            });    
        }
        req.user = token.payload;
        next();        
    } catch (error) {
        next(error);
    }
};