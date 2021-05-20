'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* Chat model in database
*/
const ChatSchema = new Schema(
    {  
        advert: { type: Schema.Types.ObjectId, ref: 'Advert', required: true},
        // Users attached to the chat
        users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
        // Messages
        messages: [{
            // Message date
            date: { type: Schema.Types.Date, required: true, default: Date.now},
            // User
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            // Message text
            text: { type: Schema.Types.String, required: true}
        }]
    },
    {
        timestamps: true,
    }    
);

/**
*/
ChatSchema.statics.deleteAll = async function() {
    return await Chat.deleteMany({});
};

/**
*/
ChatSchema.statics.insertAll = async function(chats) {
    return await Chat.insertMany(chats);
};

/**
* Insert a conversation into a chat
* @param {String} id Chat id to insert conversation to
* @param {String} user User related to this message
* @param {Chat} text String to add to conversation
*/
ChatSchema.statics.insertConversation = function(id, user, text) {
    return Chat.findById(id)
    .then (chat => {
        chat.messages.push = { user: user, text: text };
        chat.save()
        .then (result => result)
        .catch (error => error)
    })
};

// Autopopulate user after save (mongoose middleware)
ChatSchema.post('save', (doc, next) => doc
    .populate('users', '_id login name email avatar')
    .populate('advert', '_id slug name thumbnail')
    .execPopulate(()=>next()));

ChatSchema.index({ advert: 1, users: 1 }, { unique: true });

const Chat = mongoose.model('ChatSchema', ChatSchema);

module.exports = Chat;