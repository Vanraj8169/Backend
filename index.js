require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const server = express();
server.use(cors());
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
console.log("env", process.env.DB_PASSWORD);
mongoose.set("strictQuery", false);
//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGO_URL
  );
  console.log("database connected");
}
//Schema

//bodyParser
server.use(express.json());
server.use(morgan("default"));
server.use(express.static(process.env.PUBLIC_DIR));
server.use("/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server started");
});
