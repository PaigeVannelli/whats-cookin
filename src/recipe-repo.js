class RecipeRepo {
    constructor(recipes) {
        this.recipes = recipes;
    }

    filterByIngredient(ingredient) {
        this.filter(ingredient)
        // filter through all recipes  
    }

    filterByTag(tags) {
        const recipesWithTag = this.recipes.filter(recipe => {
            for (let i = 0; i < tags.length; i++) {
                return recipe.tags.includes(tags[0]) || recipe.tags.includes(tags[1]);
            }
        });
        return recipesWithTag;
      
        // filter through all of the recipes
        // use .includes to check if recipes.tags.includes(tag)
        // .filter should returna filtered down array of recipes that meet the criterea 

        // if we want to sort through multiple tags we would want to pass the "tag" in as an array
    }
}

module.exports = RecipeRepo;
