/* Задание 6
Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation),
где arg1, arg2 — значения аргументов, operation — строка с названием операции. В
зависимости от переданного значения выполнить одну из арифметических операций
(использовать функции из пункта 5) и вернуть полученное значение (применить switch).
*/

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'sum':
            return arg1 + arg2
            break
        case 'diff':
            return arg1 - arg2
            break
        case 'mul':
            return arg1 * arg2
            break
        case 'div':
            return arg1 / arg2
            break
    }
}

console.log(mathOperation(3, 4, 'mul'))
console.log(mathOperation(3, 4, 'diff'))
console.log(mathOperation(3, 4, 'mul'))
console.log(mathOperation(3, 4, 'div'))