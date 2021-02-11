const chai = require('chai');
const RecipeRepo = require('../src/recipe-repo');
const {recipeTestData} = require('../data/test-data');
const Recipe = require('../src/recipe');
const expect = chai.expect;

describe('RecipeRepo', function() {

    let recipeTest = [];
        beforeEach(() => {
            const recipe1 = new Recipe(recipeTestData[0]);
            const recipe2 = new Recipe(recipeTestData[1]);
            const recipe3 = new Recipe(recipeTestData[2]);
            const recipe4 = new Recipe(recipeTestData[3]);
            const recipe5 = new Recipe(recipeTestData[4]);

            recipeTest.push(recipe1)
            recipeTest.push(recipe2)
            recipeTest.push(recipe3)
            recipeTest.push(recipe4)
            recipeTest.push(recipe5)
        });

    it(`Should be a function`, function() {
        expect(RecipeRepo).to.be.a(`function`);
    });

    it(`should be an instance of Ingredient`, function() {
        const recipeRepo = new RecipeRepo(recipeTestData);
        expect(recipeRepo).to.be.an.instanceOf(RecipeRepo);
    });

    it(`should take in an array of ingredients as an argument`, function() {
        const recipeRepo = new RecipeRepo(recipeTestData);
        expect(recipeTestData).to.be.an('array');
    });

    describe('filterByIngredient', function() {

        it(`should be able to search by an ingredient and return an array of recipes`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const recipesWithTags = recipeRepo.filterByIngredient('salt');
            expect(recipesWithTags[0].id).to.be.equal(595736);
        });

        it(`should return an empty array if the ingredient doesn't exist`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const filterRecipe = recipeRepo.filterByIngredient('vanilla bean');
            expect(filterRecipe).to.deep.equal([]);
        });
    });

    describe('filterByName', function() {

        it(`should be able to filter through recipes by a full recipe name`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const filterRecipe = recipeRepo.filterByName(['Maple Dijon Apple Cider Grilled Pork Chops']);
            expect(filterRecipe[0].id).to.be.equal(678353);
        });

        it(`should be able to filter through recipes by a partial recipe name`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const filterRecipe = recipeRepo.filterByName(['Pork Chops']);
            expect(filterRecipe[0].id).to.be.equal(678353);
        });

        it(`should return an empty array is recipe name doesn't exist`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const filterRecipe = recipeRepo.filterByName(['unicorn steak']);
            expect(filterRecipe).to.deep.equal([]);
        });
    });

    describe('filterByTags', function() {

        it(`should be able to filter by one tags and return an array of recipes`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const filterRecipe = recipeRepo.filterByTag(['side dish']);
            expect(filterRecipe[1].id).to.be.equal(741603);
        });

        it(`should be able to filter by multiple tags and return an array of recipes taht include all tags`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            const filterRecipe = recipeRepo.filterByTag(['side dish', 'dinner']);
            expect(filterRecipe[0].id).to.be.equal(678353);
        });

        it(`should return an empty array if the tags don't match a recipe`, function() {
            const recipeRepo = new RecipeRepo(recipeTest);
            expect(recipeRepo.filterByTag(['breakfast'])).to.deep.equal([])
        });

    })
});
