const fs = require("fs");
const XLSX = require("xlsx");

// Replace 'phone.xlsx' with the path to your Excel file
const excelFilePath = "./OSH_SuppressionList.xlsx 2024.xlsx";

// Read the Excel file
const workbook = XLSX.readFile(excelFilePath);

// Assuming the first sheet is the one you want to convert
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet data to JSON
const jsonData = XLSX.utils.sheet_to_json(sheet, { header: "phone" });

// Replace 'phone.json' with the desired JSON file name
const jsonFilePath = "./phone.json";

// Write JSON data to a file
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

console.log(`Conversion complete. JSON data saved to ${jsonFilePath}`);
