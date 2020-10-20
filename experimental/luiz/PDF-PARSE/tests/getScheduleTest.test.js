const arrayPDF = require('./utils/arrayPDF');
const { getSchedule } = require('../utils/filterPdf');

const schedule = getSchedule(arrayPDF);

test('first data is 4 08:00-10:00 (S/S)6 10:00-12:00 (S/S)', () => {
    expect(schedule[0]).toEqual('4 08:00-10:00 (S/S)6 10:00-12:00 (S/S)')
});

test('last data is 3 16:00-18:00 (RE-08)6 14:00-16:00 (RE-08)', () => {
    expect(schedule[schedule.length - 1]).toEqual('3 16:00-18:00 (RE-08)6 14:00-16:00 (RE-08)')

});

test('Verificando se o tamanho do array é igual a quantidade de disciplinas', () => {
    expect(schedule.length).toBe(91)
})

test('Verificando se há algum dado undefined ou inválido no array', () => {

    for(let i = 0; i < schedule.length; i++) {
            expect(schedule[i]).not.toBeNull()
            expect(schedule[i]).not.toBeUndefined()
    }

});