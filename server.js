require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const dbConfig = config.get("Vivek.dbConfig.dbName");

mongoose.connect(dbConfig);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const XharkTankRouter = require("./routes/xharktank1");
app.use("/XharkTank", XharkTankRouter);

app.listen(3000, () => console.log("Server Started"));
