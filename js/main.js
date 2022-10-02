let addBtn = document.querySelector("#add-btn"),
    noteTitle = document.querySelector("#title-field"),
    noteBody = document.querySelector("#text-field"),
    alertText = document.querySelector("#alert-text"),
    noNotes = document.querySelector(".hide-text"),
    allNotes = document.querySelector(".all-notes"),
    displayName = document.querySelector("#user-name"),
    formDiv = document.querySelector("#form-div")
    noteHeading = document.querySelector("#note-header"),
    helpDiv = document.querySelector("#help-center"),
    alertDiv = document.querySelector(".alert-div"),
    titleHead = document.querySelector(".title-head"),
    
    
    
    // nav buttons
    notesPage = document.querySelector("#notes-page"),
    newNote = document.querySelector("#new-note"),
    notesDiv = document.querySelector("#notes-div"),
    archive = document.querySelector("#archive"),
    help = document.querySelector("#help"),

   
     


window.addEventListener("load", () =>{

    // function to get user name
    let userName = localStorage.getItem('userName')

    if(userName == null){
        userName = prompt('what should we call you');
        localStorage.setItem('userName' , userName)
    }else {
        userName = localStorage.getItem('userName');
    }
    displayName.innerHTML = userName;
    helpCenter();
    hideAlert ();

    // notes
    let notes = localStorage.getItem("notes");
        if(notes == ""){
            noNotes.classList.add("show-text");
        }

})

//to add a new note from form and save to local storage
addBtn.addEventListener("click", (e) =>{
    hideAlert();
     
    if(noteTitle.value == "" && noteBody.value == ""){
        alertText.innerHTML = " Please fill out the fields";
    }
    else if(noteBody.value == ""){
        // alertDiv.classList.remove("hide");
        alertText.innerHTML = " Note cannot be blank";;
    }
    else if(noteTitle.value == ""){
        // alertDiv.classList.remove("hide");
        alertText.innerHTML = "  Title cannot be blank ";
    }
    else if(noteTitle.value && noteBody.value){

        let notes = localStorage.getItem("notes");
        if (notes == null) {
            noteObj = [];
        } else {
            noteObj = JSON.parse(notes);
        }
        let note = {
            title: noteTitle.value,
            body: noteBody.value
        }
        noteObj.push(note);
        localStorage.setItem("notes", JSON.stringify(noteObj));
          noteTitle.value = "";
          noteBody.value = "";
          console.log(noteObj);
          alertText.innerHTML = "  Title cannot be blank ";
    }
  showNotes();
})


//function to display notes
function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes == ""){
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }

    let html = " ";
    notesObj.forEach(function(element, index){        
        html += `
        <div class="col-md-6 mt-2">
            <div class="card">
                <div class="card-header fs-6 fw-bold text-uppercase d-flex justify-content-between bg-warning text-white">
                    <h6 class
                    title-head>${element.title}</h6><button id="${index}" onclick="archiveNote(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg></button>
                </div>
                <div class="card-body">
                    <p class="card-text">${element.body}</p>
                </div>
                <div class="text-end p-2">
                    <button id="${index}" onclick = "editNote(this.id)" class="btn-success">EDIT</button>
                    <button id="${index}" class="btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal${index}">DELETE</button>
                </div>
            </div>
        </div>
        
        <div class="modal" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text">
                <h5 class="text-center pt-4 text-danger">Are you sure you want to delete</h5>
                <div class="text-center p-2">
                    <button type="button" id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger delete-btn" data-bs-dismiss="modal">YES</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">NO</button>
                </div>
            </div>
        </div>
    </div>`;

    });

    let allNotes = document.querySelector(".all-notes");
    if(notesObj.length != 0){
        allNotes.innerHTML = html;
    }else{
        noNotes.classList.add("show-text");
    }
}


// delete a note
function deleteNote(index){

    if(index){
        let notes = localStorage.getItem("notes");

        if(notes == null){
            notesObj = [];
        }else{
            notesObj = JSON.parse(notes);
        }
    }
    let deleted = notesObj.splice(index, 1);
    console.log(deleted)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    console.log(JSON.stringify(notesObj))
    
    // localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
    
// nav buttons
newNote.addEventListener("click", ()=> {
    window.location.reload();
    // helpCenter()
})

notesPage.addEventListener("click", () =>{
    formDiv.classList.add("hide");
    noteHeading.classList.remove("hide");
    notesDiv.classList.remove("hide");
    helpCenter()
    
})
function helpCenter(){
    helpDiv.classList.add("hide");
}
function hideAlert(){
    alertDiv.classList.add("hide");
}

help.addEventListener("click", () => {
    helpDiv.classList.remove("hide");
    formDiv.classList.add("hide");
    noteHeading.classList.add("hide");
    notesDiv.innerHTML = "";
    })



// function editNote(index){
//     console.log("working")
//     titleHead.addEventListener("change", () => {
//         console.log("working2")
//     })


function editNote(index) {
    let notes = localStorage.getItem("notes");

    noteTitle.value = noteBody.value = "";
    addBtn.value = "edit";
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
        noteTitle.value = element.title;
        noteBody.value = element.body;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        // showNotes();
}

// function for archived notes

function archiveNote(index){

    archive = localStorage.getItem("archive");

        if(archive == null){
            console.log("null")
            archiveObj = [];
        }else{
            archiveObj = JSON.parse(archive);
            // console.log(archive)
        }
    // archiveObj.push(index);
    let deleted = notesObj.splice(index, 1);
    console.log(deleted)
    archiveObj.push(deleted);
    localStorage.setItem("archive", JSON.stringify(archiveObj));
    // console.log(JSON.stringify(archiveObj))
    // console.log(JSON.stringify(noteObj))

    // localStorage.setItem("archive", JSON.stringify(archiveObj));
    showNotes();
    console.log(archiveObj);
}

showNotes()
