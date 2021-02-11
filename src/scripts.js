// const {recipeTestData} = require("../data/test-data");

console.log('Hello world');
//DOM manipulation 
// ~~~~~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~~~~~~~ //

const recipeSidebar = document.getElementById("recipeSelect");
const firstRecipe = document.getElementById("595736")

// ~~~~~~~~~~~~~~ EVENT LISTENERS ~~~~~~~~~~~~~~~~ //

// an event listener on load that loads all of our recipe names on to the side bar 
// even listener on load that logs us in as a user 
//1. write event listener to add data
// edit the html and CSS  to set a framework for what I might want on page load 
// window.addEventListener('load', setupPage)
recipeSidebar.addEventListener("click", displayRecipe)

//onpage load target the html and += 
// target the item before by id
// insert adjescent html as a function OR try += 
//<option class="all-recipes-list" id="595736" value="default">Loaded Chocolate Chip Pudding Cookie Cups</option>


// ~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~ //


function setupPage() {
    recipeTestData.forEach(recipe => {
        firstRecipe.insertAdjacentHTML('afterend', `<option class="all-recipes-list" id="${recipe.id}" value="default">${recipe.name}</option>`)
    });
    // I need to iterate through all of my recipe data 
    // forEach loop
    // for each I want to do the obove functiuonality interpolating in id and name
}

function displayRecipe() {
    console.log(event.target.id)
}



