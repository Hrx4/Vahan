const asyncHandler = require('express-async-handler')
const short = require('short-uuid');
const client = require("../connection");

const createTable = asyncHandler(async (req, res) => {
    await client.connect();
    const {entityList , tableName} = req.body
    console.log('====================================');
    console.log(entityList , tableName);
    console.log('====================================');
    const command = `CREATE TABLE ${tableName} (id STRING , ${
      entityList.map((item)=> `${item.entity} ${item.type}` ).join(', ')
  })`;
    
     client.query(command, (err, result) => {
      if (err) {
        console.error("Error creating table:", err);
        return res.status(500).send("Error creating table");
      }
      console.log("Table created successfully" + result);
      return res.status(200).json(result);
    });
  })

  const showTable = asyncHandler(async (req, res) => {
      await client.connect();
      const command = `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
      
      client.query(command, (err, result) => {
        if (err) {
          console.error("Error creating table:", err);
          return res.status(500).send("Error creating table");
        }
        console.log("Table created successfully" + result.rows);
      //   client.end()
        return res.status(200).json(result.rows)
      });
    })

  


const tableContent = asyncHandler(async (req, res) => {
    await client.connect();
    const {tableName} = req.body
    const command = `SELECT column_name, data_type FROM information_schema.columns WHERE 
    table_name = '${tableName}'`;
    
     client.query(command, (err, result) => {
      if (err) {
        console.error("Error creating table:", err);
        return res.status(500).send("Error creating table");
      }
      console.log("Table created successfully" + result);
      return res.status(200).json(result.rows);
    });
  })


  const addRow = asyncHandler(async (req, res) => {
    await client.connect();
    const {newRow , tableName} = req.body

    const fields = newRow.map((item)=> `${item.colName} ` ).join(', ')
    const values = newRow.map((item)=> `'${item.value}' ` ).join(', ')

    const command = `INSERT INTO ${tableName} (id , ${fields}) VALUES ('${short.generate()}' , ${values})`;
     client.query(command, (err, result) => {
      if (err) {
        console.error("Error creating table:", err);
        return res.status(500).send("Error creating table");
      }
      console.log("Table created successfully" + result);
      return res.status(200).json(result);
    });
  })



  module.exports = {createTable , showTable , tableContent , addRow}