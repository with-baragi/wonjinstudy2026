const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.querySelector('.numbers-container');

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
            numbersContainer.appendChild(numberDiv);
        }, index * 200); // Stagger the animation
    });
}