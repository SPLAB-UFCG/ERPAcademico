var setProfessors = new Set();
var myMap = new Map();
var output = "";

let subjects = [];
let professors = [];
let schedules = [];
let union = [];

function extractSubjects(pdfFiltered){
    for(let i = 0; i < pdfFiltered.length; i++){
        if(pdfFiltered[i].startsWith('1411')) subjects.push(pdfFiltered[i]);
    }

    subjects.shift();
}

function extractProfessors(pdfFiltered){
    for(let i = 0; i < pdfFiltered.length; i++){
        if(pdfFiltered[i] == 'Professores:') professors.push(pdfFiltered[i + 1]);
    }
}

function extractSchandules(pdfFiltered){
    for(let i = 0; i < pdfFiltered.length; i++){
        if(pdfFiltered[i].indexOf(':00') > -1) schedules.push(pdfFiltered[i]);
    }
}



function joinArrays(){
    for(let i = 0; i < subjects.length; i++){
        union.push([]);
        union[i].push(subjects[i], professors[i], schedules[i]);
    }

    return union;
}

function fillSetProfessors(){
    for(let i = 0; i < professors.length; i++){
        setProfessors.add(professors[i]);
    }
}

function setKeys(){
    for (let professor of setProfessors) myMap.set(professor, []);
}

function setValuesOnMap(){
    fillSetProfessors();
    setKeys();
    for(let i = 0; i < union.length; i++){
        myMap.get(union[i][1]).push(union[i][0], union[i][2]);
    }

    return myMap;
}

function formatOutput(){
    for (var key of myMap.keys()) {
        output += "Professor(a) " + key.split(" - ")[1] + " (" + key.split(" - ")[0] + ")" + " possui a(s) disciplinas:\n";
        for(var i = 0; i < myMap.get(key).length; i+=2){
            output += myMap.get(key)[i] + " nos horários " + myMap.get(key)[i + 1] + "\n";
        }

        output += "\n";
    }
    
    return output;
}

module.exports = {
    extractSubjects,
    extractProfessors,
    extractSchandules,
    joinArrays,
    setValuesOnMap,
    formatOutput
};