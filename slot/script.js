const txtbet = document.querySelector('#bet');
const elwin = document.querySelector('#el-win');
const txtwin = document.querySelector('#win');
const elmoney = document.querySelector('#el-money');
const txtmoney = document.querySelector('#money');
const btnbet = document.querySelector('#btn-bet');
const btnspin = document.querySelector('#btn-spin');
const btnputmn = document.querySelector('#btn-putmoney');

const cols = document.querySelectorAll('.column');

let money = 0;
let bet = 1;
let betstep = 0;
const betarr = [1, 3, 5, 10, 20, 30, 50, 100, 200, 500, 1000];
const arr = ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍒','🥭','🥝'];

const audioCash = new Audio('media/cash.mp3');
const audioClick = new Audio('media/click.mp3');
const audioSpin = new Audio('media/spin.mp3');
const audioWin = new Audio('media/win.mp3');
const audioOver = new Audio('media/over.mp3');

function getItem(i) { return arr[i]; }
function getRandomInt() { return Math.floor(Math.random() * arr.length); }

function addItems(el, n) {
    for (let i = 0; i < n; i++) {
        let ind = getRandomInt();
        let d = document.createElement('div');
        d.setAttribute('data-ind', ind);
        d.innerHTML = `<i>${getItem(ind)}</i>`;
        el.prepend(d);
    }
}

function getStartItems() {
    for (const c of cols) {
        c.innerHTML = ''; 
        addItems(c, 3);
    }
}

function showMoney() {
    elwin.style.display = 'none';
    elmoney.style.display = '';
    txtmoney.innerHTML = money;
    document.querySelector('.text-gold').classList.remove('col-red');
}

function showWin(w) {
    elmoney.style.display = 'none';
    elwin.style.display = '';
    txtwin.innerHTML = w;
    setTimeout(() => {
        showMoney();
        enableBtns();
    }, 2000);
}

function disableBtns() {
    btnbet.disabled = true;
    btnspin.disabled = true;
}

function enableBtns() {
    if(money >= bet) {
        btnbet.disabled = false;
        btnspin.disabled = false;
    }
}

function checkMoney() {
    if (money >= bet) {
        return true;
    } else {
        document.querySelector('.text-gold').classList.add('col-red');
        audioOver.play().catch(() => {});
        disableBtns();
        return false;
    }
}

function checkWin() {
    document.querySelectorAll('.column div').forEach(d => d.classList.remove('bg'));

    let arrLine1 = []; 
    let arrLine2 = []; 
    let arrLine3 = []; 

    for (const c of cols) {
        let divs = c.querySelectorAll('div');
        arrLine2.push(Number(divs[0].dataset.ind));
        arrLine1.push(Number(divs[1].dataset.ind)); 
        arrLine3.push(Number(divs[2].dataset.ind));
    }

    function getWinAmount(lineArr, rowIndex) {
        let counts = {};
        lineArr.forEach(x => counts[x] = (counts[x] || 0) + 1);
        
        let winElem = Object.keys(counts).find(key => counts[key] >= 3);
        let count = winElem ? counts[winElem] : 0;

        if (count >= 3) {
            // Подсвечиваем выигрышные элементы
            cols.forEach(c => {
                let d = c.querySelectorAll('div')[rowIndex];
                if (Number(d.dataset.ind) == winElem) d.classList.add('bg');
            });
            return count;
        }
        return 0;
    }

    let winL1 = getWinAmount(arrLine1, 1); 
    let winL2 = getWinAmount(arrLine2, 0); 
    let winL3 = getWinAmount(arrLine3, 2); 

    let totalWin = 0;
    if(winL1 === 3) totalWin += 100 * bet;
    else if(winL1 === 4) totalWin += 1000 * bet;
    else if(winL1 === 5) totalWin += 100000 * bet;

    if(winL2 === 3) totalWin += 2 * bet;
    else if(winL2 === 4) totalWin += 5 * bet;
    else if(winL2 === 5) totalWin += 1000 * bet;

    if(winL3 === 3) totalWin += 2 * bet;
    else if(winL3 === 4) totalWin += 5 * bet;
    else if(winL3 === 5) totalWin += 1000 * bet;

    if (totalWin > 0) {
        audioWin.play().catch(() => {}); 
        money += totalWin;
        showWin(totalWin);
    } else {
        enableBtns();
    }
}

btnputmn.addEventListener('click', () => {
    if (money === 0) {
        audioCash.play().catch(() => {}); 
        money = 1000;
        showMoney();
        getStartItems(); 
        enableBtns();
    }
});

btnbet.addEventListener('click', () => {
    audioClick.play().catch(() => {}); 
    betstep = (betstep + 1) % betarr.length;
    bet = betarr[betstep];
    txtbet.innerHTML = bet;
    checkMoney();
});

btnspin.addEventListener('click', () => {
    if (!checkMoney()) return;

    audioSpin.play().catch(() => {}); 
    money -= bet;
    showMoney();
    disableBtns();

    addItems(cols[0], 10);
    addItems(cols[1], 20);
    addItems(cols[2], 30);
    addItems(cols[3], 40);
    addItems(cols[4], 50);

    let tr = 1;
    let completedCols = 0;

    for (const c of cols) {
        c.style.transition = `${tr}s cubic-bezier(0.1, 0.7, 0.1, 1)`;
        let n = c.querySelectorAll('div').length;
        c.style.bottom = `-${(n - 3) * 120}px`;
        tr += 0.3;

        c.addEventListener('transitionend', function handler() {
            c.removeEventListener('transitionend', handler);
            let divs = Array.from(c.querySelectorAll('div'));
            divs.slice(3).forEach(d => d.remove());
            
            c.style.transition = 'none';
            c.style.bottom = '0px';
            
            completedCols++;
            if(completedCols === 5) checkWin();
        });
    }
});

getStartItems();