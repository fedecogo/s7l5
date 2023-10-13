const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get('prodId');
const cleanedEventId = eventId.replace(/class=/gi, '');
console.log(cleanedEventId);



const getEvents = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + cleanedEventId, {
        
    headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmEwYzEzOWM0MzAwMTg4MTQ1ODAiLCJpYXQiOjE2OTcxODQyNjksImV4cCI6MTY5ODM5Mzg2OX0.E7B3gTP19q4MM485N-91XCbE3jfXNZzAyw0YmKrfAiM"
     }})

        .then((res) => {
        if (res.ok) {
            console.log(res)
          return res.json()
        } else {
          throw new Error('Errore nel contattare il server')
        }
      })
      .then((events) => {
        console.log('EVENTS', events)
        dettagli_card(events)
         
      })
      .catch((err) => {
        console.log('Si è verificato un errore:', err)
      })
  }
  
  getEvents()



const dettagli_card = function (prod){
    const row = document.getElementById('row')
    const newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
    newCol.innerHTML = `
    <div class="card">
        <img src="${prod.imageUrl}" class="card-img-top" alt="generic concert picture">
        <div class="card-body">
            <h5 class="card-title">${prod.name}</h5>
            <p class="card-text">${prod.description}</p>
            <p class="card-text">${prod.brand}</p>
            <p class="card-text">${prod.price }</p>

            <button class="btn btn-danger" onclick="deleteEvent()">ELIMINA</button>
            <a href="./index.html?imageId=${cleanedEventId}">
            <button class="btn btn-outline-warning mt-1" onclick="">Modifica</button>
            </a>
            
        </div>
    </div>
    `
    row.appendChild(newCol)
 }
//  funzione per eliminare
const deleteEvent = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + cleanedEventId, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmEwYzEzOWM0MzAwMTg4MTQ1ODAiLCJpYXQiOjE2OTcxODQyNjksImV4cCI6MTY5ODM5Mzg2OX0.E7B3gTP19q4MM485N-91XCbE3jfXNZzAyw0YmKrfAiM"
         },
         method: 'DELETE',}
    )
      .then((res) => {
        if (res.ok) {
          alert('EVENTO ELIMINATO')
          location.assign('./home.html')
        } else {
          alert("Problema con l'eliminazione dell'evento")
          throw new Error('Errore nella DELETE')
        }
      })
      .catch((err) => {
        console.log('ERRORE!', err)
      })
  }