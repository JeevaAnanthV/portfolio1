const fs = require('fs');
const pdfParse = require('pdf-parse');

const dataBuffer = fs.readFileSync('JeevaAnanthV.pdf');

// Check if pdfParse is a function or has a default export
const parseFunc = typeof pdfParse === 'function' ? pdfParse : pdfParse.default;

if (typeof parseFunc !== 'function') {
    console.error('pdf-parse export is not a function:', pdfParse);
    process.exit(1);
}

parseFunc(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
