// const {recipeTestData} = require("../data/test-data");

// const Recipe = require("./recipe");
console.log('wtf', Recipe)

console.log('Hello world');
//DOM manipulation 
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //

const recipeSidebar = document.getElementById("recipeSelect");
// const firstRecipe = document.getElementById("595736")
const recipesSelector = document.getElementById("recipeSelect")

// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

// an event listener on load that loads all of our recipe names on to the side bar 
// even listener on load that logs us in as a user 
//1. write event listener to add data
// edit the html and CSS  to set a framework for what I might want on page load 
window.addEventListener('load', setupPage)
recipeSidebar.addEventListener("click", displayRecipe)

//onpage load target the html and += 
// target the item before by id
// insert adjescent html as a function OR try += 
//<option class="all-recipes-list" id="595736" value="default">Loaded Chocolate Chip Pudding Cookie Cups</option>


// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~ //


function setupPage() {
    recipeData.forEach(recipe => {
        recipesSelector.insertAdjacentHTML('afterbegin', `<option class="all-recipes-list" id="${recipe.id}" value="default">${recipe.name}</option>`)
    });
}

function displayRecipe() {
    const recipeID = event.target.id
    const matchingRecipe = recipeData.filter(recipe => {
        return recipe.id === parseInt(recipeID)
    })
    displayMainCard(matchingRecipe)
}

function displayMainCard(recipe) {
    const targetRecipe = new Recipe(recipe[0])
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




