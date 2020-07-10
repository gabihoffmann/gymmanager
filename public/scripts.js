
const currentPage = window.location.pathname
const menuItens = document.querySelectorAll('header .links a')

for (item of menuItens){
    const id = item.getAttribute('id')
 
    if(currentPage.includes(id)){
        item.classList.add('active')
    }
}

const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener("submit", event => {
    const confirmation = confirm("Deseja deletar?")

    if(!confirmation) {
        event.preventDefault()
    }

})