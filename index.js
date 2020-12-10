let board = document.getElementById('inner-board');

for(let i = 0; i < 10; i++) {
    let div = document.createElement('div');
    div.className = 'list-container';
    let list = document.createElement('ul');
    list.className = 'list'
    for(let j = 0; j < 20; j++) {
        let listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerText = '\xA0';
        list.appendChild(listItem);
    }
    div.appendChild(list);
    board.appendChild(div);
}

let item = document.getElementsByClassName('list-item');

for(let i = 0; i < item.length; i++) {
    item[i].addEventListener('contextmenu', function(e) {
        e.preventDefault();
        item[i].classList.toggle('flagged');
        console.log('right clicked!');
    })
    item[i].addEventListener('click', function(e) {
        console.log('left clicked!');
    })
}
