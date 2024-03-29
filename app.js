
const express = require("express");
const {
  getData,
  createData,
  updateData,
  getDataById,
  deletedData,
} = require("./controllers/dataController");

const app = express();

// Definisikan rute dan aturan aplikasi Express di sini

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const dataRouter = express.Router();
dataRouter.route("/").get(getData).post(createData);
dataRouter.route("/:id").get(getDataById).put(updateData).delete(deletedData);

app.use("/api/v1/users", dataRouter);

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
