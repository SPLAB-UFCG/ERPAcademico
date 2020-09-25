function getSubject(arrayPDF) {
    let arrayDisciplinas = arrayPDF.map((element) => {
        if(element.startsWith('1411')) return element
    }).filter(disciplina => disciplina !== undefined);
    
    arrayDisciplinas.shift();

    return arrayDisciplinas;
}

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