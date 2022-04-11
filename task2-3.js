/* Задание 2, 3
С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть
сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в
зависимости от находящихся в ней товаров.
Товары в корзине хранятся в массиве. Задачи:
a. Организовать такой массив для хранения товаров в корзине;
b. Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
*/


let basket = [{name: 'Телевизор', price: 50000, count: 1}, 
              {name: 'СВЧ', price: 25000, count: 1}, 
              {name: 'Футболка', price: 5000, count: 2}, 
              {name: 'Подушка', price: 2500, count: 3}]

function countBasketPrice() {
    let final_price = 0
    for (i in basket) {
        final_price += (basket[i].count * basket[i].price)
    }
    return final_price
}            
console.log(countBasketPrice())