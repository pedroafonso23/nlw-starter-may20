function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then( res => res.json() )
        .then( states => {
            for( state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('[name=city]')
    const stateInput = document.querySelector('[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(url)
        .then( res => res.json() )
        .then( cities => {
            citySelect.innerHTML = ''

            for( city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)


// ITENS DE COLETA

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let selectedItems = []  // Comeca vazia pq qnd entra na pagina nao tem nenhum item de coleta selecionado

function handleSelectedItem(event) {
    
    const itemLi = event.target
    
    // Toggle class
    itemLi.classList.toggle('selected')

    const itemId = item.li.dataset.id

    // Verificar se existem itens selecionados
    // Se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => item == itemId )

    // Se ja estiver selecionado, tirar da selecao
    if ( alreadySelected != -1 ) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )

        selectedItems = filteredItems
    } else {
        // Se nao estiver selecionado, adicionar a selecao
        selectedItems.push(itemId)
    }

    // Update o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}