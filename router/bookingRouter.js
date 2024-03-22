const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const bookModel = require("../models/bookModel");
const { authentication } = require("../middlewares/authentication");

const app = express();

const bookingRouter = express.Router();
bookingRouter.use(express.json());


bookingRouter.get("/dashboard", authentication, async (req, res) => {
  try {
    let data = await bookModel.find();

    console.log(data);

    console.log({ message: `watch booked flight` });
    res.status(200).send({ message: `:${`watching booked flight`}`, data });
  } catch (error) {
    console.log(error.message);

    res.status(404).send({ message: `sorry something went wrong` });
  }
});

bookingRouter.get("/bookings/:id", authentication, async (req, res) => {
  try {
    let id = req.params.id;

    let data = await bookModel.findById(id);

    console.log(data);

    console.log({ message: `get your specific booking by id` });
    res
      .status(200)
      .send({ message: `:${`see particular booked flight `}`, data });
  } catch (error) {
    console.log(error.message);

    res.status(404).send({ message: `something went wrong` });
  }
});

bookingRouter.post("/booking", authentication, async (req, res) => {
  // taking the booking details from booking schema from posting in req.body
  let booking = {
    user: req.body.user_Id,
    flight: req.body.flight,
  };

  console.log(booking);

  try {
    let data = new bookModel(booking);

    await data.save();
    console.log(data);
    console.log({ message: `HERE YOU ADD YOU NEW booking ` });

    res.status(201).send({
      message: `:${`THANKS FOR ADDING NEW booking `}`,
    });
  } catch (error) {
    console.log(error.message);

    res.status(404).send({
      message: `something went wrong`,
    });
  }
});



bookingRouter.patch("/bookings/:id", authentication, async (req, res) => {
  try {
    // taking the booking details from booking schema for updating in req.body
    let id = req.params.id;
    let booking = req.body;
    console.log(id, booking);
    //  finding by its id  and upadting the booking details
    let data = await bookModel.findByIdAndUpdate(id, booking);

    console.log(data);
    console.log({
      message: `HERE YOU CAN UPDATE YOUR  booking WE YOU BOOK WRONG THANKS AND HAPPY JOURNEY ✈️`,
      data,
    });
    // if data is correct the send the correct status message
    res.status(204).send({
      message: `:${`THANKS FOR ADDING NEW booking PLEASE VISIT AGAIN  ✈️ `}`,
      data,
    });
  } catch (error) {
    console.log(error.message);
    // if details are not correct send failed message
    res.status(404).send({
      message: `SORRY SOMETHING ERROR IN UDATING NOW ☹️ YOUR booking LOOK INTO IT`,
    });
  }
});


module.exports = bookingRouter;
