function populateUFs() {
    const uFSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => res.json() )
    /* .then( (res) => { return res.json() }) */
    .then( states => {

        for( const state of states) {
            uFSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
            /*uFSelect.innerHTML = uFSelect.innerHTML + `<option value ="1">Valor</}option>`*/
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue  = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( (res) => res.json() ) /* .then( (res) => { return res.json() }) */
    .then( cities => {

        for( const city of cities) {
            citySelect.innerHTML += `<option value ="${city.id}">${city.nome}</option>` /*uFSelect.innerHTML = uFSelect.innerHTML + `<option value ="1">Valor</}option>`*/
        }
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)





    