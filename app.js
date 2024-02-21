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
    const projectId = parseInt(req.params.id - 1);
    const project = data.projects[projectId];
    // If the project is undefined:
    if (project === undefined) {
        const err = new Error("There is no project matching the id in the url.");
        err.status = 404;
        console.log(err.status, err.message);
        res.status(err.status).render("page-not-found", { err });
    } else {
        res.render("project", { project });
    }
});

/******************
 * ERROR HANDLING *
 *****************/
// To catch undefined or non-existent route requests:
app.use((req, res, next) => {
    console.log("Requesting an undefined route...");

    // Set the response status to 404 and render the 'page-not-found' page
    // res.status(404).render("page-not-found");
    const err = new Error("The requested page was not found.");
    err.status = 404;
    console.log(err.status, err.message);
    next(err);
});

app.use((err, req, res, next) => {
    if (err) {
        console.log("Global error handler called:", err.status);
    }

    if (err.status === 404) {
        res.status(404).render("page-not-found", { err });
    } else {
        err.message = err.message || "Unfortunately something went wrong...";
        res.status((err.status = err.status || 500)).render("error", { err });
    }
});

app.listen(3000, () => {
    console.log("Server listening on port 3000.");
});
