const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const freelanceroute=require('./routes/FreelancerRoute')
const cors=require('cors')
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("common"));
app.use(cors("*"));

const port = process.env.PORT || 5000;
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("db Connected successfully");
});
app.use('/freelance',freelanceroute,)

app.listen(process.env.PORT, () => {
  console.log(`port running on ${port}`);
});
