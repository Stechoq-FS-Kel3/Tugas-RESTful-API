const fs = require("fs");
const FILE_PATH = `${__dirname}/../data/data.json`;
const data = require(FILE_PATH);

const getData = function (req, res) {
  res.status(200).json({
    status: "success",
    results: data.length,
    data: data,
  });
};
const createData = function (req, res) {
  const newId = data[data.length - 1].id + 1;

  const newdata = Object.assign({ id: newId }, req.body);
  data.push(newdata);

  fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
    if (err) console.log(err);
    res.status(201).json({
      status: "success",
      data: {
        data: newdata,
      },
    });
  });
};

const updateData = function (req, res) {
  const id = parseInt(req.params.id);
  const selectedDataIndex = data.findIndex((item) => item.id === id);

  if (selectedDataIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Data not found",
    });
  }

  // Ambil data baru dari body request
  const newData = req.body;

  // Perbarui data pada index yang sesuai
  data[selectedDataIndex] = { ...data[selectedDataIndex], ...newData };

  fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
    if (err) throw err;
    res.status(200).json({
      status: "success",
      data: updatedContact,
    });
  });

  res.json({
    status: "success",
    message: "Data updated successfully",
    updatedData: data[selectedDataIndex],
  });
};

module.exports = {
  getData,
  createData,
  updateData,
};