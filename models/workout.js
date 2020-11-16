const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercise: [
        {
            type: String,
            name: String,
            distance: { type: Number, required: false },
            duration: { type: Number, required: false },
            weight: { type: Number, required: false },
            reps: { type: Number, required: false },
            sets: { type: Number, required: false }
        }
    ]
});

//WorkoutSchema.methods.newWorkout = function() {
    //create a new collection
//}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;


//feel free to make custom methods
