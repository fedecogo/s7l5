const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get('imageId');
console.log(eventId)

if (eventId) {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + eventId, {

        method: 'PUT',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmEwYzEzOWM0MzAwMTg4MTQ1ODAiLCJpYXQiOjE2OTcxODQyNjksImV4cCI6MTY5ODM5Mzg2OX0.E7B3gTP19q4MM485N-91XCbE3jfXNZzAyw0YmKrfAiM"
         },
    })
      .then((res) => {
        if (res.ok) {
         
          return res.json()
        } else {
          throw new Error('ERRORE NEL RECUPERO DETTAGLIO')
        }
      })
      .then((productDetail) => {
        const nameInput = document.getElementById('name')
        const descriptionInput = document.getElementById('description')
        const brandInput = document.getElementById('brand')
        const UrlImgInput = document.getElementById('img')
        const priceInput = document.getElementById('price')

        nameInput.value = productDetail.name
        descriptionInput.value = productDetail.description
        brandInput.value = productDetail.brand
        UrlImgInput.value = productDetail.imageUrl
        priceInput.value = productDetail.price
    })
      .catch((err) => {
        console.log('errore', err)
      })
  }
// form e riferimenti
const form = document.getElementById('form')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const nameInput = document.getElementById('name')
    const descriptionInput = document.getElementById('description')
    const brandInput = document.getElementById('brand')
    const UrlImgInput = document.getElementById('img')
    const priceInput = document.getElementById('price')


    const newProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: UrlImgInput.value,
        price: priceInput.value,
    }

    fetch('https://striveschool-api.herokuapp.com/api/product/', {

        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI4ZmEwYzEzOWM0MzAwMTg4MTQ1ODAiLCJpYXQiOjE2OTcxODQyNjksImV4cCI6MTY5ODM5Mzg2OX0.E7B3gTP19q4MM485N-91XCbE3jfXNZzAyw0YmKrfAiM"
         },
    })

        .then((res) => {
        
            if (res.ok) {
                console.log('Inviato', res)
            }
            else {
                throw new Error
            }
        })
        
        .catch((err) => {
            console.log('errore', err)
        })
})