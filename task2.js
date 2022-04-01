/* Задание 2
Продолжить работу с интернет-магазином:
a. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими
объектами можно заменить их элементы?
b. Реализуйте такие объекты.
c. Перенести функционал подсчета корзины на объектно-ориентированную базу
*/

// функция-конструктор обьекта Товар
function Product(name, price, count) {
    this.name = name
    this.price = price
    this.count = count
}

// обьект корзины, содержащий массив обьектов товара,
// метод, создающий обьект товара и добавляющий его в массив обьектов товара,
// метод подсчета общей стоимости товаров в корзине
// метод подсчета общего количества единиц товара в корзине
// метод удаления товара из корзины
let basket = {                                                  // обьект корзины
    basketProd: [],
    createProd(name, price, count){                             // метод, создающий обьект товара
        this.basketProd.push(new Product(name, price, count))
    },
    totalPrice(){                                               // метод подсчета общей стоимости
        return this.basketProd.reduce(function(sum,b) {
            return sum + b.price * b.count
        }, 0 )
    },
    totalProds(){                                               // метод подсчета единиц товара
        return this.basketProd.reduce(function(sum,b) {
            return sum + b.count
        }, 0 )
    },
    delProd(name){                                              // метод удаления товара из корзины
        for (i in this.basketProd){
            if (this.basketProd[i].name == name){
                this.basketProd.splice(i, 1)
            }
        }
    }
}
basket.createProd('Телевизор', 50000, 1)    // создаем обьект товара
basket.createProd('СВЧ', 25000, 1)          // создаем обьект товара
basket.createProd('Футболка', 5000, 2)      // создаем обьект товара
basket.createProd('Подушка', 2500, 3)       // создаем обьект товара
console.log(basket.basketProd)              // выводим список товаров в корзине
console.log(basket.totalPrice())            // выводим общую стоимость товаров в корзине
console.log(basket.totalProds())            // выводим количество единиц товаров в корзине
basket.delProd('СВЧ')                       // удаляем товар "СВЧ" из корзины
console.log(basket.totalProds())            // выводим количество единиц товаров в корзине