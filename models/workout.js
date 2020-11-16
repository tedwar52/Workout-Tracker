const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: String,
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number
        }
    ]
});

//WorkoutSchema.methods.newWorkout = function() {
    //create a new collection
//}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;


//feel free to make custom methods
