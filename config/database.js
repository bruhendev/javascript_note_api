const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/javascriptNote').then(() => console.log('Connection succesful'))
  .catch((err) => console.log("Error - " + err));