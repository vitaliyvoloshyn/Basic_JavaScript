const body = document.querySelector('body')
let card
let imgProduct
let infoProduct
let nameProduct
let priceProduct
let btn_buy
let buy
const basket_area = document.querySelector('.basket_text')
let modalContainer = document.createElement('div')
let img

// функция-конструктор
function Product(name, price, count, id, photo = []) {
    this.id = id
    this.name = name
    this.price = price
    this.count = count
    this.photo = photo
}

// обьект каталога
let catalog = {
    products: [],
    // метод, добавляющий обьект товара
    addProduct(name, price, count, photo=[]){
        let id
        if (this.products.length == 0){
            id = 1
        } else{
            id = this.products[this.products.length -1].id + 1
        }                          
        this.products.push(new Product(name, price, count, id, photo))
    },
    // метод, предоставляющий инфо о товаре по его id
    infoById(id){                                       
        for(let i = 0; i < this.products.length; i++){
            if(id == this.products[i].id){
                return [this.products[i].name, this.products[i].price, this.products[i].count, this.products[i].photo]
            }
        }
        return null
    },
    popProd(id){
        let res = []
        for(let i = 0; i < this.products.length; i++){
            if(id == this.products[i].id){
                res = [this.products[i].name, this.products[i].price, this.products[i].count]
                if (this.products[i].count > 1){
                    this.products[i].count -= 1
                } else {
                    this.products[i].count = 'Нет в наличии'
                }
                return res
            }
        }
        return null
    }
}

// обьект корзины
let basket = {                                                  
    basketProd: [],
    // метод, добавляющий обьект товара в корзину
    addProd(id){
        for (let i = 0; i < this.basketProd.length; i++){
            if (id == this.basketProd[i].id){
                this.basketProd[i].count += 1
                return
            }
        }
        for (j in catalog.products){
            if (id == catalog.products[j].id){
                this.basketProd.push(new Product(catalog.products[j].name,
                    catalog.products[j].price,
                    1,
                    id,
                    catalog.products[j].photo[0]))
                    return
            }
        }
    },
    
    // метод подсчета общей стоимости товаров в корзине
    totalPrice(){
        return this.basketProd.reduce(function(sum,b) {
            return sum + b.price * b.count
        }, 0 )
    },
    // метод подсчета единиц товара в корзине
    totalProds(){
        return this.basketProd.reduce(function(sum,b) {
            return sum + b.count
        }, 0 )
    },
    // метод удаления товара из корзины
    delProd(name){
        for (i in this.basketProd){
            if (this.basketProd[i].name == name){
                this.basketProd.splice(i, 1)
            }
        }
    }   
}

function drawCard(){
    for (i in catalog.products){
        card = document.createElement('div')
        card.classList.add('cardProduct')
        imgProduct = document.createElement('img')
        imgProduct.setAttribute('src', catalog.products[i].photo[0])
        imgProduct.setAttribute('alt', catalog.products[i].photo[0])
        imgProduct.setAttribute('data-id', catalog.products[i].id)
        imgProduct.classList.add('photoProduct')
        infoProduct = document.createElement('div')
        infoProduct.classList.add('info')
        
        nameProduct = document.createElement('h2')
        nameProduct.classList.add('name')
        nameProduct.textContent = catalog.products[i].name
        priceProduct = document.createElement('p')
        priceProduct.textContent = `Цена: ${catalog.products[i].price} руб.`
        buy = document.createElement('div')
        buy.classList.add('buy')
        btn_buy = document.createElement('button')
        btn_buy.classList.add('btn_buy')
        btn_buy.textContent = "Купить"
        btn_buy.setAttribute('data-id', catalog.products[i].id)

        body.append(card)
        card.append(imgProduct)
        card.append(infoProduct)
        infoProduct.append(nameProduct)
        infoProduct.append(priceProduct)
        card.append(buy)
        buy.append(btn_buy)

    }
}
body.addEventListener('click', function (e){
    if (e.target.tagName == 'BUTTON'){
        if (e.target.classList[0]=='btn_buy'){
            basket.addProd(e.target.dataset.id)
            
            basket_area.textContent = textBasket()
            localStorage.setItem('basket', JSON.stringify(basket.basketProd))
            
        }else if (e.target.classList[0]=='btn_close'){
            modalContainer.classList.toggle('visible')
            modalContainer.parentNode.removeChild(modalContainer)
        }
    }else if (e.target.tagName=='IMG'){
        if (e.target.classList[0]=='photoProduct'){
        createModal(e.target.dataset.id)
        }
    }
})
// модальное окно
function createModal (id){
    modalContainer = document.createElement('div')
    modalContainer.classList.add('modal')
    body.appendChild(modalContainer)
    let prod = catalog.infoById(id)
    let modalHeader = document.createElement('h2')
    modalHeader.textContent = prod[0]
    modalContainer.appendChild(modalHeader)
    let div_photo = document.createElement('div')
    div_photo.classList.add('div_photo')
    modalContainer.appendChild(div_photo)
    img = document.createElement('img')
    img.classList.add('capture')
    img.src = prod[3][0]
    img.id = prod[3][0]
    div_photo.appendChild(img)
    let btnContainer = document.createElement('div')
    btnContainer.classList.add('btnCont')
    modalContainer.append(btnContainer)
    let btnClose = document.createElement('button')
    btnClose.textContent = 'Закрыть'
    btnClose.classList.add('btn_close')
    let btnNext = document.createElement('button')
    btnNext.textContent = 'Следующая'
    btnNext.classList.add('btn_next')
    btnNext.addEventListener('click', function(){
        for (el in catalog.products){
            for (j in catalog.products[el].photo){
                if (catalog.products[el].photo[j] == img.id){
                    
                    if (j == catalog.products[el].photo.length-1){
                        img.src = catalog.products[el].photo[0]
                        img.id = catalog.products[el].photo[0]
                        return
                    }else{
                        img.src = catalog.products[el].photo[Number(j) + 1]
                        img.id = catalog.products[el].photo[Number(j) + 1]
                        return
                    }
                }
            }
            
        }
    })
    let btnPrev = document.createElement('button')
    btnPrev.textContent = 'Предыдущая'
    btnPrev.classList.add('btn_prev')
    btnPrev.addEventListener('click', function(){
        for (el in catalog.products){
            for (j in catalog.products[el].photo){
                if (catalog.products[el].photo[j] == img.id){
                    
                    if (j == 0){
                        img.src = catalog.products[el].photo[catalog.products[el].photo.length-1]
                        img.id = catalog.products[el].photo[catalog.products[el].photo.length-1]
                        return
                    }else{
                        img.src = catalog.products[el].photo[Number(j) - 1]
                        img.id = catalog.products[el].photo[Number(j) - 1]
                        return
                    }
                }
            }
            
        }
    })

    
    btnContainer.appendChild(btnPrev)
    btnContainer.appendChild(btnNext)
    btnContainer.appendChild(btnClose)
    
    modalContainer.classList.toggle('visible')
}


