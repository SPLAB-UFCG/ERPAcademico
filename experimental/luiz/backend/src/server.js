const express = require('express');
const cors = require('cors');
const fs = require('fs')
const multer = require('multer');
const { storage } = require('./config/upload')
const { pdfParser } = require('./pdfParse');

const upload = multer({storage}).single('pdf')
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

app.get('/teachers', (request, response) => {
    response.json({"message": "Ok"})
})

app.post('/', (request, response, next) => {
    upload(request, response, err => {
        if(err) {
            return response.end("Ocorreu um erro")
        }
        // O setTimeout foi usado para retardar a chamada do pdfParser em 10 segundos
        // Pois o parse deve ser feito quando o upload foi concluído. 
        // Deve-se buscar uma solução mais assertiva.
        setTimeout(() => {
            const filePath = request.file.path
            // const fileName = request.file.filename.replace('.pdf', '.json')
            const pdfFile = fs.readFileSync(filePath)
            
            pdfParser(pdfFile);

        }, 10000)
        
        return response.status(201).json({"message": "upload realizado com sucesso."})
    })

})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});