const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createTable, showTable, tableContent, addRow } = require("./controllers/createTable");
const { getTable, updateTable, deleteTable, deleteRow } = require("./controllers/editTable");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB,
  keepAlive: true,
});

pool.on("connect", () => {
  console.log("====================================");
  console.log("Db Connected");
  console.log("====================================");
});

pool.on("release", () => {
  console.log("====================================");
  console.log("Db released");
  console.log("====================================");
});

app.listen(8080, () => {
  console.log(`Server is running on Port 8080`);
});

//  client.connect();

//  const createTableQuery = `SELECT * FROM testing`;
app.post("/", createTable);
app.get("/", showTable);
app.post("/table", tableContent);
app.post("/row", addRow);
app.post("/singletable", getTable);
app.put("/update", updateTable);
app.post("/tabledelete", deleteTable);
app.post("/rowdelete", deleteRow);

module.exports = pool




