const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const flightModel = require("../models/flightModel");
const { authentication } = require("../middlewares/authentication");

const flightRouter = express.Router();

flightRouter.use(express.json());

flightRouter.get("/flights", async (req, res) => {
  try {
    let data = await flightModel.find();

    console.log(data);
    res.status(200).send({ message: "all flights shown here" });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: "Something went wrong" });
  }
});

flightRouter.get("/flights/:id", async (req, res) => {
  try {
    // finding the flight data by id
    let id = req.params.id;

    let data = await flightModel.findById(id);

    console.log(data);
    // if data is correct the send the correct status message
    console.log({ message: `you can watch your particular flight here` });
    res.status(200).send({
      message: `:${`booked this particular flight`}`,
      data,
    });
  } catch (error) {
    console.log(error.message);
    // if details are not correct send failed message
    res.status(404).send({
      message: `something went wrong`,
    });
  }
});

flightRouter.post("/flights", authentication, async (req, res) => {
  try {
    let flight = req.body;
    console.log(flight);

    // Creating a new flight ticket with the use of model schema
    let data = await flightModel.create(flight);

    // If data is correct then send the correct status message
    res.status(201).send({
      message: `New flight added successfully`,
      data: data, // Optionally, you can send back the created flight data as well
    });
  } catch (error) {
    console.error(error);
    // If details are not correct, send a failure message
    res.status(404).send({
      message: `Something went wrong while adding the flight`,
      error: error.message, // Optionally, you can send back the error message for debugging purposes
    });
  }
});

flightRouter.patch("/flights/:id", authentication, async (req, res) => {
  try {
    let id = req.params.id;
    let flight = req.body;
    console.log(id, flight);

    let data = await flightModel.findByIdAndUpdate(id, flight);

    console.log(data);
    console.log({
      message: `HERE YOU CAN UPDATE YOUR  FLIGHT`,
      data,
    });
    // if data is correct the send the correct status message
    res.status(204).send({
      message: `:${`NEW FLIGHT ADDED`}`,
      data,
    });
  } catch (error) {
    console.log(error.message);
    // if details are not correct send failed message
    res.status(404).send({
      message: `SORRY SOMETHING WENT WRONG`,
    });
  }
});

flightRouter.delete("/flights/:id", authentication, async (req, res) => {
  try {
    let id = req.params.id;

    console.log(id);

    let data = await flightModel.findByIdAndDelete(id);

    console.log(data);
    console.log({ message: ` YOUR FLIGHT DELETED SUCCESSFULLY` });

    res
      .status(204)
      .send({ message: `:${`FLIGHT DELETED SUCCESSFULLY`}`, data });
  } catch (error) {
    console.log(error.message);

    res.status(404).send({ message: `sorry something went wrong` });
  }
});

module.exports = flightRouter;
