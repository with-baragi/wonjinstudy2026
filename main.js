document.addEventListener('DOMContentLoaded', () => {
    // Task List
    const tasks = [
        { name: '🏃 30분 달리기', category: 'exercise', minEnergy: 60 },
        { name: '💪 헬스장 가기', category: 'exercise', minEnergy: 70 },
        { name: '📚 전공/자격증 공부', category: 'study', minEnergy: 50 },
        { name: '📖 독서 30분', category: 'reading', minEnergy: 20 },
        { name: '💻 밀린 업무 처리', category: 'work', minEnergy: 40 },
        { name: '🧹 방 청소하기', category: 'household', minEnergy: 30 },
        { name: '🧘 10분 명상', category: 'mental', minEnergy: 0 },
        { name: '🚶 동네 산책', category: 'exercise', minEnergy: 10 },
        { name: '✍️ 일기 쓰기', category: 'mental', minEnergy: 10 },
        { name: '🚿 시원하게 샤워하기', category: 'household', minEnergy: 10 },
        { name: '🗣️ 외국어 단어 외우기', category: 'study', minEnergy: 30 },
        { name: '🥗 건강한 식사 해먹기', category: 'household', minEnergy: 40 }
    ];

    const motivations = [
        "시작이 반입니다. 지금 바로 움직이세요!",
        "미루는 습관을 버리면 인생이 바뀝니다.",
        "오늘의 노력이 내일의 당신을 만듭니다.",
        "딱 5분만 해보세요. 생각보다 어렵지 않을 거예요.",
        "당신은 생각보다 훨씬 더 강력한 의지를 가지고 있습니다."
    ];

    // Step navigation
    const steps = document.querySelectorAll('.step');
    const startBtn = document.getElementById('start-btn');
    const nextBtn1 = document.getElementById('next-btn-1');
    const nextBtn2 = document.getElementById('next-btn-2');
    const generateBtn = document.getElementById('generate-btn');
    const resetBtn = document.getElementById('reset-btn');

    // UI Elements
    const energySlider = document.getElementById('energy-level');
    const energyValue = document.getElementById('energy-value');
    const timeBtns = document.querySelectorAll('.time-btn');
    const timeOfInput = document.getElementById('time-of-day');

    let currentStep = 1;
    const userData = {};

    // Energy Slider Update
    energySlider.addEventListener('input', (e) => {
        energyValue.textContent = e.target.value;
    });

    // Time Selection
    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timeBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            timeOfInput.value = btn.dataset.time;
        });
    });

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
        userData.energy = parseInt(energySlider.value);
        showStep(3);
    });

    nextBtn2.addEventListener('click', () => {
        if (timeOfInput.value) {
            userData.time = timeOfInput.value;
            showStep(4);
        } else {
            alert('시간대를 선택해주세요!');
        }
    });

    generateBtn.addEventListener('click', () => {
        const avoidTask = document.getElementById('avoid-task').value;
        userData.avoidTask = avoidTask;
        generateAndShowResults();
        showStep(5);
    });

    resetBtn.addEventListener('click', () => {
        // Reset data and UI
        Object.keys(userData).forEach(key => delete userData[key]);
        energySlider.value = 50;
        energyValue.textContent = '50';
        timeBtns.forEach(b => b.classList.remove('selected'));
        timeOfInput.value = '';
        document.getElementById('avoid-task').value = '';
        document.getElementById('results-container').innerHTML = '';
        showStep(1);
    });

    function generateAndShowResults() {
        const { energy, time, avoidTask } = userData;
        
        // Filter tasks by energy level
        let availableTasks = tasks.filter(t => t.minEnergy <= energy);
        
        // If energy is high, make sure to include some "avoidTask" if it matches
        // Actually, let's just shuffle and pick 3
        let shuffled = availableTasks.sort(() => 0.5 - Math.random());
        let selectedTasks = shuffled.slice(0, 3);

        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        selectedTasks.forEach((task, i) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('result-card');
            taskDiv.style.animationDelay = `${i * 0.2}s`;
            
            const taskName = document.createElement('h3');
            taskName.textContent = task.name;
            
            taskDiv.appendChild(taskName);
            resultsContainer.appendChild(taskDiv);
        });

        // Show motivation message
        const motivationMsg = document.getElementById('motivation-msg');
        motivationMsg.textContent = motivations[Math.floor(Math.random() * motivations.length)];
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