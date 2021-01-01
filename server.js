const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
//const { Exercise, Workout } = require("./models");
const router = require("express").Router();
//const {seeder} = require("./seeders/seed")

const db = require("./models");
//imports models

const app = express();
app.use(logger("dev"));

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public")); /*might change "public"*/

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//const server = require("./middle.js");
//--------------ROUTES---------------------------------


//-----html routes-------------------------------------
require("./routes/html")(app);


//-----api routes--------------------------------------

//Retrieve & Populate the database
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Create new entry in workout database
app.post("/api/workouts", ( {body}, res) => {
  db.Workout.create({body})
  .then(dbWorkout => {
      console.log(dbWorkout);
  })
  .catch(err => {
      res.json(err)
  });
});

app.put("/api/workouts", (req, res) => {
  console.log(req.body);
  db.Workout.insertMany(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

//Update & Add a workout
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne(
    { _id: req.params.id },
    { $push: { exercise: req.body } },
    { new: true }
  )
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.json(err);
  })
})

//Dashboard to display all data from workout database
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
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
});

//---NOTES FOR IMPROVEMENT------------------------------
/*

--consider making separate route pages
--do i need to make a Date constructor??
--add custom methods in paths??

*/
