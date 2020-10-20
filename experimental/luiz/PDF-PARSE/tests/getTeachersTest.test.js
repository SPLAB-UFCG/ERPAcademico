const arrayPDF = require('./utils/arrayPDF');
const { getTeachers } = require('../utils/filterPdf');

const teachers = getTeachers(arrayPDF);

test('first data is 3100718 - KENIA CRISTINA GONÇALVES DOS SANTOS', () => {
    expect(teachers[0]).toEqual('3100718 - KENIA CRISTINA GONÇALVES DOS SANTOS')
});

test('last data is 1126493 - PATRICIA DUARTE DE LIMA MACHADO', () => {
    expect(teachers[teachers.length - 1]).toEqual('1126493 - PATRICIA DUARTE DE LIMA MACHADO')

});

test('Verificando se o tamanho do array é igual a quantidade de disciplinas', () => {
    expect(teachers.length).toBe(91)
})

test('Verificando se há algum dado undefined ou inválido no array', () => {

    for(let i = 0; i < teachers.length; i++) {
            expect(teachers[i]).not.toBeNull()
            expect(teachers[i]).not.toBeUndefined()
    }

});