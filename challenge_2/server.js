const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controller.js");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public/")));

app.get("/api", controller.get);

app.listen(port, () => console.log(`listening on port ${port}!`));
