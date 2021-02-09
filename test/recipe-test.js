const chai = require('chai');
const Recipe = require('../src/Recipe');
const ingredientsData = require('../data/ingredients');
const {recipeTestData} = require('../data/test-data');
const expect = chai.expect;

describe('Recipe', function() {

    it('should be a function', function() {
      const recipe = new Recipe(recipeTestData[0]);
      expect(Recipe).to.be.a('function');
    });
  
    it('should be an instance of Recipe', function() {
      const recipe = new Recipe(recipeTestData[0]);
      expect(recipe).to.be.an.instanceof(Recipe);
    }); 

    it(`should store an id`, function() {
        const recipe = new Recipe(recipeTestData[0]);
        expect(recipe.id).to.be.equal(recipeTestData[0].id)
    });

    it(`should store an image`, function() {
        const recipe = new Recipe(recipeTestData[0]);
        expect(recipe.image).to.be.equal(recipeTestData[0].image)
    });

    it(`should store a list of ingredients`, function() {
        const recipe = new Recipe(recipeTestData[0]);
        expect(recipe.ingredients).to.be.equal(recipeTestData[0].ingredients)
    });

    it(`should store instructions`, function() {
        const recipe = new Recipe(recipeTestData[0]);
        expect(recipe.instructions).to.be.equal(recipeTestData[0].instructions)
    });

    it(`should store a name`, function() {
        const recipe = new Recipe(recipeTestData[0]);
        expect(recipe.name).to.be.equal(recipeTestData[0].name)
    });

    it(`should store a list of tags`, function() {
        const recipe = new Recipe(recipeTestData[0]);
        expect(recipe.tags).to.be.equal(recipeTestData[0].tags)
    });

    describe('returnIngredients', function() {

        it(`should store a list of tags`, function() {
            const recipe = new Recipe(recipeTestData[0]);
            recipe.returnIngredients();

            // expect(recipe.tags).to.be.equal(recipeTestData[0].tags)
        });



    })

});