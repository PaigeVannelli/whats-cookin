
const ingredientsData = require('../data/ingredients');
class Recipe {
    constructor(recipe = {}) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.ingredients = this.getIngredientsInfo(recipe.ingredients);
        this.instructions = recipe.instructions;
        this.name = recipe.name;
        this.tags = recipe.tags;
    }

    getIngredientsInfo(recipeIngredients) {
        let updatedIngredientInfo = recipeIngredients.map(ingredient => {
            const ingredientInfo = ingredientsData.find(ingredientObject => {
                return ingredient.id === ingredientObject.id
            })
            let currentIngredient = ingredient;
            currentIngredient.name =ingredientInfo.name
            currentIngredient.estimatedCostInCents = ingredientInfo.estimatedCostInCents
            return currentIngredient
        })
        return updatedIngredientInfo
    }

    returnIngredients() {
        const ingredientNames = this.ingredients.map(ingredient => {
            return ingredient.name;
        })
        return ingredientNames;
    }

    returnCost() {
        const totalCost = this.ingredients.reduce((total, ingredient) => {
            return total += ingredient.quantity.amount * ingredient.estimatedCostInCents;
        }, 0)
        let dollars = totalCost / 100
        dollars = dollars.toLocaleString("en-US", {style:"currency", currency:"USD"})
        return dollars;
    }

    returnInstructions() {
        console.log(this.instructions)
    }
}

module.exports = Recipe;