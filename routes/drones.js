const express = require("express");
const mongoose = require("mongoose");
// require the Drone model here
const Drone = require("../models/drone");

const router = express.Router();

router.get("/", (req, res, next) => {
  Drone.find({}, (err, drones) => {
    if (err) {
      return next(err);
    }
    res.render("drones/index", {
      drones: drones
    });
  });
});

router.get("/new", (req, res, next) => {
  // Iteration #3
  res.render("drones/new");
});

router.post("/", (req, res, next) => {
  // Iteration #3
  const droneInfo = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };
  var newDrone = new Drone(droneInfo);

  newDrone.save(err => {
    if (err) {
      return next(err);
    }
    // redirect to the list of products if it saves
    return res.redirect("/drones");
  });
});

router.get("/:id", (req, res, next) => {
  // const droneId = req.query.id;
  const droneId = req.params.id;

  Drone.findById(droneId, (err, drone) => {
    if (err) {
      return next(err);
    }
    res.render("drones/drone-show", { drone: drone });
  });
});
router.get("/:id/edit", (req, res, next) => {
  const droneId = req.params.id;

  Drone.findById(droneId, (err, drone) => {
    if (err) {
      return next(err);
    }
    res.render("drones/edit", { drone: drone });
  });
});
router.post("/:id", (req, res, next) => {
  const droneId = req.params.id;

  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const update = {
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  Drone.findByIdAndUpdate(droneId, update, (err, drone) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/drones");
  });
});
router.post("/:id/delete", (req, res, next) => {
  const id = req.params.id;

  Drone.findByIdAndRemove(id, (err, drone) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/drones");
  });
});
module.exports = router;
