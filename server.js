const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express;

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//--------------Routes----------------------------------

app.read("/", function(req, res) {

});
