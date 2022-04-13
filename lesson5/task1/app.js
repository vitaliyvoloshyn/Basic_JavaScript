function drawChess(){
    let body = document.querySelector("body")

    let litblock_top = document.createElement('div')
    litblock_top.className= 'litblock_top'
    body.appendChild(litblock_top)

    let numblock_left = document.createElement('div')
    numblock_left.className = 'numblock_left'
    body.appendChild(numblock_left)

    let gameblock = document.createElement('div')
    gameblock.className = 'gameblock'
    body.appendChild(gameblock)

    let numblock_right = document.createElement('div')
    numblock_right.className = 'numblock_right'
    body.appendChild(numblock_right)

    let litblock_down = document.createElement('div')
    litblock_down.className= 'litblock_down'
    body.appendChild(litblock_down)

    let cell
    let flag_color = false
    for(let i = 1; i < 9; i++){
        flag_color = !flag_color
        for (let j = 1; j < 9; j++){
        cell = document.createElement('div')
        if(flag_color){
            cell.className = 'cell black'
        } else{
            cell.className = 'cell white'
        }
        gameblock.appendChild(cell)
        flag_color = !flag_color
    }}

    let cell_lit
    let cell_num
    for(let i = 1; i < 9; i++){
        cell_lit = document.createElement('div')
        cell_lit.className = 'cell_lit'
        cell_lit.append(String.fromCharCode(i+64))
        cell_num = document.createElement('div')
        cell_num.className = 'cell_num'
        cell_num.append(i)
        litblock_top.appendChild(cell_lit)
        litblock_down.appendChild(cell_lit.cloneNode(true))
        numblock_left.appendChild(cell_num)
        numblock_right.appendChild(cell_num.cloneNode(true))
    }
}

drawChess()
