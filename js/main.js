let addBtn = document.querySelector("#add-btn"),
    noteTitle = document.querySelector("#title-field"),
    noteBody = document.querySelector("#text-field"),
    modalText = document.querySelector(".modal-text"),
    noNotes = document.querySelector(".hide-text")
    // notes = document.querySelector(".all-notes")
    modalText = document.querySelector(".modal-text")


addBtn.addEventListener("click", () =>{
    console.log("working")
    if(noteTitle.value == ""){
        modalText.innerHTML = "Add a Title";
        modalText.classList.add("text-danger");
    }
    else if(noteBody.value == ""){
        modalText.innerHTML = "Note cannot be empty";
        modalText.classList.add("text-danger");
    }
    else if (noteTitle.value == "" || noteBody.value == ""){
        modalText.innerHTML = "please fill out the fields";
        modalText.classList.add("text-danger");
    }
    
    let notes = "";
        notes = localStorage.getItem(notes);
    if(notes == null){
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title : noteTitle.value,
        body : noteBody.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify());
    noteTitle.value = "";
    noteBody.value = "";

    showNotes();
}) 

// Display Notes on the page

function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index){
        html = `
        <div class="col-md-6 mt-2">
            <div class="card">
                <div class="card-header font-weight-bold">${element.title}</div>
                <div class="card-body">
                    <p class="card-text">${element.body}</p>
                </div>
                <div class="text-end p-2">
                    <button id="${index}" class="btn-success">EDIT</button>
                    <button id="${index}" class="btn-danger">DELETE</button>
                </div>
            </div>
        </div>`;
    });

    let allNotes = document.querySelector("all-notes");
    if(notesObj.length != 0){
        allNotes.innerHTML = html;
    }else{
        noNotes.classList.add("showtext");
    }
}
    showNotes();


