const fs = require('fs');
const pdf = require('pdf-parse');
const { extractSubjects, extractProfessors, extractSchandules, joinArrays } = require('./extractInfos');
 
let dataBuffer = fs.readFileSync('turmas_14110000_2020.0_214712160.pdf');

pdf(dataBuffer).then(function(data) {
    pdfFiltered = data.text.split('\n');

    extractSubjects(pdfFiltered);
    extractProfessors(pdfFiltered);
    extractSchandules(pdfFiltered);

    console.log(joinArrays());
});