const fs = require('fs');
const pdfParse = require('pdf-parse');

const { getSubject, getTeachers, getSchedule } = require('./utils/filterPdf');
const { joinClassesWithSchedule, createObjectTeachersClasses } = require('./utils/joinInfo');
const pdfFile = fs.readFileSync('./assets/pdfFiles/turmas2.pdf')

pdfParse(pdfFile).then(data => {
    const textPdf = data.text;
    let arrayPDF = textPdf.split("\n");

    //Obtendo do PDF as disciplinas
    const classes = getSubject(arrayPDF);

    //Obtendo do PDF os professores relacionados às disciplinas
    const teachers = getTeachers(arrayPDF);

    // Obtendo do PDF os horários em que a disciplina ocorrerá
    const schedule = getSchedule(arrayPDF);

    // Gerando um array contendo, em cada posição, um outro array que contém 
    // a disciplina e seu respectivo horário
    const classesRelation = joinClassesWithSchedule(classes, schedule, teachers);
    
    // Criando um objeto que possui a chave como sendo o nome do professor, e o valor como 
    //sendo o array contendo as informações da disciplina (nome e horário)
    const teachersObject = createObjectTeachersClasses(teachers, classesRelation);

    // // Criando um arquivo JSON oriundo do objeto contendo os professores.
    fs.writeFile(`./db/professores.json`, JSON.stringify(teachersObject), (err) => {
        if(err) {
            console.log(err)
        }
    })
})
