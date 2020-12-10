let board = document.getElementById('inner-board');

for(let i = 0; i < 10; i++) {
    let div = document.createElement('div');
    div.className = 'list-container';
    let list = document.createElement('ul');
    list.className = 'list'
    for(let j = 0; j < 10; j++) {
        let listItem = document.createElement('li');
        listItem.className = 'list-item';
        let button = document.createElement('button');
        button.textContent = '*';
        button.className = 'btn'
        listItem.appendChild(button);
        list.appendChild(listItem);
    }
    div.appendChild(list);
    board.appendChild(div);
}

let btn = document.getElementsByClassName('btn');

for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('contextmenu', function(e) {
        e.preventDefault();
        console.log('right clicked!');
    })
    btn[i].addEventListener('click', function(e) {
        console.log('left clicked!');
    })
}
