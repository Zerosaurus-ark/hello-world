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

window.onload = () => {
    document.getElementById('balance').innerText = balance.toFixed(2);
    document.getElementById('usdcMined').innerText = usdcMined.toFixed(6);
    document.getElementById('miningSpeed').innerText = miningSpeed.toFixed(6);

    setInterval(() => {
        usdcMined += miningSpeed;
        document.getElementById('usdcMined').innerText = usdcMined.toFixed(6);
        localStorage.setItem('usdcMined', usdcMined);
    }, 1000);
};

function addBalance() {
    balance += 100;
    document.getElementById('balance').innerText = balance.toFixed(2);
    localStorage.setItem('balance', balance);
    animateButton('Deposit 100 USDC');
}

function buyNFT(nftType) {
    const nft = miningRates[nftType];
    if (balance >= nft.price) {
        balance -= nft.price;
        miningSpeed += nft.speed;
        document.getElementById('balance').innerText = balance.toFixed(2);
        document.getElementById('miningSpeed').innerText = miningSpeed.toFixed(6);
        localStorage.setItem('balance', balance);
        localStorage.setItem('miningSpeed', miningSpeed);
    } else {
        alert('Not enough USDC!');
    }
}

function claimUSDC() {
    alert(`You claimed ${usdcMined.toFixed(2)} USDC!`);
    usdcMined = 0;
    document.getElementById('usdcMined').innerText = usdcMined.toFixed(6);
    localStorage.setItem('usdcMined', usdcMined);
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
