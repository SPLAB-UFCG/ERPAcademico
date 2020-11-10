var express = require('express');
var router = express.Router();
var pdfParser = require("./parser");
const file = require('fs');

var pdfRecebido;
var multer  = require('multer')
var storage = multer.memoryStorage();
var upload = multer({storage: storage});


router.post('/', upload.single('pdf'), function(req, res, next) {
   pdfRecebido = req.body;

   pdfParser.formatar(req.file.buffer, res)

   // res.send(req.file.buffer);
});

router.get('/professores', function(req, res, next){

})



module.exports = router;
