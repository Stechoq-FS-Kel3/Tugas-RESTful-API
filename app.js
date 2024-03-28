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
app.get("/api/v1/datah", (req, res) => {
  res.status(200).json({
    status: "sucess",
    count: datah.length,
    data: {
      datah: datah,
    },
  });
});

//POST - API
app.post('/Tugas-RESTful-API/datah.json', (req,res)=> {
  // console.log(req.body);
  const newId = datah[datah.length - 1].id + 1;

  const newdata = Object.assign({id:newId}, req.body)
  datah.push(newdata);

  fs.writeFile('/Tugas-RESTful-API/datah.json',JSON stringify(datah), (err) => {
    res.status(201).json({
      status: "succes",
      data: {
        datah: newdata
      }
    })
  }
  // res.send('Created');
})

app.get("/api/v1/datah/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const selectedData = datah.find((item) => item.id === id);

  if (!selectedData) {
    return res.status(404).json({
      status: "error",
      message: "Data not found",
    });
  }

  app.put("/api/v1/datah/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const selectedDataIndex = datah.findIndex((item) => item.id === id);

    if (selectedDataIndex === -1) {
      return res.status(404).json({
        status: "error",
        message: "Data not found",
      });
    }

    // Ambil data baru dari body request
    const newData = req.body;

    // Perbarui data pada index yang sesuai
    datah[selectedDataIndex] = { ...datah[selectedDataIndex], ...newData };

    res.json({
      status: "success",
      message: "Data updated successfully",
      updatedData: datah[selectedDataIndex],
    });
  });

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
