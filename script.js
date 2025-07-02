/* File: script.js */
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let usdcMined = parseFloat(localStorage.getItem('usdcMined')) || 0;
let miningSpeed = parseFloat(localStorage.getItem('miningSpeed')) || 0;

const miningRates = {
    1: { speed: 50 / 2592000, price: 30 },
    2: { speed: 100 / 2592000, price: 50 },
    3: { speed: 200 / 2592000, price: 80 },
    4: { speed: 500 / 2592000, price: 100 },
};

const clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');

window.onload = () => {
    updateUI();

    setInterval(() => {
        usdcMined += miningSpeed;
        animateNumber('usdcMined', usdcMined);
        localStorage.setItem('usdcMined', usdcMined);
    }, 1000);
};

function updateUI() {
    document.getElementById('balance').innerText = balance.toFixed(2);
    document.getElementById('usdcMined').innerText = usdcMined.toFixed(6);
    document.getElementById('miningSpeed').innerText = miningSpeed.toFixed(6);
}

function addBalance() {
    balance += 100;
    animateButton('Deposit 100 USDC');
    clickSound.play();
    updateUI();
    localStorage.setItem('balance', balance);
}

function buyNFT(nftType) {
    const nft = miningRates[nftType];
    if (balance >= nft.price) {
        balance -= nft.price;
        miningSpeed += nft.speed;
        clickSound.play();
        updateUI();
        localStorage.setItem('balance', balance);
        localStorage.setItem('miningSpeed', miningSpeed);
    } else {
        alert('Not enough USDC!');
    }
}

function claimUSDC() {
    document.getElementById('loading').style.display = 'block';
    setTimeout(() => {
        alert(`You claimed ${usdcMined.toFixed(2)} USDC!`);
        usdcMined = 0;
        updateUI();
        localStorage.setItem('usdcMined', usdcMined);
        document.getElementById('loading').style.display = 'none';
    }, 1500);
}

function connectWallet() {
    alert('Wallet connected (fake)!');
}

function animateButton(buttonText) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.innerText === buttonText) {
            button.style.transform = 'scale(1.2)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    let currentNumber = parseFloat(element.innerText);
    const step = (targetNumber - currentNumber) / 20;

    let count = 0;
    const interval = setInterval(() => {
        if (count < 20) {
            currentNumber += step;
            element.innerText = currentNumber.toFixed(6);
            count++;
        } else {
            clearInterval(interval);
            element.innerText = targetNumber.toFixed(6);
        }
    }, 30);
}

