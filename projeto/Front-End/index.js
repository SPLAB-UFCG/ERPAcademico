var inputElement = document.getElementById("file");

console.log(inputElement);
console.log(inputElement.files[0]);

inputElement.addEventListener("change", (e) => {
    var file = inputElement.files[0];
    var pdf = new FormData();
    pdf.append("pdf", file);
    fetch("http://localhost:3000/", {
        method: "POST",
        body: pdf
    })
    .then(response => response.json())
    .then(body => {
      console.log(body);
      Demonstrar(body);
    })
    .catch(e => console.log(e));
})


function Demonstrar(info){
  var principal = document.getElementById("mainf");
  var table = document.createElement("table");
  var tableB = document.createElement("tbody");
  var tableH = document.createElement("thead");

  table.appendChild(tableH);
  table.appendChild(tableB);

  var pares = Object.entries(info);
  var cabecalhoLinha = document.createElement("tr");
  var cabecalhoProf = document.createElement("th");
  var cabecalhoMat = document.createElement("th");

  cabecalhoProf.innerText="prof";
  cabecalhoMat.innerText = "matérias";
  cabecalhoLinha.appendChild(cabecalhoProf);
  cabecalhoLinha.appendChild(cabecalhoMat);
  tableH.appendChild(cabecalhoLinha);

  for(i = 0; i < pares.length; i++){

    var linha = document.createElement("tr");
    var profCell = document.createElement("td");
    var matCell = document.createElement("td");

    profCell.innerText = pares[i][0].split("-")[1];


    var stringParseada = "";
    var materiasArr = pares[i][1];
    for(j = 0; j < materiasArr.length; j++){
      var arrayMat = materiasArr[j].split("//");
      stringParseada += (arrayMat[0] + "--" + arrayMat[1] + "\n");
    }
    console.log(stringParseada)


    matCell.innerText = stringParseada;

    linha.appendChild(profCell);
    linha.appendChild(matCell);

    tableB.appendChild(linha);
  }
  principal.innerHTML = "<table>"+  table.innerHTML+ "</table>";

}
