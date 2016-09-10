//js/views/foodView.js

var app = app || {};

(function() {
  App.Views.Food = Backbone.View.extend({
    tagName: 'li',
    className: 'selectedItem',

    // Template call for list display
    template: _.template($('#foodListTemplate').html()),

    // Setup event handler to call destroy method
    initialize: function() {
      this.model.on('destroy', this.remove, this);
    },

    // Enable food deletion by binding destroy method to click event
    events:  {
      'click .delete' : 'destroy'
    },
    // Create view via template of JSON parsed model
    render: function() {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    },

    destroy: function() {
      this.model.destroy();
    },

    remove: function() {
      // Show alert if there is no food in list
      if (this.$el.siblings().length === 0) {
        $('#searchAlert').show();
      }
      this.$el.remove();
    }
  });
})();