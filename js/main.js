let addBtn = document.querySelector("#add-btn"),
    noteTitle = document.querySelector("#title-field"),
    noteBody = document.querySelector("#text-field"),
    modalText = document.querySelector(".modal-text"),
    noNotes = document.querySelector(".hide-text"),
    allNotes = document.querySelector(".all-notes"),
    displayName = document.querySelector("#user-name"),
    formDiv = document.querySelector("#form-div")
    noteHeading = document.querySelector("#note-header"),
    helpDiv = document.querySelector("#help-center"),
    
    // nav buttons
    notesPage = document.querySelector("#notes-page"),
    newNote = document.querySelector("#new-note"),
    notesDiv = document.querySelector("#notes-div"),
    archive = document.querySelector("#archive"),
    help = document.querySelector("#help")
   
     


window.addEventListener("load", () =>{

    // function to get user name
    let userName = localStorage.getItem('userName')
    // let userName = localStorage.getItem('userName') || '';
    // userName = prompt('what should we call you');
    // if(userName){
    //     localStorage.setItem('userName' , userName)
    // }
    if(userName == null){
        userName = prompt('what should we call you');
        localStorage.setItem('userName' , userName)
    }else {
        userName = localStorage.getItem('userName');
    }
    displayName.innerHTML = userName;
    helpCenter()
})

//to add a new note from form and save to local storage
addBtn.addEventListener("click", (e) =>{
     
    if(noteTitle.value == ""){
        modalText.innerHTML = "Add a Title";
        modalText.classList.add("text-danger");
    }
    else if(noteBody.value == ""){
        modalText.innerHTML = "Note cannot be empty";
        modalText.classList.add("text-danger");
    }
    else if(noteTitle.value == "" || noteBody.value == ""){
        modalText.innerHTML = "please fill out the fields";
        modalText.classList.add("text-danger");
    }
    // else{
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

  showNotes();
})


//function to display notes
function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes == ""){
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
        // console.log(notesObj)
    }

    let html = " ";
    notesObj.forEach(function(element, index){        
        html += `
        <div class="col-md-6 mt-2">
            <div class="card">
                <div class="card-header fs-6 fw-bold text-uppercase d-flex justify-content-between bg-warning text-white">
                    ${element.title}<button id="${index}" onclick="archiveNote(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg></button>
                </div>
                <div class="card-body">
                    <p class="card-text">${element.body}</p>
                </div>
                <div class="text-end p-2">
                    <button id="${index}" class="btn-success">EDIT</button>
                    <button id="${index}" class="btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal${index}">DELETE</button>
                </div>
            </div>
        </div>
        
        <div class="modal" id="exampleModal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text">
                <h5 class="text-center pt-4 modal-text text-danger">Are you sure you want to delete</h5>
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
    localStorage.setItem("notes", JSON.stringify(notesObj));
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

help.addEventListener("click", () => {
    helpDiv.classList.remove("hide");
    formDiv.classList.add("hide");
    noteHeading.classList.add("hide");
    })


// function for archived notes
// function archiveNote(){
//     archive = localStorage.getItem("archive");

//         if(archive == null){
//             archiveObj = [];
//         }else{
//             archiveObj = JSON.parse(archive);
//         }
//     archiveObj.push(index);
//     localStorage.setItem("archive", JSON.stringify(archiveObj));
    // showNotes();
//     console.log(archiveObj);
// }
showNotes()
