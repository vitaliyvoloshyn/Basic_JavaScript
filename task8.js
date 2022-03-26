/* Задание 8
С помощью рекурсии организовать функцию возведения числа в степень. 
Формат: function power(val, pow), где val — заданное число, pow –— степень.
*/

/*
Развил мысль и изобрел велосипед.
Моя функция возводит число в степень, представленную натуральными, целыми и рациональными числами
*/
function power(val, pow) {

    // рекурсивная функция, возводящяя заданное число в заданную степень
    function my_power(val, pow) { 
        if (pow > 1) {
            return val * power(val, pow -1)
        } else {
            return val
        }
    }

    if (val == 0 && pow == 0) { // 0 в степени 0 - значение не определено
        return "не определено"}
    else if (pow == 0) { // любое число в степени 0 равно 1
        return 1}

    let fraction = fraction_conversion(pow) // переменная fraction принимает возвращаемое значение 
                                            // функции fraction_conversion, которая принимает значение
                                            // степени и переводит это число в дробь - возвращает массив
                                            // первый элемент числитель, второй - знаменатель

    if (fraction[1] == 0)  {    // если второй элемент массива 0, то есть если степень целое число
        if (fraction[0] > 0) {  // если значение степени положительное
            return my_power(val, pow)}
        else if (fraction[0] < 0) { // если значение степени отрицательное
            return 1 / my_power(val, Math.abs(pow))}
    } else {    // если второй элемент массива не 0, то есть если степень рациональное число
        if (fraction[0] > 0) {  // если значение степени положительное
            return Math.pow(my_power(val, fraction[0]), 1/fraction[1])}
        else if (fraction[0] < 0) { // если значение степени отрицательное
            return Math.pow(1/my_power(val, Math.abs(fraction[0])), 1/fraction[1])}
    }
}

function fraction_conversion(num) {
    // рекурсивная функция, принимающая значение степени и переводит его в дробный вид. Возвращает 
    // массив, первый элемент, которого числитель дроби, второй - знаменатель
    // 2.5 - вернет [25, 10] 
    // 5 - вернет [5, 0] 
    let numerator = 0
    let denominator = 0

    function num_count(num, n=0) {
        if (num % 1 == 0) {
            numerator = num
            denominator = n != 0 ? 10**n: 0
        } else {
            return num_count(num * 10, n+1)
        }}
    num_count(num)
        
    return [numerator, denominator]
}

console.log(power(0, 2))        // 0
console.log(power(2, 0))        // 1
console.log(power(2, 1))        // 2
console.log(power(2.5, 2))      // 6.25
console.log(power(3, 3))        // 27
console.log(power(2, 2.5))      // 5.6568542494923815
console.log(power(2, -3))       // 0.125
console.log(power(2, -2.5))     // 0.17677669529663687
console.log(power(0, 0))        // не определено