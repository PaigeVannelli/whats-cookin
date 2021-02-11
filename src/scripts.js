
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //

const recipeSidebar = document.getElementById("recipeSelect");
const recipesSelector = document.getElementById("recipeSelect")

// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

window.addEventListener('load', setupPage)
recipeSidebar.addEventListener("click", displayRecipe)

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




