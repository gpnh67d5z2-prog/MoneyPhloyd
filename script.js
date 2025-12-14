const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');
const resultText = document.getElementById('result');
const exchangeRateText = document.getElementById('exchange-rate');

const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    if (amount <= 0 || isNaN(amount)) {
        resultText.textContent = 'Введите корректную сумму';
        exchangeRateText.textContent = '';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}${from}`);
        const data = await response.json();
        
        const rate = data.rates[to];
        const result = (amount * rate).toFixed(2);
        
        resultText.textContent = `${amount} ${from} = ${result} ${to}`;
        exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    } catch (error) {
        resultText.textContent = 'Ошибка получения курса';
        exchangeRateText.textContent = '';
        console.error('Ошибка:', error);
    }
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

convertBtn.addEventListener('click', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);
amountInput.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);

// Загружаем первый курс при открытии
convertCurrency();

