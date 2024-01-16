function deleteBtn(url, id, render) {
    fetch(url + id, {
        method: "DELETE"
    }).then((res) => res.json()).then((data) => {
        console.log(data);
        render;
    })
}

