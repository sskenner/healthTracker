//? minz
// rvw /healthTr..v0/notes.js

// Create namspaces
window.App = {
  Models: {},
  Collections: {},
  Views: {}
};

// Define Model of Food
App.Models.Food = Backbone.Model.extend({
  default: {
    name: '',
    calories: 0
  },

  // Ensure that each food item has a name
  validate: function(foodItem) {
    if(! $.trim(foodItem.name))  {
      return "Must enter a valid 'food' name!";
    }
  }
});

// Define Collection of Foods
App.Collections.Foods = Backbone.Collection.extend({
  model: App.Models.Food,
  // Implement local storage persistence of browser
  localStorage: new Backbone.LocalStorage('LocalFoods')
});

// Create view and actions to remove items from list of selected food
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

  //
  destroy: function() {
    this.model.destroy();
  },

  remove: function() {
    // Show alert if there is no food in list
    if (this.$el.siblings().lenght === 0) {
      $('#searchAlert').show();
    }
    this.$el.remove();
  }
});

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


// Create (list and add foods) View
App.Views.AddFoods = Backbone.View.extend({
  el: '#addItem',

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

// Create (show total calories) View
App.Views.TotCals = Backbone.View.extend({
  //? does matter if # here and . in index.html?
  el: '#totCals',

  initialize: function() {
    this.render();
    this.collection.on('update', this.render, this);
  },

  render: function() {
    var totCals = 0;
    this.collection.each(function(obj) {
      totCals += parseInt(obj.get('calories'));
    }, this);

    this.$el.text(totCals);

    return this;
  }
});

// Create search results View
App.Views.SearchResult = Backbone.View.extend({
  hooks: {
    searchButton: $('#searchButton'),
    searchBox: $('#searchBox'),
    searchBoxAlert: $('#searchBoxAlert')
  },

  initialize: function() {
    var self = this;
    this.hooks.searchButton.on('click', function(e) {
      e.preventDefault();
      var query = $.trim(self.hooks.searchBox.val()).toLowerCase();
      if(!query) {
        self.hooks.searchBoxAlert.text('Enter food name.');
        return;
      }
      self.hooks.searchBoxAlert.text('');
      self.getFood(query);
    });
  },

  getFood: function(query) {
    var self = this;
//? see notes
    var searchResults = $('.searchResults');

    searchResults.html('<p>loading...</p>');

    $.ajax({
      type: 'GET',
      dataType: 'json',
      cache: true,
//? see notes
      url: 'https://api.nutritionix.com/v1_1/search/' + query +'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=b207a370&appKey=16f9bcdd52a20a8e547a5337c4d98b89'}).done(function(data) {
//? see notes
        var item;
        var addButton = $('#itemSubmit');
        var searchItemHTML = '';
        if(data.hits.length <= 0) {
          var noResults = '<p>No results found for search term of: ' + query + '</p>';
          searchResults.html(noResults);
          return;
        }

        for (var i = 0; i < data.hits.length; i++) {
          searchItemHTML += '<li class="searchItem"><span class="searchName">' + data.hits[i].fields.item_name + '</span><span class="searchCalories">' + Math.round(data.hits[i].fields.nf_calories) + ' Cal. </span></li>';
        }
        searchResults.html(searchItemHTML);
        var searchItem = $('.searchItem');
        searchItem.on('click', function() {
//? see notes
          addButton.prop('disabled', false);
          var items = $(this).find('.searchName').text();
          var cals = $(this).find('.searchCalories').text();
          $('#foodName').text(items);
          $('#foodCalorie').text(cals);
          return;
        });
      }).fail(function() {
        searchResults.html('<p> Oh snap... error retrieving the food information.');
      });
    }
});


// Initialize App
//? see notes
var foodsCollection = new App.Collections.Foods([]);

foodsCollection.fetch();

var addFoodView = new App.Views.AddFoods({ collection: foodsCollection });

var listFoods = new App.Views.Foods({ collection: foodsCollection });

var totalFoodCal = new App.Views.TotCals({ collection: foodsCollection});

var searchResult = new App.Views.SearchResult();

$('.foodsList').html(listFoods.render().el);








