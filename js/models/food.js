//js/models/food.js

var app = app || {};

(function() {
  App.Models.Food = Backbone.Model.extend({
    default: {
      name: '',
      calories: 0
    },

    // Ensure that each food item has a name
    validate: function(foodItem) {
      if(!$.trim(foodItem.name))  {
        return "Must enter a valid 'food' name!";
      }
    }
  });
})();