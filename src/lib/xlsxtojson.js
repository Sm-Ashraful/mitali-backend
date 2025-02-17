const fs = require("fs");
const XLSX = require("xlsx");

// Replace with the actual Excel file path
const excelFilePath = "./buyerZip.xlsx";

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);

// Get the first sheet name and its data
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON format
const rawData = XLSX.utils.sheet_to_json(sheet);

// Process the data into a structured format
const structuredData = rawData.map(row => ({
  zip: row["Zip"],
  centerName: row["Center Name"],
  state: row["State"]
}));

// Define the output JSON file path
const jsonFilePath = "./buyerZip.json";

// Save the structured JSON data
fs.writeFileSync(jsonFilePath, JSON.stringify(structuredData, null, 2));

console.log(`Conversion complete. JSON data saved to ${jsonFilePath}`);
