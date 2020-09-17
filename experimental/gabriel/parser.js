const parse = require('pdf-parse');
const file = require('fs');


let dataBuffer  = file.readFileSync("turmas.pdf");
let ProfMat = {};

parse(dataBuffer).then( function(data){
  let mapaString = data.text.trim().split("\n");

  let listProfs = false;
  let materia = "";
  for(i = 0 ; i < mapaString.length; i++){


    if(mapaString[i].startsWith("1411")){
      materia = mapaString[i];
      listProfs = false;
    } else if (mapaString[i].includes('/')){
      listProfs = false;
    }

    if(listProfs){
      ProfMat[mapaString[i]] = materia;
    }

    if(mapaString[i].startsWith("Profe")){
      listProfs = true;
    }


  }
  console.log(Object.keys(ProfMat))
  console.log(Object.values(ProfMat))
  console.log(ProfMat)
  })
