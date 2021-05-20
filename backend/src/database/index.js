'use strict';
// Node imports
const mongoose = require('mongoose');
// Own imports


const database = {
    /**
     */
    connect: async (connection) => {
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        await mongoose.connect(connection, { 
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });
        return mongoose.connection;
    },
    /**
     */
    disconnect: () => {
        mongoose.connection.close();
    }
}

module.exports = database;
