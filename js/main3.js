const form =document.querySelector("#form")
const noteTitle = document.querySelector("#title-field")
const noteBody = document.querySelector("#text-field")



// window.addEventListener('load', () => {

    let userName = localStorage.getItem('userName') || '';
    displayName.innerHTML = userName.toUpperCase();
    userName = prompt('what should we call you');
    // if(userName){
        localStorage.setItem('userName' , userName)
    // }
    displayName.innerHTML = userName.toUpperCase();
    
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    form.addEventListener('submit' , (e) => {
        e.preventdefault();
        const note = {
            title :noteTitle.value,
            text :noteText.value 
        }

        notes.push(notes);
        localStorage.setItem('notes', JSON.stringify(note));
        console.log(JSON.stringify(note))
    })
// })
