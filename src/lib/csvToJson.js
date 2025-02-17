const csv = require("csvtojson");
const fs = require("fs");

const csvFilePath = "./badreq.csv";
const jsonFilePath = "../lib/notValid.json";

csv()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2));
    console.log("Conversion complete!");
  });
