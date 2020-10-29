
/**
 * Retrona um array contendo a relação de disciplinas do PDF
 * @param arrayPDF Um array com todas as informações oriundas de um doc PDF, 
 *                 gerado pela lib pdf-parse.
 */
function getSubject(arrayPDF) {
    let arraySubjects = arrayPDF.map((element) => {
        // Utilizamos os códigos das disciplinas de CC para obtermos um array de disciplinas
        if(element.startsWith('1411') || element.startsWith('130') || element.startsWith('110')
        || element.startsWith('1114')){
            return element  
        }
    }).filter(disciplina => disciplina !== undefined && !disciplina.includes("UNID. ACAD."));
    // Ao final do map, fazemos um filter para retirar qualquer dado undefined e também a string 'UNID. ACAD.', que começa
    // com código 1411 (igual as disciplinas de CC)
    return arraySubjects;
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
            // Se a String atual é "Professores: " e o elemento posterior inclui o separador ' - '
            // Isso indica que este elemento posterior é um professor
            if(element === 'Professores:' && arrayPDF[index + 1].includes(' - ')) {
                return arrayPDF[index + 1];
                // Se o elemento posterior não possui o separador, devemos investigar os elementos mais adiante,
                // até encontrarmos o nome do professor. Pois, podemos ter um caso de quebra de página
                // Ou mais de um prof na disciplina.
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
    const arraySchedules = arrayPDF.map(element => {
        // Usamos como critério para o map, se a String contiver :00 ou :30, que são horários fechados nos quais as aulas ocorrem
        if(element.includes(':00-') || element.includes(':30')) return element;
    }).filter(schedule => schedule !== undefined);
    // Ao final do map, filtramos o array para remover qualquer valor undefined que exista no mesmo.
    return arraySchedules;
}

module.exports = {
    getSubject,
    getTeachers,
    getSchedule
}