function textBasket(){
    if (basket.basketProd.length == 0){
        return 'Корзина пуста'
    } else {
        return `Добавлено ${basket.totalProds()} товаров на сумму ${basket.totalPrice()} руб.`
    }
}
addEventListener('keydown', function(e){
    let img_id = img.getAttribute('id')
    if (modalContainer.classList.contains('visible')){
        if (e.key == 'ArrowRight'){
            for (el in catalog.products){
                for (j in catalog.products[el].photo){
                    if (catalog.products[el].photo[j] == img_id){
                        
                        if (j == catalog.products[el].photo.length-1){
                            img.setAttribute('src', catalog.products[el].photo[0])
                            img.setAttribute('id', catalog.products[el].photo[0])
                            return
                        }else{
                            img.setAttribute('src', catalog.products[el].photo[Number(j) + 1])
                            img.setAttribute('id', catalog.products[el].photo[Number(j) + 1])
                            return
                        }
                    }
                }
                
            }
        }else if (e.key == 'ArrowLeft'){
            for (el in catalog.products){
                for (j in catalog.products[el].photo){
                    if (catalog.products[el].photo[j] == img_id){
                        
                        if (j == 0){
                            img.setAttribute('src', catalog.products[el].photo[catalog.products[el].photo.length-1])
                            img.setAttribute('id', catalog.products[el].photo[catalog.products[el].photo.length-1])
                            return
                        }else{
                            img.setAttribute('src', catalog.products[el].photo[Number(j) - 1])
                            img.setAttribute('id', catalog.products[el].photo[Number(j) - 1])
                            return
                        }
                    }
                }
                
            }
        }
    }
})
// добавляем товары в каталог
catalog.addProduct('Телевизор', 50000, 1, ['./img/телевизор1.jpg', './img/телевизор2.jpg', './img/телевизор3.jpg', './img/телевизор4.jpg'])
catalog.addProduct('СВЧ', 25000, 1, ["./img/СВЧ1.jpg", './img/СВЧ2.png', './img/СВЧ3.png'])
catalog.addProduct('Подушка', 2500, 3, ['./img/Подушка.jpg'])
catalog.addProduct('Чайник', 2500, 2, ['./img/Чайник.jpg'])
catalog.addProduct('Шкаф', 50000, 1, ['./img/Шкаф.jpg'])
catalog.addProduct('Кровать', 25000, 1, ['./img/Кровать.jpg'])
catalog.addProduct('Тостер', 5000, 2, ['./img/Тостер.jpg'])
catalog.addProduct('Шуба', 2500, 3, ['./img/Шуба.jpg'])
catalog.addProduct('Одеяло', 2500, 2, ['./img/Одеяло.jpg'])

let lS = JSON.parse(localStorage.getItem('basket'))
basket.basketProd = (lS !=null) ? lS : []
drawCard()
basket_area.textContent = textBasket()
