  
const mongoose = require('mongoose');
//setup database connection
const Databasekey = "mongodb://ahmad_sermani:*******@********.mlab.com:51208/authbase"
mongoose.connect( Databasekey, {useNewUrlParser:true , useUnifiedTopology:true ,useFindAndModify:true});
const db = mongoose.connection;

// handle connection error 
db.on('error' , console.error.bind(console , "connection to db is failed"));
db.once('open' , console.info.bind(console , " connection is ok! "));

module.exports = mongoose;