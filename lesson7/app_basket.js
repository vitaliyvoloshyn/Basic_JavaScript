let div_cards
let div_basket_cardProduct
let div_photo
let img
let div_header_name
let div_header_price
let div_header_count
let div_header_sum
let div_btn_del
let btn_delete
let div_name_prod
let p_name_prod
let div_price_prod
let p_price_prod
let div_count_prod
let p_count_prod
let div_sum
let p_sum
const body = document.querySelector('body')
let basketProd = []
let basket_text = document.querySelector('.basket_text')
let btn_create_order
const btn_next1 = document.createElement('button')
const btn_next2 = document.createElement('button')
const div_personal_info = document.querySelector('.personal_info')
const div_delivery_info = document.querySelector('.delivery_info')
const div_final_info = document.querySelector('.final_info')


function from_localStorage(){
    let res = JSON.parse(localStorage.getItem('basket'))
    return res || []
}
function textBasket(){
    if (basketProd.length == 0){
        return 'Корзина пуста'
    } else {
        return `Добавлено ${totalProds()} товаров на сумму ${totalPrice()} руб.`
    }
}

function totalProds(){
    let res = 0
    for (i in basketProd){
        res += basketProd[i].count
    }
    return res
}
function totalPrice(){
    let res = 0
    for (i in basketProd){
        res += basketProd[i].count * basketProd[i].price
    }
    return res
}

function delProd(id){
    for (i in basketProd){
        if (id == basketProd[i].id){
            basketProd.splice(i, 1)
        }
    }
}

function drawCards(){
    if (div_cards != undefined){
        div_cards.parentNode.removeChild(div_cards)
        div_cards = undefined
    }
    div_cards = document.createElement('div')
    div_cards.classList.add('div_cards')
    body.append(div_cards)

    for (i in basketProd) {
        div_basket_cardProduct = document.createElement('div')
        div_basket_cardProduct.classList.add('basket_cardProduct')
        div_photo = document.createElement('div')
        div_photo.classList.add('photo')
        div_header_name = document.createElement('div')
        div_header_name.textContent = 'Товар'
        div_header_name.classList.add('header_name')
        div_header_price = document.createElement('div')
        div_header_price.textContent = 'Цена'
        div_header_price.classList.add('header_price')
        div_header_count = document.createElement('div')
        div_header_count.classList.add('header_count')
        div_header_count.textContent='Количество'
        div_header_sum = document.createElement('div')
        div_header_sum.classList.add('header_sum')
        div_header_sum.textContent = 'Сумма'
        div_name_prod = document.createElement('div')
        div_name_prod.classList.add('div_name_prod')
        div_price_prod = document.createElement('div')
        div_price_prod.classList.add('div_price_prod')
        div_count_prod = document.createElement('div')
        div_count_prod.classList.add('div_count_prod')
        div_sum = document.createElement('div')
        div_sum.classList.add('div_sum')
        div_btn_del = document.createElement('div')
        img = document.createElement('img')
        img.classList.add('photoProduct')
        btn_delete = document.createElement('button')
        btn_delete.setAttribute('data-id', basketProd[i].id)
        btn_delete.classList.add('btn_del')
        btn_delete.textContent = "Удалить товар"
        p_name_prod = document.createElement('p')
        p_name_prod.classList.add('name_prod')
        p_price_prod = document.createElement('p')
        p_price_prod.classList.add('price_prod')
        p_count_prod = document.createElement('p')
        p_count_prod.classList.add('count_prod')
        p_sum = document.createElement('p')
        p_sum.classList.add('sum')

    
        div_cards.append(div_basket_cardProduct)
        div_basket_cardProduct.append(div_photo)
        div_photo.append(img)
        div_basket_cardProduct.append(div_header_name)
        div_basket_cardProduct.append(div_header_price)
        div_basket_cardProduct.append(div_header_count)
        div_basket_cardProduct.append(div_header_sum)
        div_basket_cardProduct.append(div_btn_del)
        div_btn_del.appendChild(btn_delete)
        div_basket_cardProduct.append(div_name_prod)
        div_name_prod.append(p_name_prod)
        div_basket_cardProduct.append(div_price_prod)
        div_price_prod.append(p_price_prod)
        div_basket_cardProduct.append(div_count_prod)
        div_count_prod.append(p_count_prod)
        div_basket_cardProduct.append(div_sum)
        div_sum.append(p_sum)

        img.setAttribute('src', basketProd[i].photo)
        p_name_prod.textContent = basketProd[i].name
        p_price_prod.textContent = basketProd[i].price
        p_count_prod.textContent = basketProd[i].count
        p_sum.textContent = basketProd[i].price * basketProd[i].count
    }
    btn_create_order = document.createElement('button')
    btn_create_order.textContent = ('Оформить заказ')
    btn_create_order.setAttribute('id', 'create_order')
    div_cards.append(btn_create_order)

}
body.addEventListener('click', function (e){
    if (e.target.tagName = 'BUTTON'){
        if(e.target.classList[0] == 'btn_del'){
            delProd(e.target.dataset.id)
            drawCards()
            basket_text.textContent = textBasket()
            localStorage.setItem('basket', JSON.stringify(basketProd))
        }else if (e.target.id == 'create_order'){
            div_cards.classList.toggle('unvisible')
            div_personal_info.classList.toggle('visible_block')
        }else if (e.target.id == 'back1'){
            div_personal_info.classList.toggle('visible_block')
            div_cards.classList.toggle('unvisible')
        }else if (e.target.id == 'next1'){
            div_personal_info.classList.toggle('visible_block')
            div_delivery_info.classList.toggle('visible_block')
        }else if (e.target.id == 'back2'){
            div_personal_info.classList.toggle('visible_block')
            div_delivery_info.classList.toggle('visible_block')
        }else if (e.target.id == 'next2'){
            div_delivery_info.classList.toggle('visible_block')
            div_final_info.classList.toggle('visible_block')
            basketProd = []
            basket_text.textContent = textBasket()
            localStorage.setItem('basket', JSON.stringify(basketProd))
        }else if (e.target.id == 'backInCatalog'){
            window.location.href = 'index.html'
        }
    }
})

basketProd = from_localStorage()
basket_text.textContent = textBasket()
drawCards()
