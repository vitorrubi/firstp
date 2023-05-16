console.clear();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use(express.json());
app.use(cors());

app.use("/api/kanboom", require("./routes/kanboom"));

app.listen(port, function () {
  console.log(
    "\n----------------------------------------------------------------\nServer running on port " +
      port +
      " - NODE_ENV = " +
      process.env.NODE_ENV +
      "\n----------------------------------------------------------------\n"
  );
});
