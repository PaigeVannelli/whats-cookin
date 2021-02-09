class RecipeRepo {
    constructor(recipes) {
        this.recipes = recipes;
    }

    filterByIngredient(ingredientName) {
        const recipesWithIngredient = this.recipes.filter(recipe => {
            return recipe.ingredients.some(ingredient => ingredient.name.includes(ingredientName))
        })
        return recipesWithIngredient;

        // iterate through the recipes
        // I want to return a filtered recipes
        // inside the loop for each recipe I want to iterate through each ingredient
        // if ingredient.name === ingredient when that's true I want to push recipe
    }

    filterByTag(tags) {
        const recipesWithTag = this.recipes.filter(recipe => {
            return tags.every(tag => {
                return recipe.tags.includes(tag)
            })
            // for (let i = 0; i < tags.length; i++) {
            //     return recipe.tags.includes(tags[0]) || recipe.tags.includes(tags[1]);
            // }
        });
        console.log(recipesWithTag)
        return recipesWithTag;
    // given array of tags filter all the include tags without repeats
    // for each recipe if it includes all of the tags filter it
    // for each tag in tags, does recipe.tags include it
    
    // tagsargument.includes(each tag in recipe)
        // filter through all of the recipes
        // use .includes to check if recipes.tags.includes(tag)
        // .filter should returna filtered down array of recipes that meet the criterea 

        // if we want to sort through multiple tags we would want to pass the "tag" in as an array
    }
}

module.exports = RecipeRepo;
