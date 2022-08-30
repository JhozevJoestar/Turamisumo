require("dotenv").config()
const cors = require("cors")


const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(cors())
app.use(require('morgan')('dev'));
app.use(express.json());
app.use(require('./routes/room.route'))
app.use(require('./routes/product.route'))
app.use(require("./routes/user.route.js"));
app.use(require("./routes/table.route.js"));
app.use(require("./routes/cart.route.js"));

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch((e) => console.log(e));

app.listen(process.env.PORT, () => {
  console.log(`Cервер успешно запушен http://localhost:${process.env.PORT}`);
});
