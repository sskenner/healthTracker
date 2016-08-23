//? minz
// rvw /healthTr..v0/notes.js

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

  //? is this necessary due to api validation? .. see notes
  // Ensure that each food item has a name
  validate: function(foodItem) {
    if(! $.trim(foodItem.name))  {
      return "Must enter a valid 'food' name!";
    }
  }
});

// Define (Foods Model) Collection
App.Collections.Foods = Backbone.Collection.extend({
  model: App.Models.Food,
  localStorage: new Backbone.LocalStorage('LocalFoods')
});

// Create (Food Model) View
App.Views.Food = Backbone.View.extend({
  tagName: 'li',
  className: 'selectedItem',

//? is ok to pass this?
  template: _.template($('.foodListTemplate').html()),

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
    if(this.$el.siblings().length == 0) {
      $('#searchAlert').show();
    }
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
    $('#searchAlert').hide();
    var foodsView = new App.Views.Foods({ model: item });
    this.$el.append(foodsView.render().el);
  }
});


// Create (list and add foods) View
App.Views.AddFoods = Backbone.View.extend({
  el: '#addFood',

  events: {
    'click #foodSubmit' : 'submit'
  },

  submit: function(e) {
    e.preventDefault();
    var foodNames = $('#foodNames').text().toString();
    var foodCalories = parseInt($('#foodCalories').text());

    if (isNaN(foodCalories)) {
      return;
    }

    var food = new App.Models.Food({ name: foodNames, calories: foodCalories }, {validate: true});
    this.collection.add(food);
    food.save();
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
    var total = 0;
    this.collection.each(function(item) {
      total += parseInt(item.get('calories'));
    }, this);

    this.$el.text(total);

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
      self.viaAPI(query);
    });
  },

  viaAPI: function(query) {
    var self = this;
//? see notes
    var searchResults = $('.searchResults');

    var searchResultshtml('<p>loading...</p>');

    $.ajax({
      type: 'GET',
      dataType: 'json',
      cache: true,
//? see notes
      url: 'https://api.nutritionix.com/v1_1/search/' + query +'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=b207a370&appKey=16f9bcdd52a20a8e547a5337c4d98b89'}).done(function(data) {
//? see notes
        var food;
        var addButton = $('#foodSubmit');
        var searchItemHTML = '';
        if(data.hits.length == 0) {
          var noResults = '<p>No results found for search term of: ' + query + '</p>';
          searchResults.html(noResults);
          return;
        }

        for (var i = 0; i < data.hits.length; i++) {
          searchItemHTML += '<li class="searchItem"><span class="searchName">' + data.hits[i].fields.brand_name + '</span><span class="searchCalories">' + Math.round(data.hits[i].fields.nf_calories) + ' Calories </span></li>';
        }
        searchResults.html(searchItemHTML);
        var searchItem = $('.searchItem');
        searchItem.on('click', function() {
//? see notes
          addButton.prop('disabled', false);
          var names = $(this).find('.searchName').text();
          var calories = $(this).find('.searchCalories').text();
          $('#foodNames').text(names);
          $('#foodCalories').text(calories);
          return;
        });
// see notes
      }).fail(function(){
        searchResults.html('<p>Error retrieving food info. No connection to database.</p>');
      });
    }
});


// Initialize App
//? see notes
var foodsCollection = new App.Collections.Foods([]);
foodsCollection.fetch();
var addFoodsView = new App.Views.AddFoods({ collection: foodsCollection });
var listFoodsView = new App.Views.Foods({ collection: foodsCollection });
var totCalsView = new App.Views.TotCals({ collection: foodsCollection});

var searchResult = new App.Views.SearchResult();

$('.foodsList').html(listFoodsView.render().el);
