let elSubjectForm = document.querySelector(".subject__form");
let elSubjectInput = document.querySelector(".subject__input");
let elSubjectTable = document.querySelector(".subject-table");



elSubjectForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if(elSubjectInput.value.trim()) {
        post("http://localhost:9090/subject/create", elSubjectInput.value);
    }
    get();
    elSubjectInput.value = "";
})

get();

function deleteBtn(url, id) {
    fetch(url + id, {
        method: "DELETE"
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        get();
    })
}

function editBtn(url, id, inputValue) {
    fetch(url + id, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
        }, 
        body: JSON.stringify({
            "subject_name": inputValue,
        })
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        get();
    })
}

function get() {
    fetch("http://localhost:9090/all-subject", {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        subjectRender(data.data, elSubjectTable);
    })
    .catch(error => console.log(error));
}


function subjectRender(array, node) {
    node.innerHTML = '';
    let sanoq = 0;
    array.forEach(item => {
        ++sanoq;
        // console.log(item);
        node.innerHTML += `
        <tr>
        <th scope="row">${sanoq}</th>
        <td>${item.subject_name}</td>
        <td>
        <button  class="table-edit-btn">
        <img data-todo-id=${item.id} class="table-edit-img" src="../images/edit.svg" alt="edit">
        </button>
        </td>
        <td>
        <button  class="table-delete-btn">
        <img data-todo-id=${item.id} class="table-delete-img" src="../images/delete.svg" alt="edit">
        </button>
        </td>
        </tr>
        `
    });

    sanoq = 0;
}


function post(url, subject) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        }, 
        body: JSON.stringify({
            "subject_name": subject,
        })
    }).then(res => res.json())
    .then((data)=>{
        // console.log(data);
    })
    .catch(error => console.log(error))
}

elSubjectTable.addEventListener("click", (evt) =>{
    if(evt.target.matches(".table-delete-img")) {
        let deletedId =  evt.target.dataset.todoId;
        console.log(deletedId);
        deleteBtn("http://localhost:9090/subject/delete/", deletedId);
    }
})

elSubjectTable.addEventListener("click", (evt) =>{
    if(evt.target.matches(".table-edit-img")) {
        let editId =  evt.target.dataset.todoId;
        console.log(editId);
        let editValue = prompt("Fanni o'zgartiring : ");
        editBtn("http://localhost:9090/subject/update/", editId, editValue);
    }
})

