function ordenaPorNome(x,y) {
    return ((x.nome == y.nome) ? 0 : ((x.nome > y.nome) ? 1 : -1 ));
}

function populateUFs() {
    const ufSelect = document.querySelector("[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
        .then( states => {
            states.sort(ordenaPorNome);
            for( state of states) {
                ufSelect.innerHTML += '<option value="'+state.id+'">'+state.nome+'</option>';
            }
            
        })
}



populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state]");
    citySelect.innerHTML="<option value>Selecione a cidade</option>";
    citySelect.disabled = true;
    stateInput.value = event.target.options[event.target.selectedIndex].text;
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+event.target.value+"/municipios")
        .then( res => res.json())
        .then( cities => {
            for( city of cities) {
                citySelect.innerHTML += '<option value="'+city.nome+'">'+city.nome+'</option>';
            }
            citySelect.disabled = false;
        })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

// array com itens selecionados
let selectedItems = [];

//input hidden com valores dos itens selecionados
const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event) {
    const itemLi = event.target;
    const itemId = itemLi.dataset.id;
    itemLi.classList.toggle("selected");
    addOrRemove(selectedItems, itemId);

    // alimenta o input hidden com os valores atuais do array
    collectedItems.value = selectedItems;
}

// função para adicionar item no array se não existir ou remover se existir
function addOrRemove(array, value) {
    var index = array.indexOf(value);
    index === -1 ? array.push(value) : array.splice(index, 1);
}