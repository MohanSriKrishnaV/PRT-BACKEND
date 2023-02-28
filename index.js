const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb+srv://contact:contact@cluster0.0txzo0o.mongodb.net/?retryWrites=true&w=majority"
const cors = require("cors");
app.use(cors());
mongoose.connect(url)
    .then(() => console.log('Connected!'));
const bodyparser = require("body-parser");
app.use(bodyparser.json());
const userroute = require("./routes/route");
app.use("/v1", userroute)




app.listen(3000, () => {
    console.log("listening on port 3000")
})