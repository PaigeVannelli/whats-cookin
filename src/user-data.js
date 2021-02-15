
class UserData  {
  constructor(user, RecipeRepo) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = this.createNewRecipeRepo(RecipeRepo);
    this.recipeToCook = this.createNewRecipeRepo(RecipeRepo);
  }

  createNewRecipeRepo(RecipeRepo) {
    const newRecipeRepo = new RecipeRepo([])
    return newRecipeRepo
  }

  addRecipe(recipe, list) {
    this[list].recipes.push(recipe);
  }

  removeRecipe(recipe, list) {
    const ids = this[list].recipes.map(rec => rec.id);
    this[list].recipes.splice(ids.indexOf(recipe.id), 1);
  }

  userFilter(item, recipeList, filterType) {
    const newList = this[recipeList][filterType](item);
    return newList;
  }

}

module.exports = UserData;
