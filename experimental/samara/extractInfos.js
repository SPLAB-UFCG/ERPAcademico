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
        if(pdfFiltered[i] === 'Professores:') professors.push(pdfFiltered[i + 1]);
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

module.exports = {
    extractSubjects,
    extractProfessors,
    extractSchandules,
    joinArrays
};