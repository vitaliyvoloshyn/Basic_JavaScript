/* Задание 1
Продумать, где можно применить замыкания для практикума из седьмого урока (Игра Змейка)

Счетчик, основанный на замыкании, можно использовать для создания игровой сетки. Для идентификации
ячеек им присваивается уникальный id, в котором указываются номер строки и колонки текущей ячейки.
Эти номера создаются с помощью функции makeCounter
*/
function makeCounter() {
    var count = 0;
    function counter() {
    count = count + 1;
    return count;
    }
    return counter;
    }

let div_game = document.querySelector('.div_game')
let column = makeCounter()
for (let i = 1; i <= 10; i++){      // columns
    let row = makeCounter()
    let col = column()
    for (let j = 1; j<=10; j++){    // rows
        let div_cell = document.createElement('div')
        div_cell.classList.add('cell')
        div_cell.setAttribute('id', `cell ${col} - ${row()}`)
        div_game.append(div_cell)
    }
}
    