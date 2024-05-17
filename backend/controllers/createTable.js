const asyncHandler = require("express-async-handler");
const short = require("short-uuid");
const {pool} = require("../connection");

const createTable = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { entityList, tableName } = req.body;
  try {
    const command = `CREATE TABLE ${tableName} (id STRING , ${entityList
      .map((item) => `${item.entity} ${item.type}`)
      .join(", ")})`;

    const result = await client.query(command);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);
});

const showTable = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  try {
    const command = `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
    const result = await client.query(command);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);
});

const tableContent = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { tableName } = req.body;
  try {
    const command = `SELECT column_name, data_type FROM information_schema.columns WHERE 
    table_name = '${tableName}'`;

    const result = await client.query(command);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);
});

const addRow = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { newRow, tableName } = req.body;

  try {
    const fields = newRow
      .slice(1)
      .map((item) => `${item.colName} `)
      .join(", ");
    const values = newRow
      .slice(1)
      .map((item) => `'${item.value}' `)
      .join(", ");

    const command = `INSERT INTO ${tableName} (id , ${fields}) VALUES ('${short.generate()}' , ${values})`;
    const result = await client.query(command);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);
});

module.exports = { createTable, showTable, tableContent, addRow };
