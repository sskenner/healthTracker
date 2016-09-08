//js/collections/foods.js

var app = app || {};

(function() {
  // Define Collection of Foods
  App.Collections.Foods = Backbone.Collection.extend({
    model: App.Models.Food,
    // Implement local storage persistence of browser
    localStorage: new Backbone.LocalStorage('LocalFoods')
  });
})();