const movieForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')





movieForm.addEventListener('submit', (e) => {
    // Handle Errors
    e.preventDefault()

    const title = search.value
    messageOne.textContent = 'Ladataan tietoja...'
    messageTwo.textConntent = ''

    fetch(`movies/data?type=movie&id=137220`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Tapahtui virhe... Perkele...'
            } else {
                messageOne.textContent = data.title
                messageTwo.textContent = data.short_description
            }
        })
    })
})