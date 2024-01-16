let elSubjectNumber = document.querySelector(".subject-number");

function getSubjectNumber() {
    fetch("http://localhost:9090/all-subject", {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        elSubjectNumber.textContent =  data.data.length;
    })
    .catch(error => console.log(error));
}

getSubjectNumber();

let elTeacherNumber = document.querySelector(".teacher-number");

function getTeacherNumber() {
    fetch("http://localhost:9090/all-teacher?name=", {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        elTeacherNumber.textContent =  data.data.length ? data.data.length : 0;
    })
    .catch(error => console.log(error));
}

getTeacherNumber();

let elGroupNumber = document.querySelector(".group-number");

function getGroupNumber() {
    fetch("http://localhost:9090/all-group", {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        elGroupNumber.textContent =  data.data.length? data.data.length : 0;
    })
    .catch(error => console.log(error));
}

getGroupNumber();

let elStudentNumber = document.querySelector(".student-number");

function getStudentNumber() {
    fetch("http://localhost:9090/all-student", {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        elStudentNumber.textContent =  data.data.length? data.data.length : 0;
    })
    .catch(error => console.log(error));
}

getStudentNumber();
