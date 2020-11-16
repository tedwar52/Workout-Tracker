const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const db = require("./models");
//imports models

const app = express();
//app.use(logger("dev"));

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); /*might change "public"*/

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true});

//--------------ROUTES----------------------------------

//-----html routes-----------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});

//-----api routes------------
/* "new workout" */
app.post("/api/exercise", ({body}, res) => {
    db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true}))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
});

/* "continue workout" */
app.post("/exercise?", ({body}, res) => {
    //THIS NEEDS TO ACCESS OLD INFO
    //INDEXDB?
});


//--------------Listener--------------------------------
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
})


//---NOTES FOR IMPROVEMENT------------------------------
/*

-Add on click events on buttons in html to link to correct pages
--do i need to make a Date constructor??
--add custom methods in paths??

*/