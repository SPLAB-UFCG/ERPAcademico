const fs = require('fs');
const pdfParse = require('pdf-parse');

const pdfFile = fs.readFileSync('../assets/pdfFiles/turmas2.pdf')

/**
 * Devido ao asincronísmo do código, optei por realizar o parse do PDF e gerar um arquivo JS,
 * contendo apenas um array com todo o conteúdo de strings do PDF, para utiliza-lo nos testes.
 */

pdfParse(pdfFile).then(data => {
    const textPDF = data.text;

    let arrayPDF = textPDF.split("\n")

    fs.writeFile(`./utils/arrayPDF.js`, `const arrayPDF = ${JSON.stringify(arrayPDF)} \n module.exports = arrayPDF`, (err) => {
        if(err) {
            console.log(err)
        }
    })
})