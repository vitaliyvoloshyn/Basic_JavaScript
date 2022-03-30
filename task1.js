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
