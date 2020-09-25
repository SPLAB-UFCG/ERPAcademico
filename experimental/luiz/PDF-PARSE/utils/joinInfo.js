function joinClassesWithSchedule(classes, schedule, teachers) {
    const classesRelation = [];

    if (classes.length === teachers.length && classes.length === schedule.length) {
        for(let i = 0; i < classes.length; i++) {
            // Criando um array com as disciplinas e seus respectivos horários
            classesRelation.push([classes[i], schedule[i]])
        }
    }

    return classesRelation;
}

function createObjectTeachersClasses(teachers, classesRelation) {
    const teachersObj = {};
    
    for (let i = 0; i < teachers.length; i++) {
        //Criando um objeto com a key sendo o nome dos professores da disciplina, e o value
        // sendo a disciplina e o horário da mesma.
        teachersObj[teachers[i]] = classesRelation[i];       
    };

    return teachersObj;
}

module.exports = {
    joinClassesWithSchedule,
    createObjectTeachersClasses,
};