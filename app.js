const fs = require('fs');
const csv = require('csv-parser');

// Function to delete a file if it exists
function deleteFileIfExists(filename) {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
    console.log(`${filename} has been deleted`);
  } else {
    console.log(`${filename} does not exist, so not deleted`);
  }
}

// Delete 'canada.txt' and 'usa.txt' if they exist
deleteFileIfExists('canada.txt');
deleteFileIfExists('usa.txt');

let canadaData = [];
let usaData = [];

// Function to convert data to CSV format
function dataToCsvString(data) {
  let csvString = 'country,year,population\n';
  data.forEach(row => {
    csvString += `${row.country},${row.year},${row.population}\n`;
  });
  return csvString;
}

// Reading and processing the CSV file
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.country === 'Canada') {
      canadaData.push(row);
    } else if (row.country === 'United States') {
      usaData.push(row);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    // Writing data to 'canada.txt'
    if (canadaData.length > 0) {
      const canadaCsvString = dataToCsvString(canadaData);
      fs.writeFileSync('canada.txt', canadaCsvString);
      console.log('Data written to canada.txt successfully.');
    }

    // Writing data to 'usa.txt'
    if (usaData.length > 0) {
      const usaCsvString = dataToCsvString(usaData);
      fs.writeFileSync('usa.txt', usaCsvString);
      console.log('Data written to usa.txt successfully.');
    }
  });
