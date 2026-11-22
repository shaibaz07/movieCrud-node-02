const express = require("express");
const cors = require("cors");
const moviesRouter = require("./router/moviesRouter")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);

module.exports = app;