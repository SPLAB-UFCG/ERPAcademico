const parse = require('pdf-parse');
const read = require('readline');
outside = function(){
    console.log('The user entered: ', opcao)
}
function formatar(dataBuffer){

  parse(dataBuffer).then( function(data){
    let mapaString = data.text.trim().split("\n");
    let valores = populaMapa(mapaString);

    let consulta = true;
    let leitor = read.createInterface({
          input: process.stdin,
          output: process.stdout
      });
      let answer = "";
      leitor.question("\n opções a baixo" +
                      "\n 1 - Listar todas as matérias e professores" +
                      "\n 2 - Listar todos os professores" +
                      "\n 3 - Listar todas as matérias" +
                      "\n 4 - Consultar as matérias de um professor" +
                      "\n 5 - Consultar professores de uma matéria",
      function(answer){
        opcao = answer;
        outside()
        leitor.close();
      })

    while(consulta){

      switch(answer) {
        case "1":
          let pares = Object.entries(valores);
          for(i = 0; i < pares.length; i++){
            console.log(toString(pares[i]));
          }
          break;
        case "2":
          console.log(getProfessores(Object.keys(valores)));
          break;
        case "3":
          console.log(getTurmas(Object.values(valores)));
          break;
        case "4":
          break;
        case "5":
          break;
        default:

      }
    }

    let pares = Object.entries(valores);
    for(i = 0; i < pares.length; i++){
      console.log(toString(pares[i]));
    }
    // console.dir(ProfMat, {'maxArrayLength': null});
  }).catch(e => {
    console.log(e);
  })

}

async function ask(){

}

function getProfessores(professoresConjunto){
  let professores = "";
  for(i = 0; i < professoresConjunto.length; i++){
    professores += ("\n" + professoresConjunto[i]);
  }
  return professores;
}

function getTurmas(turmasConjunto){
  let turmas = "";
  for(i = 0; i< turmasConjunto.length; i++){
    turmas += ("\n" + turmasConjunto[i]);
  }
  return turmas;
}

function getTurmasProfessor(professor, Profturmas){
  let pares = Object.entries(Profturmas);
  for(i = 0 ; i< pares.length; i++){
    if(pares[i][0] == professor){
      return pares[i][1];
    }
  }
}

function getProfessoresTurma(turma, Profturmas){
  let pares = Object.entries(Profturmas);
  let professores = "";
  for(i = 0; i< pares.length; i++){
    let turma = pares[i][1]
    if(turma.split("-")[2] == turma){
      professores += ("\n" + pares[i][0]);
    }
  }
}

function populaMapa(mapa) {
  let listProfs = false;
  let materia = "";
  let horarios = "";
  let ProfMat = {};
  for(i = 0 ; i < mapa.length; i++){

    if(mapa[i].startsWith("1411")){
      materia = mapa[i];
    } else if (mapa[i].endsWith('(S/S)')){
      horarios = mapa[i];
    }

    if(listProfs){
      let professor = mapa[i];
      if(ProfMat.hasOwnProperty(professor)) {
        ProfMat[professor].push(materia + "//" + horarios)
      } else {
        ProfMat[professor] = [materia + "//" + horarios];
      }


      listProfs = false;
    }

    if(mapa[i].startsWith("Profe")){
      listProfs = true;
    }
  }
  return ProfMat;

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
