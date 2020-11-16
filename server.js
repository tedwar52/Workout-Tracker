const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
//const { Exercise, Workout } = require("./models");
const router = require("express").Router();

const db = require("./models");
//imports models

const app = express();
//app.use(logger("dev"));

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); /*might change "public"*/

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true});

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

//New Workout
    //create new collection in workout db
    app.post("/api/exercise", ({body}, res) => {
        db.Workout.create({ day: Date.now })
        .then(dbWorkout => {
            console.log(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        });
    });
    //update existing collection in workoutdb (add an exercise)
    app.put("/api/exercise", ({body}, res) => {
        db.Exercise.create(body)
        //create exercise based on body object
        .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: {exercises: _id } }, { new: true }))
        //insert into exercise schema
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
    });
    //populate the db
    app.get("/api/exercise", (req, res) => {
        db.Workout.find({})
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

//Update Old Workout   
    app.post("/api/exercise?", ({ body }, res) => {
        //needs to add all saved exercises into a new workout
    });
    //should probably open a request with an existing db
    //transactions/update on that
    //indexedDB

//Dashboard
    app.get("/api/stats", (req, res) => {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });


//--------------Listener--------------------------------

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}!`);
})


//---NOTES FOR IMPROVEMENT------------------------------
/*

--consider making separate route pages
--do i need to make a Date constructor??
--add custom methods in paths??

*/