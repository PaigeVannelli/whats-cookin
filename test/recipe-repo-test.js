const chai = require('chai');
const RecipeRepo = require('../src/recipe-repo');
const {recipeTestData} = require('../data/test-data');
const Recipe = require('../src/recipe');
const expect = chai.expect;

describe('RecipeRepo', function() {

    it(`Should be a function`, function() {
        expect(RecipeRepo).to.be.a(`function`);
    });

    it(`should be an instance of Ingredient`, function() {
        const recipeRepo = new RecipeRepo(recipeTestData);
        expect(recipeRepo).to.be.an.instanceOf(RecipeRepo);
    });

    it(`should take in an array of ingredients as an argument`, function() {
        const recipeRepo = new RecipeRepo(recipeTestData);
        expect(recipeTestData).to.be.an('array')
    })

    it(`should be able to search by an ingredient and return an array of recipes`, function() {
        const recipe1 = new Recipe(recipeTestData[0]);
        const recipe2 = new Recipe(recipeTestData[1]);
        const recipe3 = new Recipe(recipeTestData[2]);
        
        let recipeTest = []
        recipeTest.push(recipe1)
        recipeTest.push(recipe2)
        recipeTest.push(recipe3)
        // console.log(recipeTest[2].ingredients)
        const recipeRepo = new RecipeRepo(recipeTest);
        recipeRepo.filterByIngredient('salt')
        // expect(recipeRepo.filterByTag('lunch')).to.be.equal()
    })

});