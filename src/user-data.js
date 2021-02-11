const RecipeRepo = require('../src/recipe-repo');

// store user object for current user
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
    // this.favoriteRecipes.filterByIngredient(item); this code was to work if not dynamic list/filterType.
    const newList = this[recipeList][filterType](item);
    return newList;
  }







}
//Do we want to keep track of perviously cooked recipes?
//methods: filter through recipes by tags, filter recipes by name and ingredient helper function

module.exports = UserData;
