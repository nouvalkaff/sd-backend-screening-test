const express = require("express");

const router = express.Router();

const {
  createCast,
  getAllCast,
  getOneCast,
  updateCast,
  deleteCast,
} = require("../controllers/cast-cont");

router.post("/cast/crt", createCast);

router.get("/cast/all", getAllCast);

router.get("/cast/:id", getOneCast);

router.put("/cast/upd/:id", updateCast);

router.delete("/cast/del/:id", deleteCast);

module.exports = router;
