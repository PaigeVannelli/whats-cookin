
const ingredientsData = require('../data/ingredients');
class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.ingredients = this.getIngredientsInfo(recipe.ingredients);
        this.instructions = recipe.instructions;
        this.name = recipe.name;
        this.tags = recipe.tags;
    }

    getIngredientsInfo(array) {
        let ingredientNames = array.map(ingredient => {
            const ingredientInfo = ingredientsData.find(ingredientObject => {
                return ingredient.id === ingredientObject.id
            })
            let currentIngredient = ingredient;
            currentIngredient.name =ingredientInfo.name
            currentIngredient.estimatedCostInCents = ingredientInfo.estimatedCostInCents
            return currentIngredient
        })
        return ingredientNames
    }

    returnIngredients() {
        //We gave an array and need to target each id in the array 
        // we need to return a new mutated array of the same length 
        // new array should just be a list of names 
        // 1. if ingredient.id === ingredients.id
        //return ingredients.name 
        // iterate through ingredients
        console.log(this.ingredients[0].name)

        // let ingredientNames = this.ingredients.map(ingredient => {
        //     const ingredientInfo = ingredientsData.find(ingredientObject => {
        //         return ingredient.id === ingredientObject.id
        //     })
        //     let currentIngredient = ingredient;
        //     currentIngredient.name =ingredientInfo.name
        //     currentIngredient.estimatedCostInCents = ingredientInfo.estimatedCostInCents
        //     return currentIngredient
        // })
        // console.log(ingredientNames)
        // return ingredientNames
        // console.log(this.ingredients)
    }

    returnCost() {
        // return a total meal cost 
        // change to dollar amount 
    }

    returnInstructions() {
        // return instructions 
    }
}

//constructor with: id (number), image (file path), ingredients (array of objects), 
//instructions (array of objects w two keys), name (string), tags (array of strings) 
//methods: helper function to filter list by: name or ingredients
module.exports = Recipe;