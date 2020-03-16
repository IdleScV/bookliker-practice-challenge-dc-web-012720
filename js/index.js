document.addEventListener("DOMContentLoaded", pageSetup);

function pageSetup() {
    console.log("We are connected")
    getBooksList()
    let currentUser = "1"
}

function getBooksList() {
    console.log("Getting Books");
    fetch("http://127.0.0.1:3000/books")
        .then(response => response.json())
        .then(json => json.forEach(book => processBookData(book)))
}

function processBookData(book) {
    // console.log(book)
    let uList = document.querySelector("#list")


    let newLi = document.createElement('li')
    let title = document.createElement('h2')
    title.innerText = book.title




    newLi.append(title)
    newLi.addEventListener("click", showBookStuff)
    newLi.id = book.id
    uList.append(newLi)
}

function showBookStuff(event) {
    let bookId = event.currentTarget.id

    fetch(`http://localhost:3000/books/${bookId}`)
        .then(resp => resp.json())
        .then(resp => renderBookTemplate(resp))

}

function renderBookTemplate(book) {

    let showPanel = document.querySelector('#show-panel')
    showPanel.style.display = 'inline'
    showPanel.innerHtml = ""

    let userList = document.querySelector("#users")
    userList.innerHTML = ''

    let titleHead = document.querySelector('#title')
    let image = document.querySelector('#image')
    let description = document.querySelector('#description')
    let button = document.querySelector(".book-like")
    book.users.forEach(bookFan => showUser(bookFan))

    button.id = book.id
    button.addEventListener('click', (e) => { like(e, book) })
    titleHead.innerText = book.title
    image.src = book.img_url
    description.innerText = book.description
}

function showUser(userData) {
    let userList = document.querySelector("#users")
    let user = document.createElement("li")
    user.innerText = userData.username
    userList.append(user)
}



function like(event, bookData) {
    // debugger;
    console.log(bookData.users)
    let bookId = event.target.id
    let oldUsers = bookData.users
    let newUser = {
        "id": 1,
        "username": "pouros"
    }
    oldUsers.push(newUser)
    // debugger
    let payload = JSON.stringify({ "users": _.uniq(oldUsers) })
    fetch(`http://localhost:3000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },

        body: payload

    })




    fetch("http://localhost:3000/users/1").then(
        response => response.json()
    ).then(user => showUser(user))
}



