const chai = require('chai');
const RecipeRepo = require('../src/recipe-repo');
const {recipeTestData} = require('../data/test-data');
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

});