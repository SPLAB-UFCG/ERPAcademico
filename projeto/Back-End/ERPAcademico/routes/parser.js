const parse = require('pdf-parse');

//Metodo principal a ser usado(talvez tenha de ser chamado sempre que um get for realizado), realiza a divisão da string do pdf
function formatar(dataBuffer, response){

  parse(dataBuffer).then( function(data){
    let mapaString = data.text.trim().split("\n");
    let valores = populaMapa(mapaString);


    let pares = Object.entries(valores);
    for(i = 0; i < pares.length; i++){
      console.log(toString(pares[i]));
    }
    response.send(valores);
    // console.dir(ProfMat, {'maxArrayLength': null});
  }).catch(e => {
    console.log(e);
  })

}

//recebe o conjunto de chaves do objeto mapeado, retornando os professores(Object.keys(pares))
function getProfessores(professoresConjunto){
  let professores = "";
  for(i = 0; i < professoresConjunto.length; i++){
    professores += ("\n" + professoresConjunto[i]);
  }
  return professores;
}

//recebe o conjunto de turmas
function getTurmas(turmasConjunto){
  let turmas = "";
  for(i = 0; i< turmasConjunto.length; i++){
    turmas += ("\n" + turmasConjunto[i]);
  }
  return turmas;
}

//Recebe um professor e o cojunto de turmas disponiveis, e retorna as turmas sob responsabilidade daquele professor
function getTurmasProfessor(professor, Profturmas){
  let pares = Object.entries(Profturmas);
  for(i = 0 ; i< pares.length; i++){
    if(pares[i][0] == professor){
      return pares[i][1];
    }
  }
}

// recebe uma turma e o conjunto de professores, e retorna os professores responsaveis por ela
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

//Retorna um mapa povoado com as informações retiradas do pdf(chamado na função formatar)
function populaMapa(mapa) {
  let listProfs = false;
  let materia = "";
  let horarios = "";
  let ProfMat = {};
  for(i = 0 ; i < mapa.length; i++){

    if(mapa[i].startsWith("1411")){
      materia = mapa[i];
    } else if (mapa[i].includes(":00") || mapa[i].includes(":30")){
      horarios = mapa[i];
    }

    if(listProfs && mapa[i].includes(" - ") && !mapa[i].includes("141")){
      let professor = mapa[i];
      if(ProfMat.hasOwnProperty(professor)) {
        ProfMat[professor].push(materia + "//" + horarios)
      } else {
        ProfMat[professor] = [materia + "//" + horarios];
      }


      listProfs = false;
    }

    if(mapa[i].startsWith("Profe") && !(mapa[i+1].includes("1411"))){
      listProfs = true;
    }
  }
  return ProfMat;

}

// retorna uma saida de string legivel para o usuário
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
