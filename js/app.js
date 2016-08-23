// Create namspaces
window.App = {
  Models: {},
  Collections: {},
  Views: {}
};

 // _.template($('#' + id).html());

// Create Food Model
App.Models.Food = Backbone.Model.extend({
  default: {
    foodName: '',
    calories: 0
  },

  validate: function(foodItem) {
    if(! $.trim(foodItem.foodName))  {
      return "Must enter 'food' name!";
    }
  }
});

// Create Foods Collection
App.Collections.Foods = Backbone.Collection.extend({
  model: App.Models.Food
});

// Create Food Model View
App.Views.Food = Backbone.View.extend({
  tagName: 'li',
// is ok to pass this?
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


















