// IMPORT MODULES & DATA
const express = require("express");
const data = require("./data.json");

// CREATE EXPRESS APP
const app = express();

// GENERAL SETTINGS & MIDDLEWARE
app.set("view engine", "pug");
app.use("/static", express.static("public"));

// ROUTE HANDLERS
app.get("/", (req, res) => {
    const projects = data.projects;
    res.render("index", { projects });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id - 1);
    const project = data.projects[projectId];

    // If the project for the id is undefined:
    if (project === undefined) {
        const err = new Error("there is no project matching the id in the url.");
        err.status = 404;
        console.log(`Error: ${err.message} (${err.status})`);
        res.status(err.status).render("page-not-found", { err });
    } else {
        res.render("project", { project });
    }
});

// ERROR HANDLING

// To catch undefined or non-existent route requests:
app.use((req, res, next) => {
    const err = new Error("the requested page was not found.");
    err.status = 404;
    console.log(`Error: ${err.message} (${err.status})`);
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).render("page-not-found", { err });
    } else {
        err.message = err.message || "unfortunately something went wrong...";
        res.status((err.status = err.status || 500)).render("error", { err });
    }
});

// START APP ON PORT 3000 (if no environment variable is set)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server listening on port 3000.");
});
