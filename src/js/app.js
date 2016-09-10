//js/app.js

var app = app || {};

(function() {
  // App & object(s) initialization

  var foodsCollection = new App.Collections.Foods([]);
  foodsCollection.fetch();
  var addFoodView = new App.Views.AddFoods({ collection: foodsCollection });
  var listFoods = new App.Views.Foods({ collection: foodsCollection });
  var totalFoodCal = new App.Views.TotCals({ collection: foodsCollection});
  var searchResult = new App.Views.SearchResult();

  $('.foodsList').html(listFoods.render().el);

})();









