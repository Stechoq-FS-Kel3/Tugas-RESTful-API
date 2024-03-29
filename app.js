const { getData } = require("./controllers/dataController");
const express = require("express");
const fs = require("fs");
const { createData, updateData } = require("./controllers/dataController");

const app = express();

// Definisikan rute dan aturan aplikasi Express di sini

app.use(express.json());
const dataRouter = express.Router();
dataRouter.route("/").get(getData).post(createData);
dataRouter.route("/:id").put(updateData);

app.use("/api/v1/users", dataRouter);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
