
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //


const recipeSidebar = document.getElementById("recipeSelect");
const recipesSelector = document.getElementById("recipeSelect")
const searchButton = document.getElementById("searchButton")

// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

window.addEventListener('load', setupPage);
recipeSidebar.addEventListener("click", displayRecipe);
searchButton.addEventListener('click', searchRecipes);

// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~ //

function setupPage() {
    displayAllRecipes()
    displayRandomMainCard()
    displayRandomRecipeCards(1, 15)
    displayRandomRecipeCards(2, 7)
    displayRandomRecipeCards(3, 22)
    displayRandomRecipeCards(4, 11)
}

function displayAllRecipes() {
    // recipeData.forEach(recipe => {
    //     recipesSelector.insertAdjacentHTML('afterbegin', `<option class="all-recipes-list" id="${recipe.id}" value="default">${recipe.name}</option>`)
    // });
    displaySidebarRecipes(recipeData)
};

function displaySidebarRecipes(array) {
    recipesSelector.innerHTML = ""
    array.forEach(recipe => {
        recipesSelector.insertAdjacentHTML('afterbegin', `<option class="all-recipes-list" id="${recipe.id}" value="default">${recipe.name}</option>`)
    });
}

function displayRandomMainCard() {
    const randomIndex = getRandomIndex(recipeData);
    const randomRecipe = []
    randomRecipe.push(recipeData[randomIndex]);
    displayMainCard(randomRecipe)
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function displayRecipe() {
    const recipeID = event.target.id
    const matchingRecipe = recipeData.filter(recipe => {
        return recipe.id === parseInt(recipeID)
    })
    displayMainCard(matchingRecipe)
}

function displayMainCard(recipe) {
    const targetRecipe = new Recipe(recipe[0], ingredientsData)
    const instructions = targetRecipe.returnInstructions()
    const cost = targetRecipe.returnCost()
    const mainCardTitle = document.getElementById("mainName")
    const mainCardInstructions = document.getElementById("instructions")
    const mainCardCost = document.getElementById("cost")
    const mainCardImage = document.getElementById("mainCardImg")
    mainCardImage.src = `${recipe[0].image}`
    mainCardTitle.innerHTML = `${recipe[0].name}`
    mainCardInstructions.innerHTML = `${instructions.join(" ")}`
    mainCardCost.innerHTML = `Total Cost: ${cost}`
}

function displayRandomRecipeCards(cardNumber, i) {
    document.getElementById(`smallCardImg${cardNumber}`).src = `${recipeData[i].image}`
    document.getElementById(`smallName${cardNumber}`).innerHTML = `${recipeData[i].name}`
}

function searchRecipes() {
    const searchBar = document.getElementById("search");
    const newMutatedRecipes = recipeData.reduce((newRecipes, recipe) => {
        const mutatedRecipes = new Recipe(recipe, ingredientsData)
        newRecipes.push(mutatedRecipes)
        return newRecipes
    }, [])
    const allRecipes = new RecipeRepo(newMutatedRecipes)
    const recipeNameMatch = allRecipes.filterByName(searchBar.value.toLowerCase());
    const recipeIngredientMatch = allRecipes.filterByIngredient(searchBar.value.toLowerCase());
    let allSearchedRecipes = recipeNameMatch.concat(recipeIngredientMatch);
    let searchedRecipesToDisplay = [...new Set(allSearchedRecipes)];
    displaySidebarRecipes(searchedRecipesToDisplay);
}





// Issues :
// search is case sensative 
