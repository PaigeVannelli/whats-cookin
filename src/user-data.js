const RecipeRepo = require('../src/recipe-repo');

class UserData  {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.pantry = user.pantry;
    this.favoriteRecipes = new RecipeRepo([]);
    this.recipeToCook = new RecipeRepo([]);
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
//Do we want to keep track of perviously cooked recipes?

module.exports = UserData;
