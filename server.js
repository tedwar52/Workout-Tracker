const express = require("express");
const mongoose = require("mongoose");
/*
const path = require("path")
const router = require("express").Router();

const databaseUrl = "workout";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);
*/
const workoutSeed = require("./seeders/workoutseed");

const app = express();
const db = require("./models");

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

//-------------------ROUTES-----------------------------

const seed = express.Router();
require("./routes/seed")(seed);

require("./routes/html")(app);
require("./routes/api")(app);


//------------------Listener-----------------------------
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
})

//INPUT FROM ROUTE ISN'T SAVING PROPERLY... exercise comes up empty
