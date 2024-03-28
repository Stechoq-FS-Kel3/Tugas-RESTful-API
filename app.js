const express = require('express');
const fs = require('fs');


const app = express();
let datah = JSON.parse(fs.readFileSync('./data/datah.json'));

// Definisikan rute dan aturan aplikasi Express di sini

//GET - API
app.get('/api/v1/datah', (req, res) => {
    res.status(200).json({
        status: "sucess",
        count: datah.length,
        data: {
            datah: datah
        }
    });
});

app.get('/api/v1/datah/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const selectedData = datah.find(item => item.id === id);

    if (!selectedData) {
        return res.status(404).json({
            status: "error",
            message: "Data not found"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            datah: selectedData
        }
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});