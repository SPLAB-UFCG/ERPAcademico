function joinClassesWithSchedule(classes, schedule, teachers) {
    const classesRelation = [];

    if (classes.length === teachers.length && classes.length === schedule.length) {
        for(let i = 0; i < classes.length; i++) {
            // Criando um array com as disciplinas e seus respectivos horários
            classesRelation.push([teachers[i] ,classes[i], schedule[i]])
        }
    }

    return classesRelation;
}

function createObjectTeachersClasses(teachers, classesRelation) {
    const teachersObj = {};
    
    for (let i = 0; i < teachers.length; i++) {
        
        teachersObj[classesRelation[i][0]] = []       
    };

    for (let i = 0; i < classesRelation.length; i++) {
        for (const teacherName in teachersObj) {
                if(teacherName === classesRelation[i][0]) {
                    teachersObj[teacherName].push([classesRelation[i][1], classesRelation[i][2]]);
                };
            };
        };
    

    return teachersObj;
}

module.exports = {
    joinClassesWithSchedule,
    createObjectTeachersClasses,
};