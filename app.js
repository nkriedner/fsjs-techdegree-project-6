const express = require("express");
const data = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
