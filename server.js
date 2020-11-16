const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const db = require("./models");
//imports models

const app = express();
//app.use(logger("dev"))

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("index")); /*might change "index"*/

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true});

//--------------Routes----------------------------------

app.get("/", function(req, res) {
 //get home page
});



//--------------Listener--------------------------------
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
})


//---NOTES FOR IMPROVEMENT------------------------------
/*

-**Need workout db, exercise collection
-**schema will define
--add custom methods in paths??

*/