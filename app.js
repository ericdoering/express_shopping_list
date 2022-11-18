const express = require("express");

const app = express();
const itemsRoutes = require("./routes/items");
const ExpressError = require("./expressError");

app.use(express.json());
app.use("/items", itemsRoutes);

app.use(function error404Handler (req, res, next){
    return new ExpressError("Error occured page not found", 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)

    return res.json({
        error: err.message,
    })
});

module.exports = app