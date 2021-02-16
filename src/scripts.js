
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
const checkIngredientsButton = document.getElementById("checkIngredientsButton");
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
cookNowButton.addEventListener("click", cookRecipe);
checkIngredientsButton.addEventListener("click", returnCookingInfo);
unFavoriteButton.addEventListener("click", unFavorite);
searchFavoritesButton.addEventListener('click', searchFavorites);
mainPageButton.addEventListener('click', displayMainPage)

// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~ //

function setupPage() {
    generateRandomUser();
    displayAllRecipes();
    displayRandomMainCard();
    // displayRandomRecipeCards(1, recipeData);
    // displayRandomRecipeCards(2, recipeData);
    // displayRandomRecipeCards(3, recipeData);
    // displayRandomRecipeCards(4, recipeData);
    buildLikeCards(recipeData);
}

function displayAllRecipes() {
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
    // newUser = new UserData(usersData[getRandomIndex(usersData)], RecipeRepo);
    newUser = new UserData(usersData[1], RecipeRepo);
    // console.log(newUser, RecipeRepo)
    newUser.pantry = new Pantry(newUser, ingredientsData)
}

function displayRecipe() {
    const recipeID = event.target.id
    const matchingRecipe = recipeData.filter(recipe => {
        return recipe.id === parseInt(recipeID)
    })
    displayMainCard(matchingRecipe)
    changeToCookButton()
    checkIfFavorited()
}

