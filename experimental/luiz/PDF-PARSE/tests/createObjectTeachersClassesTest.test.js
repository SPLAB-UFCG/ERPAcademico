const arrayPDF = require('./utils/arrayPDF');
const { getTeachers, getSubject, getSchedule } = require('../utils/filterPdf');
const {joinClassesWithSchedule , createObjectTeachersClasses} = require('../utils/joinInfo');


const teachers = getTeachers(arrayPDF);
const classes = getSubject(arrayPDF);
const schedule = getSchedule(arrayPDF);

const classesRelation = joinClassesWithSchedule(classes, schedule, teachers);

const finalTeachersInfo = createObjectTeachersClasses(teachers, classesRelation)

test('Verificando casos nos quais tem-se mais de um professor na disciplina', () => {
    expect(finalTeachersInfo.professores[0]['1354013 - JOSEANA MACEDO FECHINE'].length).toBe(4)

    expect(finalTeachersInfo.professores[0]['1354013 - JOSEANA MACEDO FECHINE']).toEqual([
        ['1411182 - LAB.DE ORG.E ARQUITETURA DE COMPUTADORES', '4 08:00-10:00 (LCC3a)6 10:00-12:00 (LCC3a)'],
        ['1411182 - LAB.DE ORG.E ARQUITETURA DE COMPUTADORES', '3 14:00-16:00 (LCC3a)5 16:00-18:00 (LCC3a)'],
        ['1411182 - LAB.DE ORG.E ARQUITETURA DE COMPUTADORES', '4 14:00-16:00 (LCC3a)6 16:00-18:00 (LCC3a)'],
        ['1411310 - ORGANIZACAO E ARQUIT. DE COMPUTADORES', '3 10:00-12:00 (CAA404)6 08:00-10:00 (CAA404)']
    ])
})

test('Verificando informações de disciplinas posicionadas em quebra de linha no PDF', () => {
    expect(finalTeachersInfo.professores[0]['2275784 - EVERTON LEANDRO GALDINO ALVES']).toContainEqual([
        '1411309 - PARADIGMAS DE LINGUAGEM DE PROGRAMACAO', '3 16:00-18:00 (CD107)6 14:00-16:00 (CD107)'
    ])

    expect(finalTeachersInfo.professores[0]['335033 - PEDRO SERGIO NICOLLETTI']).toContainEqual([
        '1411217 - PROJETO DE REDES DE COMPUTADORES', '3 10:00-12:00 (CD107)6 08:00-10:00 (CD107)'
    ])

    expect(finalTeachersInfo.professores[0]['337184 - FRANCISCO VILAR BRASILEIRO']).toContainEqual([
        '1411192 - SISTEMAS OPERACIONAIS', '2 14:00-16:00 (RE-08)4 16:00-18:00 (RE-08)'
    ])

    expect(finalTeachersInfo.professores[0]['2337723 - THIAGO EMMANUEL PEREIRA DA CUNHA SILVA']).toContainEqual([
        '1411192 - SISTEMAS OPERACIONAIS', '2 14:00-16:00 (RE-08)4 16:00-18:00 (RE-08)'
    ])
})