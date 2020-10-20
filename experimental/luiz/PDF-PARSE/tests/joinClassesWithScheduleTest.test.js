const arrayPDF = require('./utils/arrayPDF');
const { getTeachers, getSubject, getSchedule } = require('../utils/filterPdf');
const {joinClassesWithSchedule} = require('../utils/joinInfo');

const teachers = getTeachers(arrayPDF);
const classes = getSubject(arrayPDF);
const schedule = getSchedule(arrayPDF);

const classesRelation = joinClassesWithSchedule(classes, schedule, teachers);

test('Verificando se há elementos nulos ou undefined no array resultante', () => {
    for(let i = 0; i < classesRelation.length; i++) {
        expect(classesRelation[i]).not.toBeNull()
        expect(classesRelation[i]).not.toBeUndefined()
}
})

test('Verificando se a composição do array final', () => {
    for(let i = 0; i < classesRelation.length; i++) {
        expect(classesRelation[i][0]).toEqual(teachers[i])
        expect(classesRelation[i][1]).toEqual(classes[i])
        expect(classesRelation[i][2]).toEqual(schedule[i])
}
})

test('Verificando o tamanho do array', () => {
    expect(classesRelation.length).toBe(91)
})
