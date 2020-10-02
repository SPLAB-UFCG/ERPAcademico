const file = require('fs');
const estruturar = require('./parser')

let dataBuffer  = file.readFileSync("turmas.pdf");
estruturar.formatar(dataBuffer);
