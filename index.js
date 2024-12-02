require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const carRoutes = require("./routes/route");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", carRoutes);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
