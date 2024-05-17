const asyncHandler = require("express-async-handler");
const pool = require("..");

const getTable = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { tableName } = req.body;
  try {
    const command = `SELECT * FROM ${tableName}`;
    const result = await client.query(command);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);
});

const updateTable = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { tableName, newRow } = req.body;

  try {
    const fields = newRow
    .slice(1)
    .map((item) => `${item.colName} = '${item.value}' `)
    .join(", ");
  const command = `UPDATE ${tableName} SET ${fields} WHERE id = '${newRow[0].value}'`;
  const result = await client.query(command)
  return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);

});

const deleteTable = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { tableName } = req.body;
  try {
    const command = `DROP TABLE IF EXISTS ${tableName}`;
  const result = await client.query(command)
   res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
  return client.release(true);

});

const deleteRow = asyncHandler(async (req, res) => {
  const client = await pool.connect();
  const { tableName, rowId } = req.body;
 try {
  const command = `DELETE FROM ${tableName} where id='${rowId}'`;
  const result = await client.query(command)
  res.status(200).json(result);
 } catch (error) {
   res.status(500).json({ message: error });
 }
 return client.release(true);
});

module.exports = { getTable, updateTable, deleteTable, deleteRow };
