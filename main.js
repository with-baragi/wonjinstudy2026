const generateBtn = document.getElementById('generate-btn');
const themeToggle = document.getElementById('theme-toggle');
const numbersContainer = document.querySelector('.numbers-container');

// Function to set the theme
const setTheme = (isLight) => {
    document.body.classList.toggle('light-mode', isLight);
    themeToggle.checked = isLight;
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};

// Load saved theme
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'light');

// Theme toggle event
themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked);
});

generateBtn.addEventListener('click', () => {
    generateLotteryNumbers();
});

function generateLotteryNumbers() {
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('number');
            numberDiv.textContent = number;
            numberDiv.style.animationDelay = `${index * 0.1}s`;
            numbersContainer.appendChild(numberDiv);
        }, 100); // Quick initial delay
    });
}

// Initial generation to show something on load
generateLotteryNumbers();