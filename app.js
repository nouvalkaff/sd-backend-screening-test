const express = require("express");
const app = express();
const cors = require("cors");

// require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));

//declare variable for routes
const movieRoutes = require("./src/routes/movieRoutes"),
  castRoutes = require("./src/routes/castRoutes");

app.use("/api/campaigncom", movieRoutes, castRoutes);

app.all("/", (req, res) => {
  res.status(200).json({
    code: 200,
    statustext: "OK",
    success: true,
    message: "Welcome to Campaign.com API",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    code: 404,
    statusText: "Not Found",
    success: false,
    message: "Wrong route. Please change to the right one",
  });
});

const port = 1927;
app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
