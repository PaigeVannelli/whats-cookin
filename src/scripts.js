
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
const cookNowButton = document.getElementById("cookNowButton");
const checkIngredientsButton = document.getElementById("checkIngredientsButton");
const unFavoriteButton = document.getElementById("unFavoriteButton");
const searchFavoritesButton = document.getElementById("searchFavoritesButton");
const mainPageButton = document.getElementById("whatsButton");
const likeItems = document.getElementById("likeItems");

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
toCookButton.addEventListener('click', saveToCook);
favButton.addEventListener("click", saveToFav);
cookNowButton.addEventListener("click", cookRecipe);
checkIngredientsButton.addEventListener("click", returnCookingInfo);
unFavoriteButton.addEventListener("click", unFavorite);
searchFavoritesButton.addEventListener('click', searchFavorites);
mainPageButton.addEventListener('click', displayMainPage);
likeItems.addEventListener('click', moveToMainCard);

// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~ //

function setupPage() {
  generateRandomUser();
  displayAllRecipes();
  displayRandomMainCard();
  buildLikeCards(recipeData);
}

function displayAllRecipes() {
  displaySidebarRecipes(recipeData, recipesSelector);
}

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
  // newUser = new UserData(usersData[1], RecipeRepo);
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

function likeList(recipe) {
  let list = [];
  recipeData.forEach(rec => {
    if (rec.tags.includes(recipe[0].tags[0]) || rec.id === recipe[0].id) {
      list.push(rec);
    };
  });
  list.push(recipeData[getRandomIndex(recipeData)]);
  list.push(recipeData[getRandomIndex(recipeData)]);
  list.push(recipeData[getRandomIndex(recipeData)]);
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

function buildLikeCards(items) {
  likeItems.innerHTML = ""
  for (let i = 0; i <= 3; i++) {
    likeItems.insertAdjacentHTML('afterbegin',`<article class="small-card"        id="${items[i].id}">
    <img class="small-card-img" id="${items[i].id}" src="${items[i].image}" alt="${items[i].name}"></img>
    <div class="like-header" id=${items[i].id}>
    <h4 class="small-name" id=${items[i].id}>${items[i].name}<h4>
    </div>
    </article>`)
  }
}

function moveToMainCard() {
  const moveMain = event.target.id;
  const recipeIndex = recipeData.findIndex(recipe => recipe.id == moveMain);
  displayMainCard([recipeData[recipeIndex]]);
  changeToCookButton()
  checkIfFavorited()
}

function searchRecipes() {
  search(recipeData, recipesSelector);
}

function searchFavorites() {
  search(newUser.favoriteRecipes.recipes, userRecipesSelector);
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
      hide('cookNowButton', false);
      hide('checkIngredientsButton', true)
    } else {
      hide('cookNowButton', true);
      hide('checkIngredientsButton', false)
    }
  } else {
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
}

function userButtonOptions() {
  hide('searchButton', true);
  hide('searchByTagsButton', true);
  hide('searchFavoritesButton', false);
  hide('tagsFavoriteButton', false);
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
  changeToCookButton()
}

function mainButtonOptions() {
  hide('toCookButton', false);
  hide('searchButton', false);
  hide('searchByTagsButton', false);
  hide('cookNowButton', true);
  hide('searchFavoritesButton', true);
  hide('tagsFavoriteButton', true);
}
