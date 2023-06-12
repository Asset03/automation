const express = require("express");
const fs = require("fs");
const path = require("path");

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, "text.json");
app.post("/api/write-file", (req, res) => {
  const data = req.body.data;
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile(filePath, jsonData, "utf8", (err) => {
    if (err) {
      console.error("ERROR:+++: ", err);
    } else {
      console.log("SUCCESSFULLY CHANGED");
    }
  });
});

app.get("/api/download", (req, res) => {
  res.download(filePath, (err) => {
    if (err) {
      console.log("ERROR downloading file: ", err);
      res.status(500).send("Error downloading file");
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
