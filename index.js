const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/config");
const app = express();
const port = process.env.PORT || 4001;
app.use(bodyParser.json());
connectDB();
app.use(cors("*"));
app.use("/user", require("./router/user"));
app.get("/", (req, res) => {
  res.send("Welcome Home!");
});
app.listen(port, () => {
  console.log("listening on port=", port);
});
