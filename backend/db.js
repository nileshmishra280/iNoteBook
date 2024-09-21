const mongoose = require('mongoose');

const mongoURI="mongodb://localhost:27017/inotebook"

const connectToMongo= async()=>{
    
 await   mongoose.connect(mongoURI).then(()=>console.log('connected to Mong successfully')).catch(err=>console.log('error connectin'));
}
module.exports = connectToMongo;

//  "start":"nodemon index.js"