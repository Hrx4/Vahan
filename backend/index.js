const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createTable, showTable, tableContent, addRow } = require("./controllers/createTable");
const { getTable, updateTable } = require("./controllers/editTable");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

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





