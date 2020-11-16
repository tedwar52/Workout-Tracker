const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { Exercise, Workout } = require("./models");
const router = require("express").Router();

const db = require("./models");
//imports models

const app = express();
//app.use(logger("dev"));

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); /*might change "public"*/

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true});

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


app.post("/api/add", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});
app.put("/api/add", ({ body }, res) => {
    db.Workout.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercises: body } }, {new: true }))
    .then(dbWorkout => {
    res.json(dbWorkout);
    })
    .catch(err => {
    res.json(err);
    });
});
app.get("/api/add", (req, res) => {
    db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

/* "new workout" */

/*
router.post("/api/add", ({ body }, res) => {
    Exercise.create(body)
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});
*/
//consider moving to own route page... create a new workout when visiting the page, for everything else to be posted into when complete

/*db.Workout.create({ day: Date.now() })
    .then(dbWorkout => {
        console.log(dbWorkout);
    })
    .catch(({message}) => {
        console.log(message);
    });
*/

app.post("/api/add", ({ body }, res) => {
    //when you click "add exercise", this should fire! add exercise to new workout collection
    db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, {new: true }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
    //thinking this may need to be indexed first
});

app.post("/api/complete", ({ body }, res) => {
    //needs to add all saved exercises into a new workout
});


app.get("/stats", (req, res) => {
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