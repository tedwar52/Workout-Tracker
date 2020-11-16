//-----------imports---------------------------------
const mongoose = require("mongoose");
const db = require("../models");
const {workoutSeed} = require("./seed");

//-----------mongoose connection---------------------

mongoose.connect(process.env.ATLAS_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

//---------seed database-----------------------------

const seeder = () => {
    return new Promise((resolve, reject) => {
        db.Workout.deleteMany({})
            .then((result) => {
                console.log(`${result.deletedCount} exercises deleted!`)
            })
            .then(() => db.Workout.collection.insertMany(workoutSeed))
            .then(data => {
                console.log(g(`${data.result.n} exercises inserted!`));
                resolve(data)
            })
            .catch(err => {
                reject(err)
            });
    })
}

module.exports = { seeder }