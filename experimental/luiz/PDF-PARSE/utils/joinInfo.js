
/**
 * Esta função retorna um array com a relação de professores, disciplinas e seus 
 * respectivos horários, recebendo como parâmetro um array de disciplinas, um array de horários
 * e um array de professores.
 */
function joinClassesWithSchedule(classes, schedule, teachers) {
    const classesRelation = [];

    if (classes.length === teachers.length && classes.length === schedule.length) {
        for (let i = 0; i < classes.length; i++) {
            classesRelation.push([teachers[i], classes[i], schedule[i]])
        }
    }
    
    return classesRelation;
}

/**
 * Retorna um array contendo as posições onde os ícones separadores forem encontrados
 * @param  stringTeacher String contendo o nome do(s) professor(es)
 * @param  separator    String contendo o ícone separador de professores (no caso, será o "-")
 */

function findSeparatorPositions(stringTeacher, separator) {
    let separatorPosition = [];

    for (let i = 0; i < stringTeacher.length; i++) {
        if (stringTeacher[i] === separator) {
            separatorPosition.push(i);
        }
    };

    return separatorPosition;
}

/**
 * Retorna um array, contendo os nomes de cada um dos professores da disciplina.
 * @param separatorsArray Array contendo as posições dos ícones separadores
 * @param stringTeacher String contendo o nome do(s) professor(es)
 * @param teacherCodeLength Valor inteiro que informa o length do código dos professores
 */
function getTeacherSubstring(separatorsArray, stringTeacher, teacherCodeLength) {

    let professores = [];
    let substringDelimiter = (teacherCodeLength + 1);

    for (let i = 0; i < separatorsArray.length; i++) {

        if (i < separatorsArray.length - 1) {
            let professor = stringTeacher.substring(separatorsArray[i] - substringDelimiter, separatorsArray[i + 1] - substringDelimiter)
            professores.push(professor)
        } else {
            let professor = stringTeacher.substring(separatorsArray[i] - substringDelimiter)
            professores.push(professor);
        }
    }
    
    return professores;
}

/**
 * Retorna um objeto restaurado para o caso de termos uma disciplina com mais de um professor.
 * 
 * @param teachersObj Objeto contendo a relação de professores (key), 
 *                    e as disciplinas/horários (values de um array)
 */
function fixMultipleTeachers(teachersObj) {
    const teachersObjFixed = {};
    
    for (const key in teachersObj) {
        
        const separator = "-";
        let professores = [];

        let separatorPositions = findSeparatorPositions(key, separator)

        if (separatorPositions.length <= 1) {
            separatorPositions = [];
            if(Object.keys(teachersObjFixed).includes(key)){
                for(let j = 0; j < teachersObj[key].length; j++){
                    teachersObjFixed[key].push(teachersObj[key][j])
                }
            } else {
                teachersObjFixed[key] = teachersObj[key];
            }
        } else {

            professores = getTeacherSubstring(separatorPositions, key, 7)

            for (let i = 0; i < professores.length; i++) {
                if (Object.keys(teachersObjFixed).includes(professores[i])) {
                    for(let j = 0; j < teachersObj[key].length; j++){
                        teachersObjFixed[professores[i]].push(teachersObj[key][j])
                    }
                } else {
                    teachersObjFixed[professores[i]] = teachersObj[key]
                }
            }
        }
    }
    console.log(teachersObjFixed['337184 - FRANCISCO VILAR BRASILEIRO'])
    return teachersObjFixed;

}

/**
 * Esta função cria um objeto com chave "professores", que contém um array de objetos, 
 * onde cada um desses objetos possui como chave o nome do professor, e o valor são arrays 
 * com as disciplinas e os horários da mesma
 * 
 * @param teachers Array com o nome dos professores 
 * @param classesRelation Array com a relação de professores, disciplinas e seus 
 *                        respectivos horários
 */
function createObjectTeachersClasses(teachers, classesRelation) {
    let finalTeachersObj = { "professores": [] };
    const teachersObj = {}

    for (let i = 0; i < teachers.length; i++) {
        teachersObj[classesRelation[i][0]] = []
    };

    for (let i = 0; i < classesRelation.length; i++) {
        for (const teacherName in teachersObj) {
            if (teacherName === classesRelation[i][0]) {
                teachersObj[teacherName].push([classesRelation[i][1], classesRelation[i][2]]);
            };
        };
    };

    finalTeachersObj["professores"].push(fixMultipleTeachers(teachersObj))
    return finalTeachersObj;
}

module.exports = {
    joinClassesWithSchedule,
    createObjectTeachersClasses,
};