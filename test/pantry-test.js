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
    user = new UserData(pantryUsersTestData [0]);
    user.addRecipe(recipe1, 'favoriteRecipes');
    user.addRecipe(recipe2, 'favoriteRecipes');
  });


  it(`Should be a function`, function() {
    expect(Pantry).to.be.a(`function`);
  });

  it(`Should be an instance of Pantry`, function() {
    const pantry = new Pantry(user.pantry);
    expect(pantry).to.be.an.instanceOf(Pantry);
  });

  it(`Should store an array of ingredients`, function() {
    const pantry = new Pantry(user.pantry);
    expect(pantry.pantryItems).to.be.an('array');
  });

  it(`Should store an array of ingredients`, function() {
    const pantry = new Pantry(user.pantry)
    // console.log(recipe1.ingredients[0].quantity.amount)
    expect(pantry.pantryItems.length).to.be.equal(15);
  });

  describe('userCanCook', function() {

    it(`Should be able to to check if there is the ingredients to cook a meal`, function() {
      const pantry = new Pantry(user.pantry);
      expect(pantry.userCanCook(recipe1)).to.be.equal(true);
    });

    it(`Should return false if missing an item`, function() {
      const pantry = new Pantry(user.pantry);
      expect(pantry.userCanCook(recipe3)).to.be.equal(false);
    });

    it(`Should return false if missing ingredient quantity`, function() {
      const pantry = new Pantry(user.pantry);
      expect(pantry.userCanCook(recipe2)).to.be.equal(false);
    })

  });

  describe('dealWithItems', function() {

    it(`Should remove the ingredients used to cook form the pantry`, function() {
      const pantry = new Pantry(user.pantry);
      expect(pantry.dealWithItems(recipe1)).to.be.equal(true);
    });

    it.skip(`Should be able to determine what ingredients are missing`, function() {

    });

  })

});
