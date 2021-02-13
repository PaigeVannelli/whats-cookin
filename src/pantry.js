

class Pantry {
  constructor(userPantry) {
    this.pantryItems = userPantry;
  }

  userCanCook(recipe) {
    let canCook = true;
    recipe.ingredients.forEach(item => {
      let checkCook = this.pantryItems.findIndex(pantryItem => {
        return item.id === pantryItem.ingredient && item.quantity.amount <= pantryItem.amount;
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
      this.pantryItems[checkCook].amount -= item.quantity.amount;
    })
  }

  whatsMissing(recipe) {
    let missing = [];
    recipe.ingredients.forEach(item => {
      let pantryItemIndex = this.pantryItems.findIndex(pantryItem => {
        return item.id === pantryItem.ingredient;
      })
      if (pantryItemIndex === - 1) {
        let missQty = item.quantity.amount;
        missing.push(`${item.name} qty. ${missQty}`);
      } else if (item.quantity.amount > this.pantryItems[pantryItemIndex].amount) {
        let pantryItem = this.pantryItems[pantryItemIndex];
        missing.push(`${item.name} qty. ${item.quantity.amount - pantryItem.amount}`);
      }
    });
    return missing;
  }

}

module.exports = Pantry;
