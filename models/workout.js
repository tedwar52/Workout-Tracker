const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercise: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ]
});

//WorkoutSchema.methods.newWorkout = function() {
    //create a new collection
//}

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;


//feel free to make custom methods
