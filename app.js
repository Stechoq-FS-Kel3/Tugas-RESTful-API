const express = require("express");
const fs = require("fs");

const app = express();
let datah = JSON.parse(fs.readFileSync("./data/datah.json"));

// Definisikan rute dan aturan aplikasi Express di sini

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//GET - API
app.get('/api/v1/datah', (req, res) => {
  res.status(200).json({
    status: "sucess",
    count: datah.length,
    data: {
      datah: datah,
    },
  });
});

//POST - API
app.post('/api/v1/datah', (req,res)=> {
  const newId = datah[datah.length - 1].id + 1;
  const { nama, umur, alamat } = req.body;

  const newdata = { id: newId, nama, umur, alamat };
  datah.push(newdata);

  fs.writeFile('./data/datah.json', JSON.stringify(datah), (err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Server error",
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        datah: newdata
      }
    });
  });
});


app.get("/api/v1/datah/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const selectedData = datah.find((item) => item.id === id);

  if (!selectedData) {
    return res.status(404).json({
      status: "error",
      message: "Data not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      datah: selectedData,
    },
  });
});
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
