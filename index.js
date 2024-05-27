console.log("Welcome to Notes Diary:");

//For displaying Date
window.onload = initDate;
function initDate() {
    let dt = new Date();
    document.getElementById("date").innerHTML = " " + " " + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
}

//Showing Already present Notes
showNotes();

//Function to add details 
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    } else {
        notesObject = JSON.parse(notes);
    }
    let newData = [addTitle.value, addText.value]
    notesObject.push(newData);
    localStorage.setItem("notes", JSON.stringify(notesObject));
    addTitle.value = "";
    addText.value = "";
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    } else {
        notesObject = JSON.parse(notes);
    }

    //Adding the notes 
    let htmlContent = "";
    console.log(notesObject)
    notesObject.forEach(function (element, index) {
        htmlContent += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <p class="my-2 mx-0 card"> ${element[0]}</p>
                    <hr>
                    <p class="card-text"> ${element[1]}</p>  
                    <hr>      
                    <button id="${index}" class="del" onclick="deleteNote(this.id)" 
                    class="btn btn-primary" >Delete Note</button>
                    </div>
                </div>`;

    });

    let notesElement = document.getElementById("notes");
    if (notesObject.length != 0) {
        notesElement.innerHTML = htmlContent;
    } else {
        notesElement.innerHTML = `Nothing to show! Go add Notes!`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //Extract data from local storage
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObject = [];
    } else {
        notesObject = JSON.parse(notes);
    }

    //Delete data
    notesObject.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObject));

    showNotes();
}

//For searching the notes
let search = document.getElementById('searchText');
search.addEventListener("input", function () {

    let inputValue = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    let arrNote = Array.from(noteCards)
    arrNote.forEach(function (element) {
        //Storing data from title part
        let cardTitle = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        //String data from notes part
        let cardText = element.getElementsByTagName("p")[1].innerText.toLowerCase();

        //Searching the values
        if (cardText.includes(inputValue) || cardTitle.includes(inputValue)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }

    })
})

