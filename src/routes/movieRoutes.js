const express = require("express");

const router = express.Router();

const {
  createMovie,
  getAllMV,
  getOneMV,
  updateMV,
  deleteMV,
} = require("../controllers/movie-cont");

router.post("/mv/crt", createMovie);

router.get("/mv/all", getAllMV);

router.get("/mv/:id", getOneMV);

router.put("/mv/upd/:id", updateMV);

router.delete("/mv/del/:id", deleteMV);

module.exports = router;
