const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    string: {
        type: String,
        trim: true,
        required: "String is Required"
    },

    number: {
        type: Number,
        unique: true,
        required: true
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;