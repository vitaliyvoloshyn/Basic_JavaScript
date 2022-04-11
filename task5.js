
/* Задание 6
Реализовать четыре основные арифметические операции в виде функций с двумя
параметрами. Обязательно использовать оператор return.
*/

function sum(a, b) {
    return a + b
}

function diff(a, b) {
    return a - b
}

function mul(a, b) {
    return a * b
}

function div(a, b) {
    return a / b
}

var x = 56
var y = 23
console.log(sum(x, y))
console.log(diff(x, y))
console.log(mul(x, y))
console.log(div(x, y))

/* Задание 5
Нарисовать пирамиду с 20 рядами с помощью console.log, как показано ниже:
x
xx
xxx
xxxx
xxxxx
*/

for (let i = 1; i < 6; console.log('x'.repeat(i)), i++){

}

