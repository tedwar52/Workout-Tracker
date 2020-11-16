const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: Schema.Types.Array,
            ref: "Exercise"
        }
    ]
});

WorkoutSchema.methods.newWorkout = function() {
    this.exercises
}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;


//feel free to make custom methods
