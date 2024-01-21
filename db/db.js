const mongoose = require('mongoose');
const mongourl = process.env.MONGODB_URL || "mongodb+srv://akhilmathew990:j9vRSXdWA2s1196s@details.x0h5ao5.mongodb.net/?retryWrites=true&w=majority" ;
const dbname = process.env.DB_NAME || "Databases";


mongoose.connect(mongourl, { dbName: dbname })
.then(()=>{
    console.log(`Connected to MongoDB ${mongourl}`)
})
.catch(err => console.log(err))

//akhilmathew990
//j9vRSXdWA2s1196s
//mongodb+srv://akhilmathew990:j9vRSXdWA2s1196s@details.x0h5ao5.mongodb.net/?retryWrites=true&w=majority
