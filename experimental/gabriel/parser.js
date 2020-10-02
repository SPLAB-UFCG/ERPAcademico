const parse = require('pdf-parse');

function formatar(dataBuffer){
  let ProfMat = {};

  parse(dataBuffer).then( function(data){
    let mapaString = data.text.trim().split("\n");

    let listProfs = false;
    let materia = "";
    let horarios = "";
    for(i = 0 ; i < mapaString.length; i++){

      if(mapaString[i].startsWith("1411")){
        materia = mapaString[i];
      } else if (mapaString[i].endsWith('(S/S)')){
        horarios = mapaString[i];
      }

      if(listProfs){
        let professor = mapaString[i];
        if(ProfMat.hasOwnProperty(professor)) {
          ProfMat[professor].push(materia + "//" + horarios)
        } else {
          ProfMat[professor] = [materia + "//" + horarios];
        }


        listProfs = false;
      }

      if(mapaString[i].startsWith("Profe")){
        listProfs = true;
      }
    }

    let pares = Object.entries(ProfMat);
    for(i = 0; i < pares.length; i++){
      console.log(toString(pares[i]));
    }
    // console.dir(ProfMat, {'maxArrayLength': null});
  })

}


  function toString(dados) {
    let nomeProf = dados[0];
    let materias = dados[1];

    let formatacao = "O professor " + nomeProf + " leciona as seguintes matérias: \n";

    materias.map((materia) =>{
      nome = materia.split("//")[0];
      horario = materia.split("//")[1];
      formatacao += (nome + " -- " + horario + "\n")
    })

    return formatacao;
  }

exports.formatar = formatar
