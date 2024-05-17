const { Pool } = require("pg");
const dotenv = require('dotenv')

dotenv.config()
const pool = new Pool(
    {
        connectionString : process.env.DB_URI,
    keepAlive : true,
    
    }
);
pool.on("connect" , ()=>{
    console.log('====================================');
    console.log("Db Connected");
    console.log('====================================');
})

pool.on("release" , ()=>{
    console.log('====================================');
    console.log("Db Released");
    console.log('====================================');
})


module.exports = {pool}
