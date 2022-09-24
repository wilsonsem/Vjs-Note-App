let addBtn = document.querySelector("#add-btn"),
    noteTitle = document.querySelector("#title-field"),
    noteBody = document.querySelector("#text-field"),
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
    
}) 