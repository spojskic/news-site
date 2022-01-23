import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 8081;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to News Site API!");
});

app.use("/news", newsRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
