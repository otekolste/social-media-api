const { connect, connection } = require('mongoose');
// Connect to MongoDB!
connect('mongodb://127.0.0.1:27017/socialNetwork');

module.exports = connection;
