
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //

const recipeSidebar = document.getElementById("mainSideBar");
const recipesSelector = document.getElementById("mainRecipeSelect")
const searchButton = document.getElementById("searchButton")
const searchByTagsButton = document.getElementById("searchByTagsButton");
const searchBar = document.getElementById("search")
const userPageButton = document.getElementById("userPageButton");
const displayFavoritesButton = document.getElementById("displayFavoritesButton");
const displayToCookButton = document.getElementById("displayToCookButton");
const displayPantryButton = document.getElementById("displayPantryButton");
const userRecipesSelector = document.getElementById("userRecipeSelect");
const userRecipeSidebar = document.getElementById("userSideBar");
const toCookButton = document.getElementById("toCookButton");
const favButton = document.getElementById("favButton");
let newUser = {}
let currentRecipe
// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

window.addEventListener('load', setupPage);
recipeSidebar.addEventListener("click", displayRecipe);
searchButton.addEventListener('click', searchRecipes);
searchByTagsButton.addEventListener('click', searchByTags);
userPageButton.addEventListener('click', displayUserPage);
displayFavoritesButton.addEventListener('click', displayFavoritedRecipes);
displayToCookButton.addEventListener('click', displayToCookRecipes);
displayPantryButton.addEventListener('click', displayPantry);
userRecipeSidebar.addEventListener("click", displayRecipe);
toCookButton.addEventListener("click", saveToCook);
favButton.addEventListener("click", saveToFav);


// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~ //

function setupPage() {
    displayAllRecipes();
    displayRandomMainCard();
    generateRandomUser();
    displayRandomRecipeCards(1, recipeData);
    displayRandomRecipeCards(2, recipeData);
    displayRandomRecipeCards(3, recipeData);
    displayRandomRecipeCards(4, recipeData);
}

function displayAllRecipes() {
    // console.log(recipesSelector)
    displaySidebarRecipes(recipeData, recipesSelector);
};

function displaySidebarRecipes(array, displayArea) {
    displayArea.innerHTML = ""
    array.forEach(recipe => {
        displayArea.insertAdjacentHTML('afterbegin', `<option class="all-recipes-list" id="${recipe.id}" value="default">${recipe.name}</option>`)
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

function generateRandomUser() {
    newUser = new UserData(usersData[getRandomIndex(usersData)], RecipeRepo);
    newUser.pantry = new Pantry(newUser, ingredientsData)
    // newUser.favoriteRecipes.recipes = [recipeData[5]]
    // newUser.recipeToCook.recipes = [recipeData[3]]
    console.log(newUser)
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
    currentRecipe = targetRecipe;
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

function displayRandomRecipeCards(cardNumber, array) {
    const index = getRandomIndex(array);
    document.getElementById(`smallCardImg${cardNumber}`).src = `${recipeData[index].image}`
    document.getElementById(`smallName${cardNumber}`).innerHTML = `${recipeData[index].name}`
}

function searchRecipes() {
    const allRecipes = setUpData()
    const recipeNameMatch = searchNames(allRecipes, searchBar)
    const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
    const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
    displaySidebarRecipes(searchedRecipesToDisplay, recipesSelector);
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
    displaySidebarRecipes(recipesToDisplay, recipesSelector);
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

function saveToCook() {
  if (!newUser.recipeToCook.recipes.includes(currentRecipe)) {
  newUser.addRecipe(currentRecipe, "recipeToCook");
  }
}

function saveToFav() {
  if (!newUser.favoriteRecipes.recipes.includes(currentRecipe)) {
    newUser.addRecipe(currentRecipe, "favoriteRecipes");
  }
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

function displayFavoritedRecipes() {
    displaySidebarRecipes(newUser.favoriteRecipes.recipes, userRecipesSelector)
}

function displayToCookRecipes() {

    displaySidebarRecipes(newUser.recipeToCook.recipes, userRecipesSelector)
}

function displayPantry() {
  console.log(newUser.pantry.pantryItems);
    displaySidebarRecipes(newUser.pantry.pantryItems, userRecipesSelector)
}

//need to change recipe title upon filtering
