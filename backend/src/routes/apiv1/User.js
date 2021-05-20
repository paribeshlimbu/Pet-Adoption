'use strict';
// Node imports
const express = require('express');
const { body } = require('express-validator');
// Own imports
const { MulterMiddleware } = require('../../middlewares')
const { AuthMiddleware } = require('../../middlewares');
const { UserCtrl } = require('../../controllers');

const multerAdverts = MulterMiddleware.uploadAvatars;

// Exports arrow function with the USER routes
module.exports = () => {

    const router = express.Router();

    // New user account
    router.post(
        '/',
        [   body('login').isLength({min:1, max: 15}).withMessage('lo'),
            body('name').isLength({min:1, max: 30}).withMessage('ds'),
            body('email').isLength({min:3, max: 150}).withMessage('des'),
            body('password').isLength({min:8, max: 16}).withMessage('des'),
        ], 
        UserCtrl.create
    );

    router.put(
        '/',
        AuthMiddleware,
        multerAdverts, 
        UserCtrl.edit
    );

    // Delete user data
    router.delete(
        '/:id',
        AuthMiddleware,
        UserCtrl.delete
    );

    // Add/Remove advert from user favorites
    router.put(
        '/favorites/:slug', 
        AuthMiddleware,
        UserCtrl.setFavorite);

    // Get user's favorites
    router.get(
        '/favorites/', 
        AuthMiddleware,
        UserCtrl.getFavorites);

    // Return routes object
    return router;
}