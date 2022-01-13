import express from "express";
import dialogFlowRoutes from "./routes/dialogFlowRoutes.js";
const app = express();
app.use(express.json());
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Hello There" });
});
app.use(dialogFlowRoutes);
app.listen(process.env.PORT || 5000, () => {
  console.log("started Server");
});
