let addBtn = document.querySelector("#add-btn"),
    noteTitle = document.querySelector("#title-field"),
    noteBody = document.querySelector("#text-field"),
    modalText = document.querySelector(".modal-text"),
    noNotes = document.querySelector(".hide-text"),
    allNotes = document.querySelector(".all-notes"),
    // modalText = document.querySelector(".modal-text"),
    displayName = document.querySelector("#user-name"),
    deleteBtn = document.querySelector("#delete-btn")
    
    // const displayName = document.querySelector("#user-name")


window.addEventListener("load", () =>{

    // function to get user name
    let userName = localStorage.getItem('userName')
    // let userName = localStorage.getItem('userName') || '';
    // userName = prompt('what should we call you');
    // if(userName){
    //     localStorage.setItem('userName' , userName)
    // }
    if(userName == "null"){
        userName = prompt('what should we call you');
        localStorage.setItem('userName' , userName)
    }else {
        userName = localStorage.getItem('userName');
    }
    displayName.innerHTML = userName;
    
  
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
    else if (noteTitle.value == "" || noteBody.value == ""){
        modalText.innerHTML = "please fill out the fields";
        modalText.classList.add("text-danger");
    }else{
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
        //   console.log(noteObj);
    }
    
  
  showNotes();
})

//function to display notes
function showNotes(){
    let notes = localStorage.getItem("notes");

    if(notes == null){
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function(element, index){
        html += `
        <div class="col-md-6 mt-2">
            <div class="card">
                <div class="card-header fs-6 fw-bold text-uppercase">${element.title}</div>
                <div class="card-body">
                    <p class="card-text">${element.body}</p>
                </div>
                <div class="text-end p-2">
                    <button id="${index}" class="btn-success">EDIT</button>
                    <button id="${index}" class="btn-danger"   data-bs-toggle="modal" data-bs-target="#exampleModal${index}">DELETE</button>
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
showNotes();

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
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    
}
    


