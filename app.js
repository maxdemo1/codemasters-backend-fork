import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.js";

import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/userRouter.js";
import waterRouter from "./routes/waterRouter.js";

const DB_URI = process.env.DB_URI;
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/water", waterRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_URI)
  .then(() => {
    console.info("Database connection successfully");
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection error", error);
    process.exit(1);
  });
export default app;
