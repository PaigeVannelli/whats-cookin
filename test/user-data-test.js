const chai = require('chai');
const expect = chai.expect;
const {usersTestData} = require('../data/test-data');
const {recipeTestData} = require('../data/test-data');
const Recipe = require('../src/recipe');
const UserData = require('../src/user-data');

describe('UserData', function() {
  let recipe1
  let recipe2
  let recipe3
  let recipe4
  let recipe5

  beforeEach(() => {
    recipe1 = new Recipe(recipeTestData[0]);
    recipe2 = new Recipe(recipeTestData[1]);
    recipe3 = new Recipe(recipeTestData[2]);
    recipe4 = new Recipe(recipeTestData[3]);
    recipe5 = new Recipe(recipeTestData[4]);
  });

  it(`Should be a function`, function() {
    expect(UserData).to.be.a(`function`);
  });

  it(`Should be an instance of User`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user).to.be.an.instanceOf(UserData);
  });

  it(`Should store a users name`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user.name).to.equal("Saige O'Kon");
  });

  it(`Should store a users id number`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user.id).to.equal(1);
  });

  it(`Should store a list of the users pantry items`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user.pantry).to.be.an('array');
  });

  it(`Should store a pantry of the same length`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user.pantry.length).to.equal(36);
  });

  it(`Should store the users favorite recipes`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user.favoriteRecipes.recipes).to.deep.equal([]);
  });

  it(`Should store the recipes to cook.`, function() {
    const user = new UserData(usersTestData[0]);
    expect(user.recipeToCook.recipes).to.deep.equal([]);
  });

  describe('addFRecipe', function() {

    it(`Should have a way to add favorite recipes`, function() {
      const user = new UserData(usersTestData[0]);
      user.addRecipe(recipe1, 'favoriteRecipes');
      expect(user.favoriteRecipes.recipes[0].name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    });

    it(`Should also add to recipes to cook`, function() {
      const user = new UserData(usersTestData[0]);
      user.addRecipe(recipe1, 'recipeToCook');
      expect(user.recipeToCook.recipes[0].name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups");
    });

    it(`Should be able to save multiple recipes`, function() {
      const user = new UserData(usersTestData[1]);
      user.addRecipe(recipe1, 'favoriteRecipes');
      user.addRecipe(recipe2, 'favoriteRecipes');
      user.addRecipe(recipe3, 'favoriteRecipes');
      expect(user.favoriteRecipes.recipes.length).to.equal(3)
    });

  });

  describe('removeFavorite', function() {

      it(`should be able to remove a recipe from favorites`, function() {
        const user = new UserData(usersTestData[0]);
        user.addRecipe(recipe1, 'favoriteRecipes');
        user.addRecipe(recipe2, 'favoriteRecipes');
        user.removeRecipe(recipe1, 'favoriteRecipes');
        expect(user.favoriteRecipes.recipes.length).to.equal(1);
      });

      it(`Should remove the correct recipe`, function() {
        const user = new UserData(usersTestData[0]);
        user.addRecipe(recipe1, 'favoriteRecipes');
        user.addRecipe(recipe2, 'favoriteRecipes');
        user.addRecipe(recipe3, 'favoriteRecipes');
        user.removeRecipe(recipe1, 'favoriteRecipes');
        user.removeRecipe(recipe3, 'favoriteRecipes');
        expect(user.favoriteRecipes.recipes[0].name).to.equal(recipe2.name);
      });

  });

  describe('userFilter', function() {

    let user

    beforeEach(() => {
      user = new UserData(usersTestData[0]);
      user.addRecipe(recipe1, 'favoriteRecipes');
      user.addRecipe(recipe2, 'favoriteRecipes');
      user.addRecipe(recipe3, 'favoriteRecipes');
      user.addRecipe(recipe4, 'favoriteRecipes');
      user.addRecipe(recipe5, 'favoriteRecipes');
    })

    it(`Should filter based on ingredient`, function() {
      user.userFilter('salt', 'favoriteRecipes', 'filterByIngredient');
      expect(user.userFilter('salt', 'favoriteRecipes', 'filterByIngredient').length).to.be.equal(4);
    });

    it(`Should return an empty array if the ingredient doesn't exist`, function() {
      expect(user.userFilter('vanilla bean', 'favoriteRecipes', 'filterByIngredient')).to.deep.equal([]);
    });

    it(`Should filter based on recipe name`, function() {
      const filterRecipe = user.userFilter('Maple Dijon Apple Cider Grilled Pork Chops', 'favoriteRecipes', 'filterByName');
      expect(filterRecipe[0].name).to.be.equal('Maple Dijon Apple Cider Grilled Pork Chops');
    });

    it(`should filter based on tags`, function() {
      const filterRecipe = user.userFilter(['side dish'], 'favoriteRecipes', 'filterByTag');
      expect(filterRecipe[1].id).to.be.equal(741603);
    });

    it(`Should filter based on multiple tags`, function() {
      const filterRecipe = user.userFilter(['side dish', 'dinner'], 'favoriteRecipes', 'filterByTag');
      expect(filterRecipe[0].id).to.be.equal(678353);
    });

  });

});
