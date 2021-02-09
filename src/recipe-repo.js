class RecipeRepo {
    constructor(recipes) {
        this.recipes = recipes;
    }

    filterByIngredient(ingredient) {
        this.filter(ingredient)
        // filter through 
    }

    filterByTag(tag) {
        this.filter(tag)
        // filter through all of the recipes
        // use .includes to check if recipes.tags.includes(tag)
        // .filter should returna filtered down array of recipes that meet the criterea 
    }
}

module.exports = RecipeRepo;
