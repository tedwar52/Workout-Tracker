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

//--------------ROUTES---------------------------------

require("./routes/html")(app);
//-----html routes-----------

/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"));
});
*/

//-----api routes------------
//require("./routes/api")(app);

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

/*
app.post("/api/exercise", ({body}, res) => {
    db.Workout.create()
    .then(dbWorkout => {
        console.log(dbWorkout);
    })
    .catch(err => {
        res.json(err)
    });
});
//update existing collection in workoutdb (add an exercise)
app.put("/api/exercise/:id", ({body}, res) => {
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
*/

/* Update Old Workout   
    
    app.route('/exercise')
        .get(function (req, res) {
        res.send('Get a random book')
        })
        .post(function (req, res) {
        res.send('Add a book')
        })
        .put(function (req, res) {
        res.send('Update the book')
        })

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
*/

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