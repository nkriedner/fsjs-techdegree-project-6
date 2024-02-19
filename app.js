const express = require("express");
const data = require("./data.json");

const app = express();

// General settings & Middleware
app.set("view engine", "pug");
app.use("/static", express.static("public"));

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

app.get("/projects/:id", (req, res) => {
    console.log("GET request to /projects/:id route...");
    console.log(typeof parseInt(req.params.id));
    const projectId = parseInt(req.params.id - 1);
    const project = data.projects[projectId];
    console.log(project);
    res.render("project", { project });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
