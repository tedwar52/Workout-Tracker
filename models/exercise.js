const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//SCHEMA -- defines the inputs necessary where people will enter in new exercises
//type, name, duration, weight, reps, sets
const exerciseSchema = new Schema(
        {
        type: { type: String, required: false },
        name: { type: String, required: false },
        distance: { type: Number, required: false },
        duration: { type: Number, required: false },
        weight: { type: Number, required: false },
        reps: { type: Number, required: false },
        sets: { type: Number, required: false },
        }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

/* create custom methods to update obj? */
/* make a second model as they will need to be combined most likely */

//TWO SCHEMAS: ONE IS EXERCISE OBJ ONLY (TYPE, NAME, DURATION, WEIGHT, REPS, SETS)... THE OTHER IS WORKOUT (DAY, EXERCISES[linked to exercise schema])