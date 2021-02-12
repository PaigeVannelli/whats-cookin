
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //

const recipeSidebar = document.getElementById("recipeSelect");
const recipesSelector = document.getElementById("recipeSelect")

// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

window.addEventListener('load', setupPage)
recipeSidebar.addEventListener("click", displayRecipe)

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
    recipeData.forEach(recipe => {
        recipesSelector.insertAdjacentHTML('afterbegin', `<option class="all-recipes-list" id="${recipe.id}" value="default">${recipe.name}</option>`)
    });
};

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

// function pickRandomCards()

function displayRandomRecipeCards(cardNumber, i) {
    document.getElementById(`smallCardImg${cardNumber}`).src = `${recipeData[i].image}`
    document.getElementById(`smallName${cardNumber}`).innerHTML = `${recipeData[i].name}`
}





// 2. get random other recipes to display on cards below 
    // pick one recipe and display it on one card 

//     <article class="small-card">
//     <img class="small-card-img" id="smallCardImg" src="https://spoonacular.com/recipeImages/595736-556x370.jpg" alt="To input with dom"></img>
//     <div class="like-header">
//       <h4 class="small-name" id="smallName">Like Item name<h2>
//     </div>
//       <p class="small-disc" id="smallDisc">try these</p>
//   </article>
// 3. filter through recipes by name
