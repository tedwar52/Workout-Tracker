const express = require("express");
const app = express();
const path = require("path");

module.exports = function (app) {
    //New Workout
    //create new collection in workout db
    app.post("/api/workouts", ({body}, res) => {
        db.Workout.create()
        .then(dbWorkout => {
            console.log(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        });
    });
    //update existing collection in workoutdb (add an exercise)
    app.put("/api/workouts/:id", ({body}, res) => {
        db.Workout.create(body)
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
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .populate("exercises")
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

}

