function Product(name, price, count, id) {
    this.id = id
    this.name = name
    this.price = price
    this.count = count
}

// обьект корзины, содержащий массив обьектов товара,
// метод, создающий обьект товара и добавляющий его в массив обьектов товара,
// метод подсчета общей стоимости товаров в корзине
// метод подсчета общего количества единиц товара в корзине
// метод удаления товара из корзины
let catalogProd = {                                                  // обьект корзины
    products: [],
    addProduct(name, price, count){                             // метод, создающий обьект товара
        let id
        if (this.products.length == 0){
            id = 1
        } else{
            id = this.products[this.products.length -1].id + 1
        }                          
        this.products.push(new Product(name, price, count, id))
    }
}

// добавляем товары
catalogProd.addProduct('Телевизор', 50000, 1)
catalogProd.addProduct('СВЧ', 25000, 1)
catalogProd.addProduct('Подушка', 2500, 3)
catalogProd.addProduct('Чайник', 2500, 2)
catalogProd.addProduct('Шкаф', 50000, 1)
catalogProd.addProduct('Кровать', 25000, 1)
catalogProd.addProduct('Тостер', 5000, 2)
catalogProd.addProduct('Шуба', 2500, 3)
catalogProd.addProduct('Одеяло', 2500, 2)

let catalog = document.querySelector('#catalog')
let table = document.createElement('table')
let tr
let th
let td

catalog.appendChild(table)
tr = document.createElement('tr')
table.appendChild(tr)
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


for (let i = 0; i < catalogProd.products.length; i++){
    tr = document.createElement('tr')
    table.appendChild(tr)
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
}
