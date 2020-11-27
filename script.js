const getFoto = document.querySelector('.worker_foto')
const getName = document.querySelector('#name')
const getDate = document.querySelector('#date')
const getPosition = document.querySelector('#position')

const newFoto = document.querySelector('#photo')
const newName = document.querySelector('#name')
const newDate = document.querySelector('#number')
const newPosition = document.querySelector('#position')

const popup = document.querySelector('#new_window')
const addMemberBtn = document.querySelector('.button_add_worker')
const span = document.querySelector('.exit')
const submit = document.querySelector('#submit')

var link = "https://my-json-server.typicode.com/viktorturchenko/jsonplaceholder/users/"


fetch(link)
    .then((response) => response.json())
    .then(json => {
        for (var i = 0; i < json.length; i++) {
            var button = document.createElement("button")
            button.id = i + 1
            button.className = "member_button"
            button.onclick = function() {reply_click(this.id);}
            button.innerHTML = json[i].name
            var selectPanel = document.querySelector(".list_of_workers")
            selectPanel.appendChild(button)
            document.querySelector(".list_of_workers").style.borderRight = "0px solid rgb(121, 90, 90)"
        }
    })


const reply_click = (clicked_id) => {
    link += clicked_id
}

// get user info from JSON Placeholder and show it on page
$(document).on("click", ".member_button", function() {
    fetch(link)
    .then((response) => response.json())
    .then(json => {
        getFoto.src = json.foto
        getName.innerHTML = json.name
        getDate.innerHTML = json.date
        getPosition.innerHTML = json.position
        link = "https://my-json-server.typicode.com/viktorturchenko/jsonplaceholder/users/"
        document.querySelector('.infoworker').style.opacity = 1;
    })
})

// clear all inputed values
const clearInput = () => {
    newFoto.value = ""
    newName.value = ""
    newDate.value = ""
    newPosition.value = ""
}

// display addmember_popup block
addMemberBtn.addEventListener('click', () => {
    clearInput()
    popup.style.display = "block"
})

// close addmember_window block and clear all inputed values
span.addEventListener("click", () => {
    popup.style.display = "none"
    clearInput()
})

// add FAKE new member by creating new user in JSON Placeholder data, display the result of adding by console.log
const addNewMember = () => {
    console.log("Input data: " + newFoto.value + ", " + newName.value + ", " + newDate.value + ", " + newPosition.value)
    fetch(link, {
        method: 'POST',
        body: JSON.stringify({
            name: newName.value,
            date: newDate.value,
            position: newPosition.value,
            foto: newFoto.value
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        console.log("response: " + JSON.stringify(json))
    })
}

// add new member button on the page
const addMemberHTMLcontent = () => {
    fetch(link)
        .then((response) => response.json())
        .then(json => {
            var button = document.createElement("button")
            button.id = json.length + 1
            button.className = "member_button"
            button.onclick = function() {reply_click(this.id);}
            button.innerHTML = newName.value
            var selectPanel = document.querySelector(".members_list")
            selectPanel.appendChild(button)
        })
}

// submit button check
submit.addEventListener("click", e => {
    e.preventDefault
    if (!newFoto.value) {
        e.preventDefault
        newFoto.style.backgroundColor = "orange"
    } else {
        newFoto.style.backgroundColor = "white"
    }

    if (!newName.value) {
        e.preventDefault
        newName.style.backgroundColor = "orange"
    } else {
        newName.style.backgroundColor = "white"
    }

    if (!newDate.value) {
        e.preventDefault
        newDate.style.backgroundColor = "orange"
    } else {
        newDate.style.backgroundColor = "white"
    }

    if (!newPosition.value) {
        e.preventDefault
        newPosition.style.backgroundColor = "orange"
    } else {
        newPosition.style.backgroundColor = "white"
    }

    if (newFoto.value && newName.value && newDate.value && newPosition.value) {
        e.preventDefault
        addNewMember()
        addMemberHTMLcontent()
        popup.style.display = "none"
    }
})