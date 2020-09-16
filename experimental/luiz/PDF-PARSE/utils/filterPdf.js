function getSubject(arrayPDF) {
    let arrayDisciplinas = arrayPDF.map((element) => {
        if(element.startsWith('1411')) return element
    }).filter(disciplina => disciplina !== undefined);
    
    arrayDisciplinas.shift();

    return arrayDisciplinas;
}

function getTeachers(arrayPDF) {
    const arrayTeachers = arrayPDF.map((element, index) => {
            if(element === 'Professores:') return arrayPDF[index + 1];
        }).filter(teacher => teacher !== undefined);

        return arrayTeachers
}

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