
/**
 * Retrona um array contendo a relação de disciplinas do PDF
 * @param arrayPDF Um array com todas as informações oriundas de um doc PDF, 
 *                 gerado pela lib pdf-parse.
 */
function getSubject(arrayPDF) {
    let arrayDisciplinas = arrayPDF.map((element) => {
        if(element.startsWith('1411')) return element
    }).filter(disciplina => disciplina !== undefined);
    
    arrayDisciplinas.shift();

    return arrayDisciplinas;
}

/**
 * Retorna um array contendo os nomes dos professores e seu código. Este método previne a situação
 * do nome do professor estar inserido em uma quebra de linha em relação à disciplina
 * (Caso da disciplina de FMCC I no horário da noite, no PDF de teste)
 * 
 * @param arrayPDF Um array com todas as informações oriundas de um doc PDF, 
 *                 gerado pela lib pdf-parse.
 */
function getTeachers(arrayPDF) {
    const arrayTeachers = arrayPDF.map((element, index) => {
            if(element === 'Professores:' && arrayPDF[index + 1].includes(' - ')) {
                return arrayPDF[index + 1];
            } else if (element === 'Professores:' && !arrayPDF[index + 1].includes(' - ')) {
                for(let i = index; i < arrayPDF.length; i++) {
                    if(!arrayPDF[i].startsWith('141') && arrayPDF[i].includes(' - ')){
                        return(arrayPDF[i]);
                    }
                }
            }
        }).filter(teacher => teacher !== undefined);

        return arrayTeachers
}

/**
 * Retorna um array contendo a relação de horários das disciplinas do PDF
 * @param arrayPDF Um array com todas as informações oriundas de um doc PDF, 
 *                 gerado pela lib pdf-parse.
 */

function getSchedule(arrayPDF) {
    const arraySchedule = arrayPDF.map(element => {
        if(element.includes(':00')) return element;
    }).filter(schedule => schedule !== undefined);

    return arraySchedule;
}

module.exports = {
    getSubject,
    getTeachers,
    getSchedule
}