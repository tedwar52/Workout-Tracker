const express = require("express");
const path = require("path");

const app = express();
//const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const isDev = (app.get("env") === "developement");
console.log("isDev: " + isDev);

//require("./routes/html.js")(app);

const seed = express.Router();

//require("./routes/about")(about);
require("./routes/seed")(seed);
//require("./routes/header")(header);

//app.use(header);
//app.get("/about", about);
app.get("/seed", seed);

//start server
//app.listen(PORT, () => console.log(`listening on //port ${PORT}`));