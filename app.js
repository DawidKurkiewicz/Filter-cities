const endpoint = ['https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',"pl.json"]


for(var i =0; i<2; i++){
const searchInput = document.querySelectorAll(".search")[i]
const suggestions = document.querySelectorAll(".suggestions")[i]
searchInput.addEventListener("change", displayMatches)
searchInput.addEventListener("keyup", displayMatches)
    const cities = [];
    fetch(endpoint[i])
    .then(blob => blob.json())
    .then(data => cities.push(...data))
    function findMatches(wordToMatch, cities){
        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, "gi")
            return place.city.match(regex) || place.state.match(regex)
        })
    }
    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.')
    }
    function displayMatches(){
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place =>{
        const regex = new RegExp(this.value,"gi");
        const cityName = place.city.replace(regex,`<span class="highlight">${this.value}</span>`)
        const stateName = place.state.replace(regex,`<span class="highlight">${this.value}</span>`)
        if(place.population==""){
            return  `
            <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">Population: unknown</span>
            </li>`
        } else {
            return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">Population:${numberWithCommas(place.population)}</span>
        </li>`
        }
    }).join("")
    suggestions.innerHTML = html
    if(searchInput.value ==""){
        suggestions.innerHTML = ` <li>Filter for a city</li>
          <li>or a state</li>`
    }
    }
}
