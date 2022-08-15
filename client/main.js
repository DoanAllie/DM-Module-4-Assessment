const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const cardContainer = document.querySelector('#card-container')
const deleteBtn = document.querySelector('#delete-btn')
const form = document.querySelector('form')
const inspirationInput = document.querySelector('#inspiration-input')
const imageInput = document.querySelector('#image-input')
const quote = document.querySelector('#quote')
const author = document.querySelector('#author')
const quoteBtn = document.querySelector('#quote-btn')


const baseURL = 'http://localhost:4000'
const errCallback = err => console.log(err)


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get(`${baseURL}/api/fortune/`)
        .then(res => {
            alert(res.data)
        })
        .catch(errCallback)
} 

const getRandomQuote = () => {
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        const randomIndex = Math.floor(Math.random() * (data.length + 1))
        const quoteValue = data[randomIndex].text
        const authorValue = data[randomIndex].author
        quote.textContent = quoteValue
        author.textContent = `– ${authorValue} –`
    })
}

const getAllInspirations = () => {
    axios.get(`${baseURL}/api/inspirations`)
        .then(res => {
            const inspirations = res.data
            displayCard(inspirations)
        })
        .catch(errCallback)
}

const deleteInspiration = (id) => {
    axios.delete(`${baseURL}/api/inspirations/${id}`)
        .then(res => {
            displayCard(res.data)
        })
        .catch(errCallback)
}

const createInspiration = (event) => {
    event.preventDefault()
    const rating = document.querySelector("input[name='rating']:checked")
    const body = {
        inspiration: inspirationInput.value.trim(),
        imageURL: imageInput.value.trim(),
        rating: rating.value
    }
    axios.post(`${baseURL}/api/inspirations/`, body)
        .then(res => {
            displayCard(res.data)
            inspirationInput.value = ''
            imageInput.value = ''
            rating.checked = false
        })
        .catch(errCallback)
}

const updateInspiration = (id, type) => {
    axios.put(`${baseURL}/api/inspirations/${id}`, {type})
        .then(res => {
            displayCard(res.data)
        })
        .catch(errCallback)
}


function createCard(obj) {
    const newCard = document.createElement('div')
    newCard.setAttribute('id', 'card-container')
    newCard.setAttribute('class', 'box2 flex margin-card')
    newCard.innerHTML = `
        <h3>${obj.inspiration}</h3>
        <img class="square-image block" src="${obj.imageURL}" alt="">
        <div id="likes-container" class="center2">
          <button onclick="updateInspiration(${obj.id}, 'minus')" id="minus-btn">-</button>
          <p><span>${obj.rating} </span><i class="fa-solid fa-star"></i></p>
          <button onclick="updateInspiration(${obj.id}, 'plus')" id="plus-btn">+</button>
        </div>
        <button onclick='deleteInspiration(${obj.id})' id="delete-btn" class="block center1">Delete</button>
    `
    document.querySelector('main').appendChild(newCard)
}

function displayCard(arr) {
    document.querySelector('main').innerHTML = ''
    for (let i=0; i < arr.length; i++) {
        createCard(arr[i])
    }
}


complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', createInspiration)
quoteBtn.addEventListener('click', getRandomQuote)

getAllInspirations()
getRandomQuote()