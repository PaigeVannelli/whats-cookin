const chai = require('chai');
const Recipe = require('../src/Recipe');
const ingredientsData = require('../data/ingredients');
const {recipeTestData} = require('../data/test-data');
const expect = chai.expect;

describe('Recipe', function() {

  it('should be a function', function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it(`should store an id`, function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(recipe.id).to.be.equal(recipeTestData[0].id)
  });

  it(`should store an image`, function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(recipe.image).to.be.equal(recipeTestData[0].image)
  });

  it(`should store a list of ingredients`, function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    const updatedRecipe = recipe.getIngredientsInfo(recipe.ingredients, ingredientsData);
    expect(recipe.ingredients).to.deep.equal(updatedRecipe);
  });

  it(`should store instructions`, function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(recipe.instructions).to.be.equal(recipeTestData[0].instructions)
  });

  it(`should store a name`, function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(recipe.name).to.be.equal(recipeTestData[0].name)
  });

  it(`should store a list of tags`, function() {
    const recipe = new Recipe(recipeTestData[0], ingredientsData);
    expect(recipe.tags).to.be.equal(recipeTestData[0].tags)
  });


  describe('filterOutDuplicates', function() {

    it(`Should be able to filter out duplicates`, function() {
      const recipe = new Recipe(recipeTestData[3], ingredientsData);
      expect(recipe.ingredients.length).to.deep.equal(11);
    });

  });

  describe('returnIngredients', function() {

    it(`should store a list of tags`, function() {
      const recipe = new Recipe(recipeTestData[0], ingredientsData);
      expect(recipe.returnIngredients()).to.deep.equal([
        'bicarbonate of soda',
        'sucrose',
        'brown sugar',
        'salt',
        'unsalted butter',
        'vanilla',
        'eggs',
        'wheat flour',
        'semi sweet chips',
        'instant vanilla pudding',
        'fine sea salt'
      ]);
    });
  });

  describe('returnCost', function() {

    it(`should return the total cost of the meal in dollars`, function() {
      const recipe = new Recipe(recipeTestData[0], ingredientsData);
      expect(recipe.returnCost()).to.be.equal('$177.76')
    });
  });

  describe('returnInstructions', function() {

    it(`should return the recipe instructions`, function() {
      const recipe = new Recipe(recipeTestData[0], ingredientsData);
      expect(recipe.returnInstructions()).to.deep.equal([
        '1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        '2: Add egg and vanilla and mix until combined.',
        '3: Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.',
        '4: Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.',
        '5: Bake for 9 to 10 minutes, or until you see the edges start to brown.',
        '6: Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.'
      ]);
    });
  });
});
