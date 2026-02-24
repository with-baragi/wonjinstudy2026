document.addEventListener('DOMContentLoaded', () => {
    // Step navigation
    const steps = document.querySelectorAll('.step');
    const startBtn = document.getElementById('start-btn');
    const nextBtn1 = document.getElementById('next-btn-1');
    const nextBtn2 = document.getElementById('next-btn-2');
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');

    let currentStep = 1;
    const userData = {};

    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        const nextStep = document.getElementById(`step-${stepNumber}`);
        if (nextStep) {
            nextStep.classList.add('active');
            currentStep = stepNumber;
        }
    }

    startBtn.addEventListener('click', () => showStep(2));
    nextBtn1.addEventListener('click', () => {
        const birthDate = document.getElementById('birth-date').value;
        if (birthDate) {
            userData.birthDate = birthDate;
            showStep(3);
        } else {
            alert('생년월일을 입력해주세요.');
        }
    });

    nextBtn2.addEventListener('click', () => {
        const favNumber = document.getElementById('fav-number').value;
        if (favNumber >= 1 && favNumber <= 45) {
            userData.favNumber = favNumber;
            showStep(4);
        } else {
            alert('1부터 45 사이의 숫자를 입력해주세요.');
        }
    });

    generateBtn.addEventListener('click', () => {
        const memorablePlace = document.getElementById('memorable-place').value;
        if (memorablePlace) {
            userData.memorablePlace = memorablePlace;
            generateAndShowResults();
            showStep(5);
        } else {
            alert('기억에 남는 여행지를 입력해주세요.');
        }
    });

    resetBtn.addEventListener('click', () => {
        // Reset data and UI
        Object.keys(userData).forEach(key => delete userData[key]);
        document.getElementById('birth-date').value = '';
        document.getElementById('fav-number').value = '';
        document.getElementById('memorable-place').value = '';
        document.getElementById('results-container').innerHTML = '';
        showStep(1);
    });

    // Pseudo-random number generator with a seed
    function createSeededRandom(seed) {
        let state = seed;
        return function() {
            let x = Math.sin(state++) * 10000;
            return x - Math.floor(x);
        };
    }

    function generateAndShowResults() {
        const { birthDate, favNumber, memorablePlace } = userData;
        
        // Create a complex seed from user data
        const seedString = `${birthDate}-${favNumber}-${memorablePlace}`;
        let seed = 0;
        for (let i = 0; i < seedString.length; i++) {
            seed += seedString.charCodeAt(i) * (i + 1);
        }
        
        const seededRandom = createSeededRandom(seed);
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const numbers = new Set();
            // Ensure the favorite number is in the first set
            if (i === 0) {
                numbers.add(parseInt(favNumber));
            }

            while (numbers.size < 6) {
                const randomNumber = Math.floor(seededRandom() * 45) + 1;
                numbers.add(randomNumber);
            }

            const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
            
            // Create and append result line
            const lineDiv = document.createElement('div');
            lineDiv.classList.add('result-line');
            lineDiv.style.animationDelay = `${i * 0.2}s`;
            
            const label = document.createElement('span');
            label.classList.add('result-line-label');
            label.textContent = `게임 ${i + 1}`;

            const numberSetDiv = document.createElement('div');
            numberSetDiv.classList.add('number-set');

            sortedNumbers.forEach(num => {
                const numberDiv = document.createElement('div');
                numberDiv.classList.add('number');
                numberDiv.textContent = num;
                numberSetDiv.appendChild(numberDiv);
            });
            
            lineDiv.appendChild(label);
            lineDiv.appendChild(numberSetDiv);
            resultsContainer.appendChild(lineDiv);
        }
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const setTheme = (isLight) => {
        document.body.classList.toggle('light-mode', isLight);
        themeToggle.checked = isLight;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };

    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'light');

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked);
    });
});