//? minz

// Create namspaces
window.App = {
  Models: {},
  Collections: {},
  Views: {}
};

 //? _.template($('#' + id).html());

// Create Model for Food
App.Models.Food = Backbone.Model.extend({
  default: {
    foodName: '',
    calories: 0
  },

  //? is this necessary due to api validation?
  // Ensure that each food item has a name
  validate: function(foodItem) {
    if(! $.trim(foodItem.foodName))  {
      return "Must enter a valid 'food' name!";
    }
  }
});

// Create Foods Collection
App.Collections.Foods = Backbone.Collection.extend({
  model: App.Models.Food
});

// Create View for Food Model
App.Views.Food = Backbone.View.extend({
  tagName: 'li',

//? is ok to pass this?
  template: _.template($('#foodsListTemplate').html()),

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

// Create View for Foods Collection
App.Views.Foods = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    this.collection.on('add', this.addOne, this);
  },

  render: function() {
    this.collection.each(this.addOne, this);

    return this;
  },

  addOne: function(food) {

  }
});


// Create View to Add foods
App.Views.addFood = Backbone.View.extend({
  el: '#addFood',

  events: {
    'submit' : 'submit'
  }
});

















