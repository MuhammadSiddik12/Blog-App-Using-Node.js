var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/database';
var db = mongoose.connect(mongoDB, { useNewUrlParser: true ,useUnifiedTopology:true},(err)=>{
    if (err) throw err
    console.log('Connected')
});

module.exports = db