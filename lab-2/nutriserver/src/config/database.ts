import mongoose from "mongoose";
import config from './config'
(async ()=>{
    mongoose.connect(config.DB.URI);
    const connection = mongoose.connection;
    connection.once('open', ()=>{
        console.log(`establishing connection with  URL ${config.DB.URI}`);
        console.log(`DB connection established, to ${connection.db.databaseName}`);
    });
    connection.on('error',(error)=>{
        console.error(error);
        process.exit(0);
    })
    
})()