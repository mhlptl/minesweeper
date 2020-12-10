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
        listItem.id = `item-${i}x${j}`
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
        let id = item[i].id;
        let loc = id.substring(5);
        let coords = loc.split('x');
        let obj = {x: Number(coords[0]), y: Number(coords[1])};
        if(checkDups(locations, obj)) {
            item[i].classList.add('mine');
        }
        // console.log('left clicked!');
    })
}
