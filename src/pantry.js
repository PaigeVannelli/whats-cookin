class Pantry {
  constructor(userPantry) {
    this.pantryItems = userPantry;
  }

  userCanCook(recipe) {
    let canCook = true;
    recipe.ingredients.forEach(item => {
      let checkCook = this.pantryItems.findIndex(pantryItem => {
        return item.id === pantryItem.ingredient && item.quantity.amount < pantryItem.amount;
      })
      if (checkCook === -1) {
        canCook = false;
      }
    });
    return canCook;
  }

  itemsToCook(recipe) {
    recipe.ingredients.forEach(item => {
        let checkCook = this.pantryItems.findIndex(pantryItem => {
          return item.id === pantryItem.ingredient;
      })
      this.pantryItems[checkCook].amount = this.pantryItems[checkCook].amount - item.quantity.amount;
    })
  }

  whatsMissing(recipe) {
    let missing = [];
    // may need to add anouther var to save pantryItem, will not save outide of the findIndex-loop
    // may also be able to do this with a reduce method.
    recipe.ingredients.forEach(item => {
      let checkCook = this.pantryItems.findIndex(pantryItem => {
        return item.id === pantryItem.ingredient && item.quantity.amount < pantryItem.amount;
      })
      if (checkCook === -1) {
        let missQty = item.quantity.amount - pantryItem.amount;
        missing.push({ id: item.id, amount: missQty});
      }
    });
    console.log(missing);
    return missing;
  }

}

module.exports = Pantry;
