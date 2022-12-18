import {menuArray} from "/data.js"
let totalPrice = 0 ;
document.addEventListener('click', (e) => {
    if(e.target.dataset.id){
        addItemstoOrder(e.target.dataset.id)
    }else if(e.target.id == 'remove-btn'){
        handleRemovebtn(e.target)
    }else if(e.target.id == 'order-btn'){
        document.getElementById('popup').style.display = 'flex'
    }else if(e.target.id == "pay-btn"){
        e.preventDefault()

        let inputfullName = document.getElementById('fullName').value
        document.getElementById('order-section').classList.add('hidden')

        document.getElementById('popup').style.display = 'none'
        document.getElementById('thanks-section').style.display = 'block'
        document.querySelector('.thanks-section p').textContent = `Thanks, ${inputfullName}! Your order is on its way!`
    }
})




function handleRemovebtn(itemElement){
    itemElement.parentElement.style.display = 'none'
    let chosenItem = menuArray.filter(item => {
        return itemElement.previousSibling.textContent === item.name
    })[0]
    totalPrice -= chosenItem.price
    render()
}


function addItemstoOrder(itemId){
    
    document.getElementById('order-section').classList.remove('hidden')
    let chosenItem = menuArray.filter(item => {
        return itemId === item.id
    })[0]
    totalPrice += chosenItem.price
 
    let orderList = `
 
        <div class="my-order">
            <h5>${chosenItem.name}</h5><span class='remove-btn' id="remove-btn">remove</span>
            <p class="price">$${chosenItem.price}</p>
        </div>
   
`

document.getElementById('orders-items').innerHTML += orderList
render()
}

function displayMenu(){
    let menuItems = ''
    menuArray.forEach(item => {
 
        menuItems += `
        <div class="item">
            <span class="emoji">${item.emoji}</span>
            <div class="details">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-ing">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <i class="fa-solid fa-circle-plus" data-id='${item.id}'></i>
        </div>
        `
    })
    return menuItems
}

function render(){
    document.getElementById('items').innerHTML = displayMenu()
    document.getElementById('total-price').textContent = `$${totalPrice}`

}

render()