"use strict";
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');


/**
 * User Schema in the database
 */
const UserSchema = new Schema(
    {   // Nick name
        login: { type: String, required: true, maxlength: 15, unique: true },
        // User name
        name: { type: String, required: true, maxlength: 30 },
        // User email
        email: { type: String, required: true, maxlength: 150, unique: true },
        // Encrypted password
        password: { type: String, required: true, minlength: 4 },
        // JSON Web Token to authenticate in the API
        jwt: { type: String },
        // Token used to activate a user, restart password, etc.
        token: { type: String},
        // By default a new user will be inactive
        active: { type: Boolean, default: false },
        // Foto del artículo
        avatar: { type: String, required: false },
        // Expiration time of the JWT
        expire: { type: Date, default: Date.now() + 3600000, select: false },
        // Favorite adverts
        favorites: [{ type: Schema.Types.ObjectId, ref: 'Advert' }],
    },
    {
        timestamps: true, 
    }
);

/**
* @param {User} user 
UserSchema.statics.insert = async function(user) {
    try {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.token = crypto.randomBytes(20).toString('hex');
        user.active = true;
        return await user.save();
    } catch (error) {
        console.error('Error .');
        console.error(error);
        return false;
    }
};

/**
* @param {String} id 
* @param {User} newUser 
*/
UserSchema.statics.update = async function(id, newUser) {
    try {
        let oldUser = await User.findById(id);
        if (oldUser) {
            oldUser.login = newUser.login || oldUser.login;
            oldUser.name = newUser.name || oldUser.name;
            oldUser.email = newUser.email || oldUser.email;
            oldUser.avatar = newUser.avatar || oldUser.avatar;
            return await oldUser.save();
        }
        return false;
    } catch (error) {
        console.error('Error actualizando usuario: ', error);
        return false;
    }
};

/**
* Activate the user account in case the specified token is valid
* @param {String} id  MongoDB
* @param {String} token Token 
*/
UserSchema.statics.activate = async function(id, token) {
    try {
        let user = await User.findById(id);
        if (user && user.token === token && user.expire >= Date.now()) {
            user.active = true;
            user.expire = null;
            user.token = null;
            return await user.save();
        }
        return false;
    } catch (error) {
        console.error('Error activando usuario: ', error);
        return false;
    }
};

/**
*/
UserSchema.statics.deleteAll = async function() {
    return await User.deleteMany({});
};

const User = mongoose.model('User', UserSchema);
module.exports = User;