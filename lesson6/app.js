// обьявление переменных
const catalog = document.querySelector('#catalog')
const basketElem = document.querySelector('#basket')
const h1 = document.querySelector('#head')
const basket_h1 = document.querySelector('#baskethead')
const modalContainer = document.querySelector('.modal')
let catalogTable
let basketTable
let p
let btn
let tr
let th
let td

// функция-конструктор
function Product(name, price, count, id, photo = []) {
    this.id = id
    this.name = name
    this.price = price
    this.count = count
    this.photo = photo
}

// обьект каталога
let catalogProd = {
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

// добавляем товары в каталог
catalogProd.addProduct('Телевизор', 50000, 1, ['телевизор1.jpg', 'телевизор2.jpg', 'телевизор3.jpg', 'телевизор4.jpg'])
catalogProd.addProduct('СВЧ', 25000, 1, ["СВЧ1.jpg", 'СВЧ2.jpg', 'СВЧ3.jpg'])
catalogProd.addProduct('Подушка', 2500, 3)
catalogProd.addProduct('Чайник', 2500, 2)
catalogProd.addProduct('Шкаф', 50000, 1)
catalogProd.addProduct('Кровать', 25000, 1)
catalogProd.addProduct('Тостер', 5000, 2)
catalogProd.addProduct('Шуба', 2500, 3)
catalogProd.addProduct('Одеяло', 2500, 2)

// модальное окно
function createModal (id){
    let prod = catalogProd.infoById(id)
    let modalHeader = document.createElement('h2')
    modalHeader.textContent = prod[0]
    modalContainer.appendChild(modalHeader)
    let img = document.createElement('img')
    img.src = prod[3][0]
    modalContainer.appendChild(img)
    let btnClose = document.createElement('button')
    btnClose.textContent = 'Закрыть'
    btnClose.addEventListener('click', function (){
        modalContainer.classList.toggle('visible')
    })
    let btnNext = document.createElement('button')
    btnNext.textContent = 'Следующая'
    btnNext.addEventListener('click', function(){
        alert(img.src)
    })
    modalContainer.appendChild(btnClose)
    modalContainer.appendChild(btnNext)
    modalContainer.classList.toggle('visible')
}

// отрисовка таблицы каталога
function createCatalogTable(){
    if(catalogTable != undefined){        
        catalogTable.parentNode.removeChild(catalogTable)
        catalogTable = undefined
    }
    catalogTable = document.createElement('table')
    h1.after(catalogTable)
    tr = document.createElement('tr')
    catalogTable.appendChild(tr)
    th = document.createElement('th')
    tr.appendChild(th)
    th.innerHTML = 'id товара'
    th = document.createElement('th')
    tr.appendChild(th)
    th.innerHTML = 'Наименование товара'
    th = document.createElement('th')
    tr.appendChild(th)
    th.innerHTML = 'Цена'
    th = document.createElement('th')
    tr.appendChild(th)
    th.innerHTML = 'Количество'
    th = document.createElement('th')
    tr.appendChild(th)
    th.innerHTML = 'Фото'
    th = document.createElement('th')
    tr.appendChild(th)

    for (let i = 0; i < catalogProd.products.length; i++){
        tr = document.createElement('tr')
        catalogTable.appendChild(tr)
        td = document.createElement('td')
        td.append(catalogProd.products[i].id)
        tr.appendChild(td)

        td = document.createElement('td')
        td.append(catalogProd.products[i].name)
        tr.appendChild(td)

        td = document.createElement('td')
        td.append(catalogProd.products[i].price)
        tr.appendChild(td)

        td = document.createElement('td')
        td.append(catalogProd.products[i].count)
        tr.appendChild(td)

        td = document.createElement('td')
        btn = document.createElement('button')
        btn.classList.add(catalogProd.products[i].id)
        btn.append('Купить')
        btn.addEventListener('click', function(e){
            let prod = catalogProd.popProd(e.target.classList[0])
            if (prod[2] != 'Нет в наличии'){
                basket.addProd(prod[0],prod[1],1,e.target.classList[0])
            }
            createBasketTable()
            createCatalogTable()
        })
        td.append(btn)
        tr.appendChild(td)

        td = document.createElement('td')
        btn = document.createElement('button')
        btn.classList.add(catalogProd.products[i].id)
        btn.append('Фото')
        btn.addEventListener('click', function(e){
            createModal(e.target.classList[0])
        })
        td.append(btn)
        tr.appendChild(td)
    }
}

// отрисовка таблицы корзины
function createBasketTable(){
    if(basketTable != undefined){        
        basketTable.parentNode.removeChild(basketTable)
        basketTable = undefined
    }
    if(basket.basketProd.length == 0){
        p = document.createElement('p')
        p.append('Корзина пуста')
        basketElem.appendChild(p)
    } else{
        p.innerHTML = `Товаров в корзине - ${basket.totalProds()}, стоимость - ${basket.totalPrice()} руб.`
        basketTable = document.createElement('table')
        p.after(basketTable)
        tr = document.createElement('tr')
        basketTable.appendChild(tr)
        th = document.createElement('th')
        th.innerHTML = 'id товара'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerHTML = 'Наименование товара'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerHTML = 'Цена'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerHTML = 'Количество'
        tr.appendChild(th)

        th = document.createElement('th')
        th.innerHTML = 'Сумма'
        tr.appendChild(th)

        for (let i = 0; i < basket.basketProd.length; i++){
            tr = document.createElement('tr')
            basketTable.appendChild(tr)
            td = document.createElement('td')
            td.append(basket.basketProd[i].id)
            tr.appendChild(td)

            td = document.createElement('td')
            td.append(basket.basketProd[i].name)
            tr.appendChild(td)

            td = document.createElement('td')
            td.append(basket.basketProd[i].price)
            tr.appendChild(td)

            td = document.createElement('td')
            td.append(basket.basketProd[i].count)
            tr.appendChild(td)

            td = document.createElement('td')
            td.append(basket.basketProd[i].price * basket.basketProd[i].count)
            tr.appendChild(td)
        }    

    }
}
// обьект корзины
let basket = {                                                  
    basketProd: [],
    // метод, добавляющий обьект товара в корзину
    addProd(name, price, count, id){
        for (let i = 0; i < this.basketProd.length; i++){
            if (id == this.basketProd[i].id){
                this.basketProd[i].count += 1
                return null
            }
        }
        this.basketProd.push(new Product(name, price, count, id))
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
    // метод, отвечающий за обновление корзины на сайте
    // view_basket(){
    //     if(basket.basketProd.length == 0){
    //         p = document.createElement('p')
    //         p.append('Корзина пуста')
    //         basketElem.appendChild(p)
    //     } else{
    //         p.innerHTML = 'Товар добавлен'
    //         alert(basket.basketProd)
    //         for (let i = 0; i < basket.basketProd.length; i++){
    //             tr = document.createElement('tr')
    //             table.appendChild(tr)
    //             td = document.createElement('td')
    //             td.append(basket.basketProd[i].id)
    //             tr.appendChild(td)

    //             td = document.createElement('td')
    //             td.append(basket.basketProd[i].name)
    //             tr.appendChild(td)

    //             td = document.createElement('td')
    //             td.append(basket.basketProd[i].price)
    //             tr.appendChild(td)

    //             td = document.createElement('td')
    //             td.append(basket.basketProd[i].count)
    //             tr.appendChild(td)
    //         }
        // }
    // }
}



createBasketTable()
createCatalogTable()


