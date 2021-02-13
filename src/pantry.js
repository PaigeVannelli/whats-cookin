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

  dealWithItems(recipe) {
    if (this.userCanCook(recipe) === true) {
      recipe.ingredients.forEach(item => {
        let checkCook = this.pantryItems.findIndex(pantryItem => {
          return item.id === pantryItem.ingredient
        })
        console.log('before', this.pantryItems[checkCook].amount)
        this.pantryItems[checkCook].amount = this.pantryItems[checkCook].amount - item.quantity.amount;
        console.log('after', this.pantryItems[checkCook].amount)
      })
    }
  }


}


// } else {
//   this.pantryItems[checkCook].amount = this.pantryItems[checkCook].amount - item.quantity.amount;
// }

// pantryItems.indexOf
// that index if




// this is the path to target ingredients Qt.
// recipe1.ingredients[0].quantity.amount
module.exports = Pantry;
