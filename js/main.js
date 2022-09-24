let addBtn = document.querySelector("#add-btn"),
    noteTitle = document.querySelector("#title-field"),
    noteBody = document.querySelector("#text-field"),
    modalText = document.querySelector(".modal-text"),
    noNotes = document.querySelector(".hide-text")
    allNotes = document.querySelector(".all-notes")
    modalText = document.querySelector(".modal-text")
    displayName = document.querySelector("#user-name")
    // const displayName = document.querySelector("#user-name")


window.addEventListener("load", () =>{

    let userName = localStorage.getItem('userName') || '';
    // displayName.innerHTML = userName.toUpperCase();
    userName = prompt('what should we call you');
    // if(userName){
        localStorage.setItem('userName' , userName)
    // }
    displayName.innerHTML = userName;

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
    

    //to add a new note from form and save to local storage
    addBtn.addEventListener("click", (e) =>{
        
        notes = localStorage.getItem("notes")
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
        localStorage.setItem("notes", JSON.stringify(notesObj));
        noteTitle.value = "";
        noteBody.value = "";

        showNotes();
    });


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
                    <div class="text-end p-3">
                        <button id="${index}" class="btn-success">EDIT</button>
                        <button id="${index}" class="btn-danger">DELETE</button>
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
    
})
    


