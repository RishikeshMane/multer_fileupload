const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const File = require("./db_con");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/_makapi_", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});
const con = mongoose.connection;
con.on("open", () => {
  console.log("database connected");
});

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

const port = 3000;

//saving with extension
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/files");
  },

  filename: function (req, file, callback) {
    var fname =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    callback(null, fname);
  },
});

var upload = multer({ storage: storage, dest: "public/files" });

app.get("/", (req, res) => {
  res.send("get request");
});

app.post("/uploadFile", upload.single("myFile"), (req, res) => {
  // Stuff to be added later

  console.log(req.file);
  res.send("done");
});

app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});
