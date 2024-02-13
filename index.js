window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const pd = document.querySelector('.pd');
    const rb = document.querySelector('.reset');
    const show = document.querySelector('.show');
    let curr = 'O';
    let active = true;
    const winx = 'playerx';
    const wino = 'playero';
    const tie = 'tie';
    let game = ['', '', '', '', '', '', '', '', ''];
    const pos = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8], 
        [1, 4, 7], [2, 5, 8], [2, 4, 6], 
        [3, 4, 5], [6, 7, 8] ];
    function val() {
        let win = false;
        for (let i = 0; i < 8; i++) {
            const won = pos[i];
            const x = game[won[0]];
            const y = game[won[1]];
            const z = game[won[2]];
            if (x === '' || y === '' || z === '') { continue; }
            if (x === y && y === z) { win = true; break; }
        }
    if (win) {
        end(curr === 'X' ? winx : wino);
        active = false;
        return; }
    if (!game.includes('')) 
     end(tie); }
    const end = (i) => {
        switch(i){
            case wino:
                show.innerHTML = 'Result: Player <span class="playerO">O</span> Won';
                break;
            case winx:
                show.innerHTML = 'Result: Player <span class="playerX">X</span> Won';
                break;
            case tie:
                show.innerText = 'Result: Players have Tied';
        }
        show.classList.remove('hide');
    };
    const valid = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        } return true;
    };
    const updateGame =  (i) => { game[i] = curr; }
    const changePlayer = () => {
        pd.classList.remove(`player${curr}`);
        if(curr == 'X') {curr = 'O';}
        else {curr = 'X';}
        pd.innerText = curr;
        pd.classList.add(`player${curr}`);
    }
    const act = (box, i) => {
        if(valid(box) && active) {
            box.innerText = curr;
            box.classList.add(`player${curr}`);
            updateGame(i);
            val();
            changePlayer();
        }
    }
    const resetGame = () => {
        game = ['', '', '', '', '', '', '', '', ''];
        active  = true;
        show.classList.add('hide');
        changePlayer();
        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }
    boxes.forEach( (b, i) => {
        b.addEventListener('click', () => act(b, i));
    });
    rb.addEventListener('click', resetGame);
});