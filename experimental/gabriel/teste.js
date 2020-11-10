const file = require('fs');
const estruturar = require('./parser')

let dataBuffer  = file.readFileSync("turmas_14110000_2019.1_133952766.pdf");
estruturar.formatar(dataBuffer);
