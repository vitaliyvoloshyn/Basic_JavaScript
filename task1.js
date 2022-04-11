// Задание 1
// Почему код дает именно такие результаты?

var a = 1, b = 1, c, d;
c = ++a; alert(c); // 2 
/*переменной c присваивается инкремент переменной а. Здесь применяется префиксная форма записи инкремента,
сначала значение переменной а увеличивается на 1 и только потом это значение присваивается переменной с */

d = b++; alert(d); // 1
/*переменной d присваивается инкремент переменной b. Здесь применяется постфиксная форма записи 
инкремента, сначала значение переменной b присваивается переменной d и только потом значение переменной 
b увеличивается на 1*/

c = (2+ ++a); alert(c); // 5
/*переменной c присваивается инкремент переменной а плюс 2. Здесь применяется префиксная форма записи
инкремента, сначала значение переменной а увеличивается на 1, потом добавляется 2 и только потом
это значение присваивается переменной с */

d = (2+ b++); alert(d); // 4
/*переменной d присваивается инкремент переменной b плюс 2. Здесь применяется постфиксная форма записи
инкремента, сначала к значению переменной а добавляется 2, результат сложения присваивается 
переменной с и только потом значение переменной b увеличивается на 1 */

alert(a); // 3
alert(b); // 3
/*вывод значений переменных а и b после всех операций инкремента */

/* Задание 1
С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
*/

function simp(n) {
    let i = 2
    while (i <= n) {
        let j = 2
        let check = false
        while (j < i) {
            if (i % j == 0) {
                check = true
            }
            ++j
        }
        if (!check) {
            console.log(i)}
        ++i
    }
}
simp(100)
/*Задать температуру в градусах по Цельсию. Вывести в alert соответствующую температуру в
градусах по Фаренгейту. Подсказка: расчет идет по формуле Tf = (9 / 5) * Tc + 32, где Tf —
температура по Фаренгейту, Tc — по Цельсию
*/
console.log('Задание1\n')
var tc = 24
var tf = (9 / 5) * tc + 32
console.log('Температура в градусах по Цельсию - ', tc,'\nТемпература в градусах по Фаренгейту - ', tf)
console.log('\n')

