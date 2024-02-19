const express = require("express");
const data = require("./data.json");

const app = express();

// General settings & Middleware
app.set("view engine", "pug");
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    console.log("GET request to / route...");
    const projects = data.projects;
    res.render("index", { projects });
});

app.get("/about", (req, res) => {
    console.log("GET request to /about route...");
    res.render("about");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
