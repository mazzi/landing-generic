"use strict";

const mongoose = require('mongoose');
const Lead = require('./lead');

var username = process.env.USERNAME;
var password = process.env.PASSWORD;
var databaseName = process.env.DATABASE;
var databaseHost = process.env.HOSTNAME;

if (!username || !password || !databaseName || !databaseHost) {
    throw new Error("Missing env USERNAME or PASSWORD or DATABASE or HOSTNAME");
}

if (process.env.DEBUG_MONGOOSE) {
    mongoose.set('debug', true);
}

mongoose.connection.on("open", () => {
    return console.log("Connected to mongo.");
});

mongoose.connection.on("error", (err) => {
    console.log("Could not connect to mongo.");
    return console.log(err.message);
});

mongoose.connection.on("disconnected", (err) => {
    console.log(err.message);
    return console.log("Disconnected from mongo.");
});

mongoose.connect(
    'mongodb+srv://' + username + ':' + password + '@' + databaseHost + '/' + databaseName + '?retryWrites=true',
    {
        autoReconnect: true,
        useNewUrlParser: true,
        bufferCommands: false,
        keepAlive : true,
        keepAliveInitialDelay: 300000
    }, (err, res) => {
        if (err) {
        console.log ('ERROR connecting to database. ' + err);
        } else {
        console.log ('Succeeded connected to database');
        }
    }
);

module.exports.storeLead = (lead) => {
    const one_lead = new Lead({
        _id: new mongoose.Types.ObjectId(),
        name: lead,
        timestamp: new Date()
    });
    one_lead.save()
        .then( (result) => console.log('New Lead saved'))
        .catch( (err) => console.log(err.message));
};