// const RecipeRepo = require('../src/recipe-repo');

class UserData  {
  constructor(user, RecipeRepo) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = this.createNewRecipeRepo(RecipeRepo);
    // this.favoriteRecipes = [];
    this.recipeToCook = this.createNewRecipeRepo(RecipeRepo);
    // this.recipeToCook = [];
  }

  createNewRecipeRepo(RecipeRepo) {
    const newRecipeRepo = new RecipeRepo([])
    return newRecipeRepo
  }

  addRecipe(recipe, list) {
    this[list].recipes.push(recipe);
    // const favorites = this[list].recipes = new RecipeRepo;
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
//Do we want to keep track of perviously cooked recipes?

module.exports = UserData;
