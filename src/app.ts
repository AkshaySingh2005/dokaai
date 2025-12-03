import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Notification Preference Service is running");
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(400).json({ message: err.message || "Something went wrong" });
});

export default app;
