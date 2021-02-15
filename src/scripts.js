
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //

const recipeSidebar = document.getElementById("mainSideBar");
const recipesSelector = document.getElementById("mainRecipeSelect")
const searchButton = document.getElementById("searchButton")
const searchByTagsButton = document.getElementById("searchByTagsButton");
const tagsFavoriteButton = document.getElementById("tagsFavoriteButton");
const searchBar = document.getElementById("search")
const userPageButton = document.getElementById("userPageButton");
const displayFavoritesButton = document.getElementById("displayFavoritesButton");
const displayToCookButton = document.getElementById("displayToCookButton");
const displayPantryButton = document.getElementById("displayPantryButton");
const userRecipesSelector = document.getElementById("userRecipeSelect");
const userRecipeSidebar = document.getElementById("userSideBar");
const toCookButton = document.getElementById("toCookButton");
const favButton = document.getElementById("favButton");
const cookNowButton = document.getElementById("cookNowButton");
const unFavoriteButton = document.getElementById("unFavoriteButton");
const searchFavoritesButton = document.getElementById("searchFavoritesButton");
const mainPageButton = document.getElementById("whatsButton")

let newUser = {}
let currentRecipe
// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

window.addEventListener('load', setupPage);
recipesSelector.addEventListener("click", displayRecipe);
searchButton.addEventListener('click', searchRecipes);
searchByTagsButton.addEventListener('click', searchByTags);
tagsFavoriteButton.addEventListener('click', searchFavoritesByTags);
userPageButton.addEventListener('click', displayUserPage);
displayFavoritesButton.addEventListener('click', displayFavoritedRecipes);
displayToCookButton.addEventListener('click', displayToCookRecipes);
displayPantryButton.addEventListener('click', displayPantry);
userRecipesSelector.addEventListener("click", displayRecipe);
toCookButton.addEventListener("click", saveToCook);
favButton.addEventListener("click", saveToFav);
cookNowButton.addEventListener("click", returnCookingInfo);
unFavoriteButton.addEventListener("click", unFavorite);
searchFavoritesButton.addEventListener('click', searchFavorites);
mainPageButton.addEventListener('click', displayMainPage)

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
}

function displayRecipe() {
    const recipeID = event.target.id
    const matchingRecipe = recipeData.filter(recipe => {
        return recipe.id === parseInt(recipeID)
    })
    displayMainCard(matchingRecipe)
    checkFavoritesButton()
}

function displayMainCard(recipe) {
    const targetRecipe = new Recipe(recipe[0], ingredientsData)
    // let targetRecipe = currentRecipe
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

// function checkFavoritesButton() {
    // console.log(newUser.favoriteRecipes.recipes.includes(currentRecipe))
    // if (!newUser.favoriteRecipes.recipes.includes(currentRecipe)) {
    //     console.log("false")
    //     hide('favButton', false);
    //     hide('unFavoriteButton', true);
    // } else if (newUser.favoriteRecipes.recipes.includes(currentRecipe)) {
    //     console.log("true")
    //     hide('favButton', true);
    //     hide('unFavoriteButton', false);
    // }
// }

function displayRandomRecipeCards(cardNumber, array) {
    const index = getRandomIndex(array);
    document.getElementById(`smallCardImg${cardNumber}`).src = `${recipeData[index].image}`
    document.getElementById(`smallName${cardNumber}`).innerHTML = `${recipeData[index].name}`
}

// function searchRecipes() {
//     const allRecipes = setUpData()
//     const recipeNameMatch = searchNames(allRecipes, searchBar)
//     const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
//     const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
//     displaySidebarRecipes(searchedRecipesToDisplay, recipesSelector);
// }

function searchRecipes() {
    const allRecipes = setUpData(recipeData)
    const recipeNameMatch = searchNames(allRecipes, searchBar)
    const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
    const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
    displaySidebarRecipes(searchedRecipesToDisplay, recipesSelector);
}

function searchFavorites() {
    const allRecipes = setUpData(newUser.favoriteRecipes.recipes)
    const recipeNameMatch = searchNames(allRecipes, searchBar)
    const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
    const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
    displaySidebarRecipes(searchedRecipesToDisplay, userRecipesSelector);
}

function setUpData(recipesToSearch) {
    const newMutatedRecipes = recipesToSearch.reduce((newRecipes, recipe) => {
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
    const allRecipes = setUpData(recipeData)
    const checkedTags = checkTags()
    const recipesToDisplay = searchTags(checkedTags, allRecipes);
    displaySidebarRecipes(recipesToDisplay, recipesSelector);
}

function searchFavoritesByTags() {
    const allRecipes = setUpData(newUser.favoriteRecipes.recipes)
    const checkedTags = checkTags()
    const recipesToDisplay = searchTags(checkedTags, allRecipes);
    displaySidebarRecipes(recipesToDisplay, userRecipesSelector);
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

function unFavorite() {
  newUser.removeRecipe(currentRecipe, "favoriteRecipes");
  displaySidebarRecipes(newUser.recipeToCook.recipes, userRecipesSelector)
  displayFavoritedRecipes()
}


function displayUserPage() {
    displayUserSidebar();
    displayFavoritedRecipes();
    userButtonOptions();
}

function userButtonOptions() {
    hide('toCookButton', true);
    hide('favButton', true);
    hide('searchButton', true);
    hide('searchByTagsButton', true);
    hide('cookNowButton', false);
    checkIfCookable()
    hide('unFavoriteButton', false);
    hide('searchFavoritesButton', false);
    hide('tagsFavoriteButton', false);
}

function checkIfCookable() {
    if (!displayCanCook()) {
        cookNowButton.innerHTML = 'Check Ingredients'
    }
}

function displayUserSidebar() {
    hide('mainSideBar', true);
    hide('userSideBar', false);
}

function displayMainSidebar() {
    hide('mainSideBar', false);
    hide('userSideBar', true);
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
    // displayCanCook()
    displaySidebarRecipes(newUser.recipeToCook.recipes, userRecipesSelector);
}

function displayPantry() {
  console.log(newUser.pantry.pantryItems);
    displaySidebarRecipes(newUser.pantry.pantryItems, userRecipesSelector)
}

function displayCanCook() {
    newUser.recipeToCook.recipes.forEach(recipe => {
        recipe.canCook = newUser.pantry.userCanCook(recipe)
    })
}

function returnCookingInfo() {
    const mainCardInstructions = document.getElementById("instructions")
    if (displayCanCook()) {
        console.log("ingredients")
        const ingredientsToRemove = newUser.pantry.itemsToCook(currentRecipe)
        console.log(ingredientsToRemove)
    } else if (!displayCanCook()) {
        console.log(newUser.pantry.whatsMissing(currentRecipe))
        mainCardInstructions.innerHTML = `Not enough ingredients! You need: ${newUser.pantry.whatsMissing(currentRecipe).join(" ")}`
    }
}

function displayMainPage() {
    displayMainSidebar();
    mainButtonOptions();
}

function mainButtonOptions() {
    hide('toCookButton', false);
    hide('favButton', false);
    hide('searchButton', false);
    hide('searchByTagsButton', false);
    hide('cookNowButton', true);
    hide('unFavoriteButton', true);
    hide('searchFavoritesButton', true);
    hide('tagsFavoriteButton', true);
}
