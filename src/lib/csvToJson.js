const csv = require("csvtojson");
const fs = require("fs");

const csvFilePath = "./OSH_SuppressionList 22.csv";
const jsonFilePath = "../lib/existingInfo.json";

csv()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArrayObj, null, 2));
    console.log("Conversion complete!");
  });
