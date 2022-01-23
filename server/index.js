import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to News Site API!");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
