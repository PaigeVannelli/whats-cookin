class RecipeRepo {
    constructor(recipes) {
        this.recipes = recipes;
    }

    filterByIngredient(ingredientName) {
        const recipesWithIngredient = this.recipes.filter(recipe => {
            return recipe.ingredients.some(ingredient => ingredient.name.includes(ingredientName))
        })
        console.log(recipesWithIngredient)
        // console.log(recipesWithIngredient[1].ingredients)
        return recipesWithIngredient;
    }

    method(keyword, object, )

    filterByTag(tags) {
        const recipesWithTag = this.recipes.filter(recipe => {
            return tags.every(tag => {
                return recipe.tags.includes(tag)
            });
        });
        return recipesWithTag;
    };
}

module.exports = RecipeRepo;
