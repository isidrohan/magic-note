console.log("hello this is javascript file");
showNotes();

// trying to add heading in magic note

// let addHeading = document.getElementById('addHeading');
// // addHeading.addEventListener('click',function(){
// //     addHeading.innerText = "";
// // })
// addHeading.addEventListener('click' , function(){
// addHeading.value =  "";

//     let noTextArea = document.getElementsByClassName('textarea').length;
//     if(noTextArea==0){

//         let html = addHeading.innerHTML
//         addHeading.innerHTML = `<textarea class="textarea form-control" id="textarea" rows="3">${html}</textarea>`;
//         console.log(noTextArea)

//     }
// })

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addtitle = document.getElementById('addtitle');
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes)
    }

    let myObj = {
        title: addtitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addtitle.value = "";
    addText.value = "";

    showNotes();
    console.log(notesObj);

});

// function to show elements form local storage
function showNotes() {
    let notes = localStorage.getItem("notes");;
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes)
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.text}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div>`;
    });

    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `nothing to show! use "Add a Note" section above to add notes.`;
    }
}


// function to delete notes

function deleteNote(index) {
    console.log('i am deleting', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];

    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// scripting for search bar 
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function () {

    let inputVal = searchText.value.toLowerCase();
    console.log("input event fired", inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if (cardText.includes(inputVal)) {
            element.style.display = "block";

        }
        else {
            element.style.display = "none";
        }
    })
})
