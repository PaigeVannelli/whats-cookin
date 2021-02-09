class Ingredient {
    constructor(ingredient = {}) {
        this.id = ingredient.id || 'no id found';
        this.name = ingredient.name || 'no name found';
        this.estimatedCostInCents = ingredient.estimatedCostInCents || 'no cost found';
    }
};

module.exports = Ingredient;