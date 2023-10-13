const renderProd = function (arrayOfprod) {
    const row = document.getElementById('row')
  
    arrayOfprod.forEach((prod) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-sm-6', 'col-md-3')
      newCol.innerHTML = `
      <div class="card mt-2">
          <img src="${prod.imageUrl}" class="card-img-top" alt="generic concert picture">
          <div class="card-body">
              <h5 class="card-title">${prod.name}</h5>
              <p class="card-text">${prod.description}</p>
              <a href="./dettagli.html?prodId=${prod._id}" class="btn btn-outline-warning">DETTAGLI</a>
          </div>
      </div>
      `
      row.appendChild(newCol)
    })
  }

  const getEvents = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmEwYzEzOWM0MzAwMTg4MTQ1ODAiLCJpYXQiOjE2OTcxODQyNjksImV4cCI6MTY5ODM5Mzg2OX0.E7B3gTP19q4MM485N-91XCbE3jfXNZzAyw0YmKrfAiM"
        }})

        .then((res) => {
            hideSpinner()
        if (res.ok) {
            console.log(res)
          return res.json()
        } else {
          throw new Error('Errore nel contattare il server')
        }
      })
      .then((events) => {
        console.log('EVENTS', events)
         renderProd(events)
      })
      .catch((err) => {
        console.log('Si è verificato un errore:', err)
        hideSpinner()
      })
  }
  
  getEvents()

const hideSpinner = function () {
    const spinner = document.getElementById('spinner')
    spinner.classList.add('d-none')
}




