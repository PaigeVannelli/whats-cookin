const chai = require('chai');
const Ingredient = require('../src/Ingredient');
const {ingredientsTestData} = require('../data/test-data');
const expect = chai.expect;


describe('Ingredient', function() {

    it(`Should be a function`, function() {
        expect(Ingredient).to.be.a(`function`);
    });

    it(`should be an instance of Ingredient`, function() {
        const ingredient = new Ingredient(ingredientsTestData[0]);
        expect(ingredient).to.be.an.instanceOf(Ingredient);
    });

    it(`should take in an ingredient object as an argument`, function() {
        const ingredient = new Ingredient(ingredientsTestData[1]);
        expect(ingredientsTestData[1]).to.be.an('object')
    })

    it(`should store an id`, function() {
        const ingredient = new Ingredient(ingredientsTestData[1]);
        expect(ingredient.id).to.be.equal(18372);
    });

    it(`should store a name`, function() {
        const ingredient = new Ingredient(ingredientsTestData[1]);
        expect(ingredient.name).to.be.equal('bicarbonate of soda');
    });

    it(`should store an estimated cost in cents`, function() {
        const ingredient = new Ingredient(ingredientsTestData[1]);
        expect(ingredient.estimatedCostInCents).to.be.equal(582);
    });

    it(`should return no id found if not given an argument`, function() {
        const ingredient = new Ingredient();
        expect(ingredient.id).to.be.equal('no id found');
    });

    it(`should return no id found if not given an argument`, function() {
        const ingredient = new Ingredient();
        expect(ingredient.name).to.be.equal('no name found');
    });

    it(`should return no id found if not given an argument`, function() {
        const ingredient = new Ingredient();
        expect(ingredient.estimatedCostInCents).to.be.equal('no cost found');
    });
});