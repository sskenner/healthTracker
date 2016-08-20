//? minz

// Create namspaces
window.App = {
  Models: {},
  Collections: {},
  Views: {}
};

 //? _.template($('#' + id).html());

// Define Food Model
App.Models.Food = Backbone.Model.extend({
  defaults: {
    name: '',
    calories: 0
  },

  //? is this necessary due to api validation?
  // Ensure that each food item has a name
  validate: function(foodItem) {
    if(! $.trim(foodItem.name))  {
      return "Must enter a valid 'food' name!";
    }
  }
});

// Define (Foods Model) Collection
App.Collections.Foods = Backbone.Collection.extend({
  model: App.Models.Food
});

// Create (Food Model) View
App.Views.Food = Backbone.View.extend({
  tagName: 'li',

//? is ok to pass this?
  template: _.template($('#foodListTemplate').html()),

  initialize: function() {
    this.model.on('destroy', this.remove, this);
  },

  events:  {
    'click .delete' : 'destroy'
  },

  render: function() {
    var template = this.template(this.model.toJSON());
  },

  destroy: function() {
    this.model.destroy();
  },

  remove: function() {
    this.$el.remove();
  }
});

// Create (Foods) View
App.Views.Foods = Backbone.View.extend({
  tagName: 'ul',

  // Setup event handler to call addOne method
  initialize: function() {
    this.collection.on('add', this.addOne, this);
  },

  // Loop through and render unordered list of selected food objects
  render: function() {
    this.collection.each(this.addOne, this);
    return this;
  },

  // Create and append a food DOM element
  addOne: function(item) {
    var foodsView = new App.Views.Foods({ model: item });
    this.$el.append(foodsView.render().el);
  }
});


// Create (list and add foods) View
App.Views.AddFoods = Backbone.View.extend({
  el: '#addFood',

  events: {
    'submit' : 'submit'
  },

  submit: function(e) {
    e.preventDefault();
    var foodNames = $('foodNames').val().toString();
    var foodCalories = parseInt($('#foodCalories').val());

    if (isNaN(foodCalories)) {
      return;
    }

    var food = new App.Models.Food({ name: foodNames, calories: foodCalories }, {validate: true});
    this.collection.add(food);
  }
});

// Create (show total calories) View
App.Views.Total = Backbone.View.extend({
  // does matter if # here and . in index.html?
  el: '#total',

  initialize: function() {
    this.render();
    this.collection.on('update', this.render, this);
  },

  render: function() {
    var total = 0;
    this.collection.each(function(item) {
      total += parseInt(item.get('calories'));
    }, this);

    this.$el.text(total);

    return this;
  }
});

// Initialize App
var foodsList = new App.Collections.Foods([]);
var addFoodsView = new App.Views.AddFoods({ collection: foodsList });
var listFoodsView = new App.Views.Foods({ collection: foodsList });
var totCalFoodView = new App.Views.Total({ collection: foodsList});

$('.foodsList').html(listFoodsView.render().el);








