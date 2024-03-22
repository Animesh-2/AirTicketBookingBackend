const express = require("express");
const connection = require("./config/db");
const userRouter = require("./router/userRouter");

const app = express();

app.get("/", async (req, res) => {
  try {
    res.send("AIR TICKET BOOKING ENDPOINT HOME ROUTER");
  } catch (error) {
    console.log(error);
  }
});

app.use("/", userRouter);

const PORT = 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`app listening on port ${PORT}`);
  } catch (error) {
    console.log({ error: `error` });
  }
});
