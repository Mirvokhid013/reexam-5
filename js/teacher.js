let elFormTeacher = document.querySelector(".teacher__form");
let teacherSubject = document.querySelector(".teacher__select");
let elTeacherTable = document.querySelector(".teacher-table");
let elTeacherModal = document.querySelector(".modal-wrapper");
let elFormModal = document.querySelector(".modal-form");
let elTeacherSearch = document.querySelector(".search-teacher");

getSubject();

function getSubject() {
    fetch("http://localhost:9090/all-subject", {
    method: "GET",
})
.then(res => res.json())
.then(data => {
    renderSubject(data.data, teacherSubject)
})
.catch(error => console.log(error));
}

function renderSubject(array, node) {
    node.innerHTML = '';
    array.forEach(item => {
        // console.log(item);
        node.innerHTML += `
        <option value="${item.id}">${item.subject_name}</option>
        `
    });
}

elFormTeacher.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    let formData = new FormData();
    formData.append("first_name", evt.target[0].value);
    formData.append("last_name", evt.target[1].value);
    formData.append("age", evt.target[3].value);
    formData.append("phone_number", evt.target[5].value.toString());
    formData.append("img", evt.target[4].files[0]);
    formData.append("subject_id", evt.target[2].value.toString());
    
    postTeacher(formData);
    getTeacher();
    
    evt.target[0].value = '';
    evt.target[1].value = '';
    evt.target[2].value = '';
    evt.target[3].value = '';
    evt.target[4].value = '';
    evt.target[5].value = '';
})

function postTeacher(forma) {
    fetch("http://localhost:9090/teacher/create", {
    method: "POST", 
    body: forma,
}).then(res => res.json())
.then((data)=>{
    console.log(data);
})
.catch(error => console.log(error))
}

// function editTeacher(forma, id) {
//     fetch("http://localhost:9090/teacher/update/" + id, {
//     method: "PUT", 
//     body: forma,
// }).then(res => res.json())
// .then((data)=>{
//     console.log(data);
// })
// .catch(error => console.log(error))
// }

function getTeacher() {
    fetch("http://localhost:9090/all-teacher?name=", {
    method: "GET",
})
.then(res => res.json())
.then(data => {
    renderTeacherData(data.data, elTeacherTable);
})
.catch(error => console.log(error));
}

getTeacher();





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
        <td>${item.subjects.subject_name}</td>
        <td>${item.age}</td>
        <td>
        <button class="table-edit-btn">
        <img data-todo-id=${item.id} class="table-edit-img" src="../images/edit.svg" alt="edit">
        </button>
        </td>
        <td>
        <button class="table-delete-btn">
        <img data-todo-id=${item.id} class="table-delete-img" src="../images/delete.svg" alt="edit">
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
        getTeacher();
    })
}

function editBtn(url, forma, id) {
    fetch(url + id, {
        method: "PUT", 
        body: forma,
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        getTeacher();
    })
}

elTeacherTable.addEventListener("click", (evt) =>{
    if(evt.target.matches(".table-delete-img")) {
        let deletedId =  evt.target.dataset.todoId;
        console.log(deletedId);
        deleteBtn("http://localhost:9090/teacher/delete/", deletedId);
    }
})

elTeacherTable.addEventListener("click", (evt) =>{
    if(evt.target.matches(".table-edit-img")) {
        let editId =  evt.target.dataset.todoId;
        console.log(editId);
        let editValueName = prompt("Ismni kiriting : ");
        let editValueAge = prompt("Yoshni kiriting : ");
        // let editValueImg = prompt.files("Rasmni kiriting : ");
        
        let formData = new FormData();
        formData.append("first_name", editValueName);
        formData.append("age", editValueAge);
        // formData.append("age", evt.target[3].value);
        
        editBtn("http://localhost:9090/teacher/update/", formData, editId);
    }
})

// elFormModal.addEventListener("submit", (evt) => {
//     evt.preventDefault();

//     let formData = new FormData();
//     formData.append("first_name", evt.target[0].value);
//     formData.append("age", evt.target[3].value);
//     formData.append("img", evt.target[4].files[0]);

//     editTeacher(formData);
//     getTeacher();
//     elTeacherModal.style.display = "none";
// })

elTeacherSearch.addEventListener("keyup", (evt) => {
    evt.preventDefault();

    if (evt.target.value.length > 0) {
        function findName() {
            fetch("http://localhost:9090/all-teacher?name=" + evt.target.value, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            renderTeacherData(data.data, elTeacherTable);
        })
        .catch(error => console.log(error));
        }
    
        findName();
    } else {
        function findName() {
            fetch("http://localhost:9090/all-teacher", {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            renderTeacherData(data.data, elTeacherTable);
        })
        .catch(error => console.log(error));
        }
    
        findName();
    }
})