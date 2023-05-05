console.clear();
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

app.use(express.json());
app.use(cors());

app.use("/api/beats", require("./routes/users"));

app.listen(port, (): void => {
  console.log(
    `\n----------------------------------------------------------------\nServer running on port ${port} - NODE_ENV = ${process.env.NODE_ENV}\n----------------------------------------------------------------\n`
  );
});
