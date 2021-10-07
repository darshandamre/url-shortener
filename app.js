import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";

import routes from "./routes.js";

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

// Routes
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api", routes);

// PORT
const port = process.env.PORT || 8000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
