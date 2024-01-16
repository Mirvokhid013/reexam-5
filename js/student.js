let elFormStudent = document.querySelector(".student__form");
let studentName = document.querySelector(".student-name")
let studentLName = document.querySelector(".student-lname")
let studentNumber = document.querySelector(".student-number")
let studentParentName = document.querySelector(".student-parent-name")
let studentParentNumber = document.querySelector(".student-parent-number")
let studentGroup = document.querySelector(".student__select")
let studentAge = document.querySelector(".student-age");
let studentTable = document.querySelector(".student-table");
let studentSearch = document.querySelector(".student-search");

getGroup();

function getGroup() {
    fetch("http://localhost:9090/all-group", {
    method: "GET",
})
.then(res => res.json())
.then(data => {
    renderSubject(data.data, studentGroup)
})
.catch(error => console.log(error));
}

function renderSubject(array, node) {
    node.innerHTML = '';
    array.forEach(item => {
        console.log(item);
        node.innerHTML += `
        <option value="${item.subject_id}">${item.group_name}</option>
        `
    });
}


elFormStudent.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    
    // console.log(studentName.value, studentName.value, studentNumber.value, studentParentName.value, studentParentNumber.value, studentSubject.value, studentAge.value);
    
    postStudent(studentName.value, studentLName.value, studentAge.value, studentNumber.value, studentParentName.value, studentParentNumber.value, studentSubject.value);
})


function postStudent(first_name, last_name, age, phone_number, parent_name, parent_phone_number, group_id) {
    fetch("http://localhost:9090/student/create", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
    }, 
    body: JSON.stringify({
        first_name,
        last_name,
        age,
        phone_number,
        parent_name,
        parent_phone_number,
        group_id,
    })
}).then(res => res.json())
.then((data)=>{
    console.log(data);
})
.catch(error => console.log(error))
}

function getStudent() {
    fetch("http://localhost:9090/all-student?name=", {
    method: "GET",
})
.then(res => res.json())
.then(data => {
    renderTeacherData(data.data, studentTable);
})
.catch(error => console.log(error));
}

getStudent();

function renderTeacherData(array, node) {
    node.innerHTML = '';
    let sanoq = 0;
    array.forEach(item => {
        ++sanoq;
        console.log(item);
        node.innerHTML += `
        <tr>
        <th scope="row">${sanoq}</th>
        <td>${item.first_name}</td>
        <td>${item.last_name}</td>
        <td>${item.phone_number}</td>
        <td>${item.group_id}</td>
        <td>${item.age}</td>
        <td>${item.parent_name}</td>
        <td>${item.parent_phone_number}</td>
        <td>
        <button class="table-edit-btn">
        <img data-todo-id=${item.id} class="table-delete-img" src="../images/edit.svg" alt="edit">
        </button>
        </td>
        <td>
        <button class="table-delete-btn">
        <img data-todo-id=${item.id} class="table-edit-img" src="../images/delete.svg" alt="edit">
        </button>
        </td>
        </tr>
        `
    });
    
    sanoq = 0;
}

function deleteBtn(url, id) {
    fetch(url + id, {
        method: "DELETE"
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        getStudent();
    })
}

function editBtn(url, forma, id) {
    fetch(url + id, {
        method: "PUT", 
        body: forma,
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        getStudent();
    })
}

studentTable.addEventListener("click", (evt) =>{
    if(evt.target.matches(".table-delete-img")) {
        let deletedId =  evt.target.dataset.todoId;
        console.log(deletedId);
        deleteBtn("http://localhost:9090/student/delete/", deletedId);
    }
})

studentTable.addEventListener("click", (evt) =>{
    if(evt.target.matches(".table-edit-img")) {
        let editId =  evt.target.dataset.todoId;
        console.log(editId);
        let editValueName = prompt("Ismni kiriting : ");
        let editValueLName = prompt("Familiyani kiriting : ");
        let editValueAge = prompt("Yoshni kiriting : ");
        let editValueNumber = prompt("Raqamni kiriting : ");
        // let editValueImg = prompt.files("Rasmni kiriting : ");
        
        let formData = new FormData();
        formData.append("first_name", editValueName);
        formData.append("last_name", editValueLName);
        formData.append("age", editValueAge.toString());
        formData.append("phone_number", editValueNumber.toString());
        // formData.append("age", evt.target[3].value);
        
        editBtn("http://localhost:9090/teacher/update/", formData, editId);
    }
})

studentSearch.addEventListener("keyup", (evt) => {
    evt.preventDefault();

    if (evt.target.value.length > 0) {
        function findName() {
            fetch("http://localhost:9090/all-student?name=m" + evt.target.value, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            renderTeacherData(data.data, studentTable);
        })
        .catch(error => console.log(error));
        }
    
        findName();
    } else {
        function findName() {
            fetch("http://localhost:9090/all-student", {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            renderTeacherData(data.data, studentTable);
        })
        .catch(error => console.log(error));
        }
    
        findName();
    }
})