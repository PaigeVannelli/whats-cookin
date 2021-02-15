
class Recipe {
    constructor(recipe = {}, ingredientsData) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.ingredients = this.getIngredientsInfo(recipe.ingredients, ingredientsData);
        this.instructions = recipe.instructions;
        this.name = recipe.name;
        this.tags = recipe.tags;
        this.canCook = false;
    }

    getIngredientsInfo(recipeIngredients, ingredientsData) {
      const uniqueIngredients = this.filterOutDuplicates(recipeIngredients);
      let updatedIngredientInfo = uniqueIngredients.map(ingredient => {
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

    filterOutDuplicates(recipeIngredients) {
      let uniqueIngredients = [];
      let sortedIngredients = recipeIngredients.sort((a, b) => {
        return a.quantity.amount - b.quantity.amount
      })
      sortedIngredients.forEach(ing => {
        if (!uniqueIngredients.some(uniqIng => uniqIng.id === ing.id)) {
          uniqueIngredients.push(ing)
        }
      })
      return uniqueIngredients
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
    dollars = dollars.toLocaleString("en-US", { style: "currency", currency: "USD"})
    return dollars;
  }

  returnInstructions() {
    const instructionsList = this.instructions.map(instruction => {
      return `${instruction.number}: ${instruction.instruction}`;
    })
    return instructionsList;
  }
}

module.exports = Recipe;
