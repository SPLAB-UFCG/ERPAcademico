const fs = require('fs');

const pdfParse = require('pdf-parse');
const { getSubject, getTeachers, getSchedule } = require('./utils/filterPdf');
const pdfFile = fs.readFileSync('./turmas.pdf')


pdfParse(pdfFile).then(data => {
    const textPdf = data.text;
    const pdfString = JSON.stringify(textPdf);

    let arrayPDF = textPdf.split("\n");

    const arrayDisciplinas = getSubject(arrayPDF);

    const arrayProfessores = getTeachers(arrayPDF);

    const arraySchedule = getSchedule(arrayPDF);

    let classRelation = [];

    if (arrayDisciplinas.length === arrayProfessores.length && arrayDisciplinas.length === arraySchedule.length) {
        for(let i = 0; i < arrayDisciplinas.length; i++) {
            classRelation.push([arrayDisciplinas[i], arrayProfessores[i], arraySchedule[i]])
        }
    }

    console.log(classRelation);
})
