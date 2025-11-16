import express from "express";
import dotenv from "dotenv";

// .env config
dotenv.config();

const app = express();
// port config
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// this need to be at the very end of the file
app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
