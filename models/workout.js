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
            distance: { type: Number, allowNull: true },
            duration: { type: Number, allowNull: true },
            weight: { type: Number, allowNull: true },
            reps: { type: Number, allowNull: true },
            sets: { type: Number, allowNull: true },
            }
    ]
});

//WorkoutSchema.methods.newWorkout = function() {
    //create a new collection
//}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;


//feel free to make custom methods
