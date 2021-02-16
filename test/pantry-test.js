const chai = require('chai');
const RecipeRepo = require('../src/recipe-repo');
const {pantryRecipeTestData} = require('../data/test-data');
const {recipeTestData} = require('../data/test-data');
const Recipe = require('../src/recipe');
const ingredientsData = require('../data/ingredients');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const UserData = require('../src/user-data');
const {pantryUsersTestData} = require('../data/test-data');

describe('Pantry', function() {
  let recipe1
  let recipe2
  let recipe3
  let user

  beforeEach(() => {
    recipe1 = new Recipe(pantryRecipeTestData[0], ingredientsData);
    recipe2 = new Recipe(pantryRecipeTestData[1], ingredientsData);
    recipe3 = new Recipe(pantryRecipeTestData[2], ingredientsData);
    user = new UserData(pantryUsersTestData [0], RecipeRepo);
    user.addRecipe(recipe1, 'favoriteRecipes');
    user.addRecipe(recipe2, 'favoriteRecipes');
  });


  it(`Should be a function`, function() {
    expect(Pantry).to.be.a(`function`);
  });

  it(`Should be an instance of Pantry`, function() {
    const pantry = new Pantry(user, ingredientsData);
    expect(pantry).to.be.an.instanceOf(Pantry);
  });

  it(`Should store an array of ingredients`, function() {
    const pantry = new Pantry(user, ingredientsData);
    expect(pantry.pantryItems).to.be.an('array');
  });

  it(`Should store an array of ingredients`, function() {
    const pantry = new Pantry(user, ingredientsData)
    expect(pantry.pantryItems.length).to.be.equal(15);
  });

  describe('userCanCook', function() {

    it(`Should be able to to check if there is the ingredients to cook a meal`, function() {
      const pantry = new Pantry(user, ingredientsData);
      expect(pantry.userCanCook(recipe1)).to.equal(true);
    });

    it(`Should return false if missing an item`, function() {
      const pantry = new Pantry(user, ingredientsData);
      expect(pantry.userCanCook(recipe3)).to.equal(false);
    });

    it(`Should return false if missing ingredient quantity`, function() {
      const pantry = new Pantry(user, ingredientsData);
      expect(pantry.userCanCook(recipe2)).to.equal(false);
    });

  });

  describe('itemsToCook', function() {

  it(`Should remove the ingredients used to cook form the pantry`, function() {
    const pantry = new Pantry(user, ingredientsData);
    pantry.itemsToCook(recipe1)
    expect(pantry.pantryItems).to.deep.equal([
      { ingredient: 20081, estimatedCostInCents: 142, amount: 4.5, name: "wheat flour"},
      { ingredient: 18372, estimatedCostInCents: 582, amount: 4, name: "bicarbonate of soda"},
      { ingredient: 1123, estimatedCostInCents: 472, amount: 4, name: "eggs"},
      { ingredient: 19335, estimatedCostInCents: 902, amount: 4, name: "sucrose"},
      { ingredient: 19206, estimatedCostInCents: 660, amount: 2, name: "instant vanilla pudding"},
      { ingredient: 19334, estimatedCostInCents: 559, amount: 4, name: "brown sugar"},
      { ingredient: 2047, estimatedCostInCents: 280, amount: 4, name: "salt"},
      { ingredient: 1012047, estimatedCostInCents: 528, amount: 4, name: "fine sea salt"},
      { ingredient: 10019903, estimatedCostInCents: 253, amount: 9, name: "semi sweet chips"},
      { ingredient: 1145, estimatedCostInCents: 617, amount: 5, name: "unsalted butter"},
      { ingredient: 2050, estimatedCostInCents: 926, amount: 10, name: "vanilla"},
      { ingredient: 1009016, estimatedCostInCents: 468, amount: 10, name: "apple cider"},
      { ingredient: 9003, estimatedCostInCents: 207, amount: 10, name: "apple" },
      { ingredient: 20027, estimatedCostInCents: 236, amount: 10, name: "corn starch"},
      { ingredient: 1002046, estimatedCostInCents: 619, amount: 10.5, name: "dijon style mustard"}]);
   });

  });

  describe('whatsMissing', function() {

    it(`Should be able to determine what ingredients are low on`, function() {
      const pantry = new Pantry(user, ingredientsData);
      expect(pantry.whatsMissing(recipe2)).to.deep.equal(['unsalted butter qty. 15']);
    });

    it(`Should be able to determine what ingredients are missing`, function() {
      const pantry = new Pantry(user, ingredientsData);
      expect(pantry.whatsMissing(recipe3)).to.deep.equal(['haas avocados qty. 1']);
    });
  });

});
