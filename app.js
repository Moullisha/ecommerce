const express = require("express"); //importing expree
const mongoose = require("mongoose"); // importing mongoose
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config(); // allows us to use .env variables here
//import routes
const userRoutes = require("./routes/user");

const app = express(); //invoking express

//db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB Connection error: ${err.message}`);
});

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json()); //to get json data from the req body
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
