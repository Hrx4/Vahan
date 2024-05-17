const asyncHandler = require("express-async-handler");
const client = require("../connection");

const getTable = asyncHandler(async (req, res) => {
  await client.connect();
  const { tableName } = req.body;
  const command = `SELECT * FROM ${tableName}`;

  client.query(command, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Error creating table");
    }
    console.log("Table created successfully" + result.rows);
    //   client.end()
    return res.status(200).json(result);
  });
});

const updateTable = asyncHandler(async (req, res) => {
  await client.connect();
  const { tableName, newRow } = req.body;

  const fields = newRow
    .slice(1)
    .map((item) => `${item.colName} = '${item.value}' `)
    .join(", ");
  // const values = newRow.slice(1,0).map((item)=> `'${item.value}' ` ).join(', ')
  console.log("====================================");
  console.log(fields);
  console.log("====================================");
  const command = `UPDATE ${tableName} SET ${fields} WHERE id = '${newRow[0].value}'`;
  client.query(command, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Error creating table");
    }
    console.log("Table created successfully" + result.rows);
    //   client.end()
    return res.status(200).json(result);
  });
});

const deleteTable = asyncHandler(async (req, res) => {
  await client.connect();
  const { tableName } = req.body;
  const command = `DROP TABLE IF EXISTS ${tableName}`;

  client.query(command, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Error creating table");
    }
    console.log("Table created successfully" + result.rows);
    //   client.end()
    return res.status(200).json(result);
  });
});

const deleteRow = asyncHandler(async (req, res) => {
  await client.connect();
  const { tableName, rowId } = req.body;
  const command = `DELETE FROM ${tableName} where id='${rowId}'`;

  client.query(command, (err, result) => {
    if (err) {
      console.error("Error creating table:", err);
      return res.status(500).send("Error creating table");
    }
    console.log("Table created successfully" + result.rows);
    //   client.end()
    return res.status(200).json(result);
  });
});

module.exports = { getTable, updateTable, deleteTable , deleteRow};
