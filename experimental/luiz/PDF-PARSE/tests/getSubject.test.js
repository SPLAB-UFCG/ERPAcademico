const arrayPDF = require('./utils/arrayPDF');
const { getSubject } = require('../utils/filterPdf');

const classes = getSubject(arrayPDF)

test('first data is 1301014 - ADMINISTRAÇÃO', () => {
        expect(classes[0]).toEqual('1301014 - ADMINISTRAÇÃO')
});

test('last data is 1411343 - VERIFICACAO E VALIDACAO DE SOFTWARE', () => {
        expect(classes[classes.length - 1]).toEqual('1411343 - VERIFICACAO E VALIDACAO DE SOFTWARE')

});

test('Verificando se o tamanho do array é igual a quantidade de disciplinas', () => {
        expect(classes.length).toBe(91)
})

test('Verificando se há algum dado undefined ou inválido no array', () => {

        for(let i = 0; i < classes.length; i++) {
                expect(classes[i]).not.toBeNull()
                expect(classes[i]).not.toBeUndefined()
        }

});


