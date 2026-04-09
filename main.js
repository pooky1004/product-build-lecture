const generateBtn = document.getElementById('generate');
const numbersDiv = document.querySelector('.numbers');
const themeSwitch = document.getElementById('checkbox');
const contactBtn = document.getElementById('contact-btn');
const contactFormContainer = document.getElementById('contact-form-container');
const closeBtn = document.querySelector('.close-btn');

const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        themeSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

themeSwitch.addEventListener('change', switchTheme, false);

generateBtn.addEventListener('click', () => {
    const numbers = generateNumbers();
    displayNumbers(numbers);
});

contactBtn.addEventListener('click', () => {
    contactFormContainer.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    contactFormContainer.classList.add('hidden');
});

contactFormContainer.addEventListener('click', (e) => {
    if (e.target === contactFormContainer) {
        contactFormContainer.classList.add('hidden');
    }
});

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numbersDiv.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numbersDiv.appendChild(numberDiv);
    }
}
