
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //


const recipeSidebar = document.getElementById("recipeSelect");
const recipesSelector = document.getElementById("recipeSelect")
const searchButton = document.getElementById("searchButton")
const searchByTagsButton = document.getElementById("searchByTagsButton");
const searchBar = document.getElementById("search")
const userPageButton = document.getElementById("userPageButton");

// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

window.addEventListener('load', setupPage);
recipeSidebar.addEventListener("click", displayRecipe);
searchButton.addEventListener('click', searchRecipes);
searchByTagsButton.addEventListener('click', searchByTags);
userPageButton.addEventListener('click', displayUserPage);

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
    const allRecipes = setUpData()
    const recipeNameMatch = searchNames(allRecipes, searchBar)
    const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
    const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
    displaySidebarRecipes(searchedRecipesToDisplay);
}

function setUpData() {
    const newMutatedRecipes = recipeData.reduce((newRecipes, recipe) => {
        const mutatedRecipes = new Recipe(recipe, ingredientsData)
        newRecipes.push(mutatedRecipes)
        return newRecipes
    }, [])
    return new RecipeRepo(newMutatedRecipes)
}

function searchNames(recipes, searchBar) {
    const recipeNameMatch = recipes.filterByName(searchBar.value.toLowerCase());
    return recipeNameMatch
}

function searchIngredients(recipes, searchBar) {
    const recipeIngredientMatch = recipes.filterByIngredient(searchBar.value.toLowerCase());
    return recipeIngredientMatch
}

function compareNamesIngredients(recipeNameMatch, recipeIngredientMatch) {
    let allSearchedRecipes = recipeNameMatch.concat(recipeIngredientMatch);
    let searchedRecipesToDisplay = [...new Set(allSearchedRecipes)];
    return searchedRecipesToDisplay
}

function searchByTags() {
    const allRecipes = setUpData()
    const checkedTags = checkTags()
    const recipesToDisplay = searchTags(checkedTags, allRecipes);
    displaySidebarRecipes(recipesToDisplay);
}

function checkTags() {
    var test = document.querySelectorAll('input[type="checkbox"]');
    let checkedTags = []
    test.forEach(tag => {
        if (tag.checked) {
            checkedTags.push(tag.name)
        }
    })
    return checkedTags
}

function searchTags(tags, recipes) {
    const recipeTagsMatch = recipes.filterByTag(tags);
    return recipeTagsMatch
}







function displayUserPage() {
    displayUserPage();
    displayPantryItems();
    displayFavoritedRecipes();
    displayRecipesToCook();
}

function displayUserPage() {
    hide('mainSideBar', true);
    hide('userSideBar', false);
}

function hide(element, hidden) {
    if (hidden) {
        document.getElementById(element).classList.add('hidden')
    } else {
        document.getElementById(element).classList.remove('hidden')
    }
}

functio

//need to change recipe title upon filtering 