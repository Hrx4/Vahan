const { Pool } = require("pg");

const client = new Pool(
    {
        connectionString : "postgresql://kamal:QjIbssNCGYAABFwF7vgzAQ@hearty-dwarf-4718.7s5.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",
    keepAlive : true,
    
    // min: 0,
    // max: 10,
    // createTimeoutMillis: 8000,
    // acquireTimeoutMillis: 8000,
    // idleTimeoutMillis: 8000,
    // reapIntervalMillis: 1000,
    // createRetryIntervalMillis: 100,
    }
);

client.on("connect" , ()=>{
    console.log('====================================');
    console.log("Db Connected");
    console.log('====================================');
})

client.on("end" , ()=>{
    console.log('====================================');
    console.log("Db ended");
    console.log('====================================');
})


module.exports = client
