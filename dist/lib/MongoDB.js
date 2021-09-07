"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
async function initDBConnection() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://femave:marcvf21@cluster0.ldbhi.mongodb.net/qafila-test?retryWrites=true&w=majority";
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    try {
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("MongoDB database connection established successfully");
        });
    }
    catch (e) {
        console.error(e);
    }
}
exports.default = initDBConnection;
//# sourceMappingURL=MongoDB.js.map