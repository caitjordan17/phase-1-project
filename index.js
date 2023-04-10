//forEach           !
//event listeners
    //click
    //submit        !
    //mouseenter    !

const form = document.querySelector('.search-by-city');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('event:', event);
    const searchResult = document.querySelector('#search').value
    const citySplit = searchResult.split(' ')
    const city = citySplit.join('_')
    fetch(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=100`)
    .then(response => response.json())
    .then(response => {
        console.log('response:', response)
        const breweryCards = document.querySelector('#brewery-cards')
        breweryCards.innerHTML = ''
        response.forEach(brewery => showBrewery(brewery));
    })
})

let submit = document.querySelector('#submit')
submit.addEventListener('mouseenter', (event) => {
    event.target.style.backgroundColor = '#ffde5c';
    console.log(event.target)
    setTimeout(() => {
        event.target.style.backgroundColor = '#344d66'
    }, 1000);
},
false
);

document.addEventListener('click', (event) => {
    if (event.target.type === 'button') {
    console.log(event.target.type)
    breweryName = event.target.parentElement.id;
    console.log('parent:', event.target.parentElement.id)
    addBreweryToList(breweryName);
    }
})

function addBreweryToList(breweryName){
    const favoriteBreweries = document.querySelector('#brewery-list')
    const div = document.createElement('div');
    div.classList.add('fav-card');
    const h1 = document.createElement('h1');
    h1.textContent = breweryName

    div.append(h1)
    favoriteBreweries.append(div)
}

function showBrewery(brewery){
    const breweryCardCollection = document.querySelector('#brewery-cards');
    const div = document.createElement('div');
    div.classList.add('card');
    div.setAttribute('id', brewery.name)
    const h1 = document.createElement('h1');
    h1.textContent = brewery.name;
    const type = document.createElement('h3');
    type.textContent = brewery.brewery_type
    const img = document.createElement('img');
    img.src = 'https://icons-for-free.com/iconfiles/png/512/beer-131982518583696551.png'
    img.classList.add('card-img')
    const street = document.createElement('h3');
    street.textContent = brewery.street
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.textContent = 'Visited'

    
    div.append(h1, type, img, street, btn);
    breweryCardCollection.append(div);
}