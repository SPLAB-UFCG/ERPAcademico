var express = require('express');
var router = express.Router();
var pdfParser = require("./parser");
const file = require('fs');
let pdfRecebido;

/* GET home page. */
router.post('/', function(req, res, next) {
   pdfRecebido = req.body;

   // let dataBuffer  = file.readFileSync(pdfRecebido.path);


   res.send(req.body);
});


module.exports = router;
