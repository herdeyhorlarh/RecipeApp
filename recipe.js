document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchRecipes(query);
    }
});

async function fetchRecipes(query) {
    const appId = '52e55353';  // Replace with your actual App ID
    const appKey = '71c74c9f99fcf4ecbac95648df868d75'; // Replace with your actual App Key
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <h3>${recipe.label}</h3>
            <p><strong>Calories:</strong> ${Math.round(recipe.calories)}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}
