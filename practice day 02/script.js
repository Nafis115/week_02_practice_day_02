document.getElementById('search-button').addEventListener('click', searchMeals);

function searchMeals() {
    const searchInput = document.getElementById('search-input').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(res => res.json())
        .then(data => displayMeals(data.meals));
}

function displayMeals(meals) {

    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = '';

    if (meals === null) {
        mealList.innerHTML = '<p>No meals found</p>';
        return;
    }

    meals.forEach(meal => {
        const mealItem = document.createElement('p');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-thumb">
            <h3>${meal.strMeal}</h3>
            <button onclick="getMealDetails(${meal.idMeal})">Details</button>
        `;
        mealList.appendChild(mealItem);
    });
}

function getMealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]));
}

function displayMealDetails(meal) {
    const mealDetails = document.getElementById('meal-details');
    const mealDetailsOverlay = document.getElementById('meal-details-1');
    mealDetails.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions.slice(0,100)}</p>
        <button onclick="closeDetails()">Close</button>
    `;
    mealDetails.style.display = 'block';
    mealDetailsOverlay.style.display = 'block';
}

function closeDetails() {
    const mealDetails = document.getElementById('meal-details');
    const mealDetailsOverlay = document.getElementById('meal-details-1');
    mealDetails.style.display = 'none';
    mealDetailsOverlay.style.display = 'none';
}

document.addEventListener('', () => {
    document.getElementById('search-button').addEventListener('click', searchMeals);
});
