// script.js
document.addEventListener('DOMContentLoaded', () => {
    const exerciseForm = document.getElementById('exercise-form');
    const exerciseList = document.getElementById('exercise-list');
    const calorieForm = document.getElementById('calorie-form');
    const calorieList = document.getElementById('calorie-list');

    const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
    const calories = JSON.parse(localStorage.getItem('calories')) || [];

    const saveExercises = () => localStorage.setItem('exercises', JSON.stringify(exercises));
    const saveCalories = () => localStorage.setItem('calories', JSON.stringify(calories));

    const renderExercises = () => {
        if (exerciseList) {
            exerciseList.innerHTML = exercises.map((exercise, index) => `
                <li>
                    ${exercise.name} - ${exercise.duration} minutes
                    <button data-index="${index}" class="delete-exercise">Delete</button>
                </li>
            `).join('');
        }
    };

    const renderCalories = () => {
        if (calorieList) {
            calorieList.innerHTML = calories.map((calorie, index) => `
                <li>
                    ${calorie.food} - ${calorie.amount} calories
                    <button data-index="${index}" class="delete-calorie">Delete</button>
                </li>
            `).join('');
        }
    };

    if (exerciseForm) {
        exerciseForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const exerciseName = document.getElementById('exercise-name').value;
            const exerciseDuration = document.getElementById('exercise-duration').value;
            exercises.push({ name: exerciseName, duration: exerciseDuration });
            saveExercises();
            renderExercises();
            exerciseForm.reset();
        });

        exerciseList.addEventListener('click', (event) => {
            if (event.target.matches('.delete-exercise')) {
                const index = event.target.dataset.index;
                exercises.splice(index, 1);
                saveExercises();
                renderExercises();
            }
        });

        renderExercises();
    }

    if (calorieForm) {
        calorieForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const calorieFood = document.getElementById('calorie-food').value;
            const calorieAmount = document.getElementById('calorie-amount').value;
            calories.push({ food: calorieFood, amount: calorieAmount });
            saveCalories();
            renderCalories();
            calorieForm.reset();
        });

        calorieList.addEventListener('click', (event) => {
            if (event.target.matches('.delete-calorie')) {
                const index = event.target.dataset.index;
                calories.splice(index, 1);
                saveCalories();
                renderCalories();
            }
        });

        renderCalories();
    }

    if (document.getElementById('exercise-chart') && document.getElementById('calorie-chart')) {
        const ctxExercise = document.getElementById('exercise-chart').getContext('2d');
        const ctxCalorie = document.getElementById('calorie-chart').getContext('2d');

        const renderCharts = () => {
            new Chart(ctxExercise, {
                type: 'bar',
                data: {
                    labels: exercises.map(e => e.name),
                    datasets: [{
                        label: 'Exercise Duration (minutes)',
                        data: exercises.map(e => e.duration),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            new Chart(ctxCalorie, {
                type: 'bar',
                data: {
                    labels: calories.map(c => c.food),
                    datasets: [{
                        label: 'Calories',
                        data: calories.map(c => c.amount),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        renderCharts();
    }
});
