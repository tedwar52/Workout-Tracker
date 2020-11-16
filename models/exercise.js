const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SCHEMA -- defines the inputs necessary where people will enter in new exercises
//type, name, duration, weight, reps, sets
const exerciseSchema = new Schema(
    {
        exercise: [
            type: String,
            name: String,

        ]
    }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

/* create custom methods to update obj? */
/* make a second model as they will need to be combined most likely */

//TWO SCHEMAS: ONE IS EXERCISE OBJ ONLY (TYPE, NAME, DURATION, WEIGHT, REPS, SETS)... THE OTHER IS WORKOUT (DAY, EXERCISES[linked to exercise schema])