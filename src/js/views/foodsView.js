//js/views/foodsView.js

var app = app || {};

(function() {
  // Create view and actions to add items to list of selected food
  App.Views.Foods = Backbone.View.extend({
    tagName: 'ul',
    className: 'selectedResult',

    // Setup event handler to call addOne method
    initialize: function() {
      this.collection.on('add', this.addOne, this);
    },

    // Iterate to render unordered list of selected food
    render: function() {
      this.collection.each(this.addOne, this);
      return this;
    },

    // Create and append a food DOM element
    addOne: function(item) {
      $('#searchAlert').hide();
      var foodsView = new App.Views.Food({ model: item });
      this.$el.append(foodsView.render().el);
    }
  });


  // Create add foods view and retreive/save model to local storage
  App.Views.AddFoods = Backbone.View.extend({
    el: '#addItem',

    // Enable food item submission by binding submit method to click event
    events: {
      'click #itemSubmit' : 'submit'
    },

    submit: function(e) {
      e.preventDefault();
      var foodNames = $('#foodName').text().toString();
      var foodCalories = parseInt($('#foodCalorie').text());

      if (isNaN(foodCalories)) {
        return;
      }

      var item = new App.Models.Food({ name: foodNames, calories: foodCalories }, {validate: true});
      this.collection.add(item);
      // Add to localstorage
      item.save();
    }
  });

  // Create total calories view
  App.Views.TotCals = Backbone.View.extend({
    el: '#totCals',

    // Re-render if there is an update
    initialize: function() {
      this.render();
      this.collection.on('update', this.render, this);
    },

    // Calculate and show calorie count
    render: function() {
      var totCals = 0;
      this.collection.each(function(obj) {
        totCals += parseInt(obj.get('calories'));
      }, this);

      this.$el.text(totCals);

      return this;
    }
  });
})();