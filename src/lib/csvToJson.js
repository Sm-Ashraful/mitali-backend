const csv = require("csvtojson");
const fs = require("fs");

const csvFilePath = "../lib/OS PX Zips 11.2.23 (2).csv";
const jsonFilePath = "../lib/zipCode.json";

csv()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2));
    console.log("Conversion complete!");
  });
