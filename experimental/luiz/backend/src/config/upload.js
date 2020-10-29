/**
 * Arquivo para configuração do multer. O armazenamento dos uploads está sendo feito em disco.
 */
const multer = require('multer');
const path = require('path');

const storage =  multer.diskStorage({
    //Definindo como destino a pasta de uploads
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
        // o nome do arquivo será o nome do arquivo original upado pelo usuário. Pensar em como evitar sobrescrição de dados.
        const fileName = `${file.originalname}`

        callback(null, fileName);
    }
})

module.exports = {
    storage
}