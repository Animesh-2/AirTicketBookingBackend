const express = require("express");
const connection = require("./config/db");
const userRouter = require("./router/userRouter");
const authentication = require("./middlewares/authentication");
const flightRouter = require("./router/flightRouter");
const bookingRouter = require("./router/bookingRouter");

const app = express();

app.use("/", userRouter);

app.get("/", async (req, res) => {
  try {
    res.send("AIR TICKET BOOKING ENDPOINT HOME ROUTER");
  } catch (error) {
    console.log(error);
  }
});

// app.use(authentication);
app.use("/", flightRouter);
app.use("/", bookingRouter);
app.use(express.json());

const PORT = 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`app listening on port ${PORT}`);
  } catch (error) {
    console.log({ error: `error` });
  }
});
