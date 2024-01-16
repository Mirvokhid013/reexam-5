let elGroupForm = document.querySelector(".group__form");
let elGroupSubject = document.querySelector(".group__select-subject");
let elGroupTeacher = document.querySelector(".group__select-teacher");
let elWeekTeacher = document.querySelector(".group__select-week");

getSubject();
getWeek();

function getSubject() {
    fetch("http://localhost:9090/all-teacher?name=", {
    method: "GET",
})
.then(res => res.json())
.then(data => {
    renderSubject(data.data, elGroupSubject)
})
.catch(error => console.log(error));
}

function renderSubject(array, node) {
    node.innerHTML = '';
    array.forEach(item => {
        // console.log(item);
        node.innerHTML += `
        <option value="${item.subjects.id}">${item.subjects.subject_name}</option>
        `
    });
}



elGroupSubject.addEventListener("change", (evt)=>{
    evt.preventDefault();
    
    // console.log(elGroupSubject.value);
    function getTeacher() {
        fetch("http://localhost:9090/all-teacher?name=", {
        method: "GET",
    })
    .then(res => res.json())
    .then(data => {
        // renderTeacher(data.data, elGroupTeacher, elGroupSubject.value)
        elGroupTeacher.innerHTML = '';
        
        const filterArray = data.data.filter(function (item) {
            // console.log(item.subjects);
            // console.log(elGroupSubject.value);
            return item.subjects.id == elGroupSubject.value;
        })
        
        filterArray.forEach(item => {
            // console.log(item);
            elGroupTeacher.innerHTML += `
            <option value="${item.id}">${item.first_name} ${item.last_name}</option>
            `
        })
    })
    .catch(error => console.log(error));
}

getTeacher();
})

function getWeek() {
    fetch("http://localhost:9090/all-week", {
    method: "GET",
})
.then(res => res.json())
.then(data => {
    // console.log(data);
    renderWeek(data.data, elWeekTeacher);
})
.catch(error => console.log(error));
}

function renderWeek(array, node) {
    node.innerHTML = '';
    
    array.forEach(item => {
        // console.log(item);
        node.innerHTML += `
        <option value="${item.id}">${item.week_name}</option>
        `
    })
}

let elGroupStartTime = document.querySelector(".group-start-time");
let elGroupFinishTime = document.querySelector(".group-finish-time");
let elGroupName = document.querySelector(".group-name");

elGroupForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    
    let formData = new FormData();
    formData.append("group_name", evt.target[5].value.toString());
    formData.append("group_time_start", evt.target[3].value.toString());
    formData.append("group_time_stop", evt.target[4].value.toString());
    formData.append("subject_id", evt.target[0].value.toString());
    formData.append("week_id", evt.target[1].value.toString());
    formData.append("teacher_id", evt.target[2].value.toString());
    
    console.log(elGroupName.value, elGroupStartTime.value, elGroupFinishTime.value, elGroupSubject.value, elWeekTeacher.value, elGroupTeacher.value);
    postGroup(formData);
    
})


function postGroup(forma) {
    fetch("http://localhost:9090/group/create", {
    method: "POST",
    body: forma,
}).then(res => res.json())
.then((data)=>{
    console.log(data);
})
.catch(error => console.log(error))
}