function displayMainCard(recipe) {
  const list = likeList(recipe)
  buildLikeCards(list);
    const targetRecipe = new Recipe(recipe[0], ingredientsData)
    // let targetRecipe = currentRecipe
    currentRecipe = targetRecipe;
    // checkIfFavorited()
    // changeToCookButton()
    // checkIfCookable
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

function likeList(recipe) {
  let list = [];
  recipeData.forEach(rec => {
    if (rec.tags.includes(recipe[0].tags[0])) {
      list.push(rec);
    };
  });
  return list;
}

function checkIfFavorited() {
    if (newUser.favoriteRecipes.recipes.some(favRec => favRec.id === currentRecipe.id)) {
        hide('favButton', true)
        hide('unFavoriteButton', false)
    } else {
        hide('favButton', false)
        hide('unFavoriteButton', true)
    }
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

function buildLikeCards(items) {
  for (let i = 1; i <= 4; i++) {
    const index = getRandomIndex(items);
    document.getElementById(`smallCardImg${i}`).src = `${items[index].image}`
    document.getElementById(`smallName${i}`).innerHTML = `${items[index].name}`
  }
}

// function displayRandomRecipeCards(cardNumber, array) {
//     const index = getRandomIndex(array);
//     document.getElementById(`smallCardImg${cardNumber}`).src = `${recipeData[index].image}`
//     document.getElementById(`smallName${cardNumber}`).innerHTML = `${recipeData[index].name}`
// }

function searchRecipes() {
    search(recipeData, recipesSelector);
    // const allRecipes = setUpData(recipeData)
    // const recipeNameMatch = searchNames(allRecipes, searchBar)
    // const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
    // const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
    // displaySidebarRecipes(searchedRecipesToDisplay, recipesSelector);
}

function searchFavorites() {
    search(newUser.favoriteRecipes.recipes, userRecipesSelector);
    // const allRecipes = setUpData(newUser.favoriteRecipes.recipes)
    // const recipeNameMatch = searchNames(allRecipes, searchBar)
    // const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
    // const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
    // displaySidebarRecipes(searchedRecipesToDisplay, userRecipesSelector);
}

function search(list, display) {
  const allRecipes = setUpData(list)
  const recipeNameMatch = searchNames(allRecipes, searchBar)
  const recipeIngredientMatch = searchIngredients(allRecipes, searchBar);
  const searchedRecipesToDisplay = compareNamesIngredients(recipeNameMatch, recipeIngredientMatch)
  displaySidebarRecipes(searchedRecipesToDisplay, display);
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

function searchTags(list) {
  const allRecipes = setUpData(list)
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
        changeToCookButton()
    }
}

function changeToCookButton() {
    if (newUser.recipeToCook.recipes.some(toCook => toCook.id === currentRecipe.id)) {
        hide('toCookButton', true);
        if (newUser.pantry.userCanCook(currentRecipe)) {
            console.log("options1")
            // hide('toCookButton', true);
            hide('cookNowButton', false);
            hide('checkIngredientsButton', true)
        } else {
            console.log("options2")
            hide('cookNowButton', true);
            hide('checkIngredientsButton', false)
        }
    } else {
        console.log("options3")
        hide('toCookButton', false);
        hide('cookNowButton', true);
        hide('checkIngredientsButton', true);
    }
}

function saveToFav() {
    if (!newUser.favoriteRecipes.recipes.includes(currentRecipe)) {
        newUser.addRecipe(currentRecipe, "favoriteRecipes");
    }
    checkIfFavorited()
}

function unFavorite() {
  newUser.removeRecipe(currentRecipe, "favoriteRecipes");
  displaySidebarRecipes(newUser.recipeToCook.recipes, userRecipesSelector)
  checkIfFavorited()
  displayFavoritedRecipes()
}

function displayUserPage() {
    displayUserSidebar();
    displayFavoritedRecipes();
    userButtonOptions();
    // checkIfCookable()
}

function userButtonOptions() {
    // hide('toCookButton', true);
    hide('searchButton', true);
    hide('searchByTagsButton', true);
    // hide('cookNowButton', false);
    hide('searchFavoritesButton', false);
    hide('tagsFavoriteButton', false);
}

// function checkIfCookable() {
//     if (!displayCanCook()) {
//         cookNowButton.innerHTML = 'Check Ingredients'
//     }
// }

function checkIfCookable() {
    console.log("currentRecipe", currentRecipe)
    if (currentRecipe.canCook) {
        console.log("you can cook it!")
    } else {
        console.log("you can't cook")
    }
}

//check current displayed recipe to see if canCook === true or false 

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
    displaySidebarRecipes(newUser.recipeToCook.recipes, userRecipesSelector);
}

function displayPantry() {
    userRecipesSelector.innerHTML = ""
    newUser.pantry.pantryItems.forEach(item => {
        let amountDisplay = `${item.name} x${item.amount}`
        userRecipesSelector.insertAdjacentHTML('afterbegin', `<option class="all-recipes-list" id="${item.id}" value="default">${amountDisplay}</option>`)
    });
}

function cookRecipe() {
    newUser.pantry.itemsToCook(currentRecipe);
    displayPantry();
    removeRecipe()
    changeToCookButton();
}

function removeRecipe() {
    let index = newUser.recipeToCook.recipes.findIndex(recipe => {
        return recipe.id === currentRecipe.id
    })
    newUser.recipeToCook.recipes.splice(index, 1)
}

function returnCookingInfo() {
    const mainCardInstructions = document.getElementById("instructions")
    mainCardInstructions.innerHTML = `Not enough ingredients! You need: ${newUser.pantry.whatsMissing(currentRecipe).join(" ")}`
}

function displayMainPage() {
    displayMainSidebar();
    mainButtonOptions();
}

function mainButtonOptions() {
    hide('toCookButton', false);
    // hide('favButton', false);
    hide('searchButton', false);
    hide('searchByTagsButton', false);
    hide('cookNowButton', true);
    // hide('unFavoriteButton', true);
    hide('searchFavoritesButton', true);
    hide('tagsFavoriteButton', true);
}


// take off functionality that changes the favorites button 
// so every time we display a card it should show favorites
// every time we display the main card we need to 
    // 1. See if it's favorited and change the button accoridngly 
    // if it is not favorited we need to be able to push to favorite and upate our favoites array 
    // if it is in favorites we need to remove 