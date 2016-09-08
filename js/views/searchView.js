//js/views/searchView.js

var app = app || {};

(function() {
  // Create search results view
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
        // Ensure query is entered
        if(!query) {
          self.hooks.searchBoxAlert.text('Enter food name.');
          return;
        }
        // $("#searching").show();
        self.hooks.searchBoxAlert.text('');
        self.getFood(query);
      });
    },

    getFood: function(query) {
      var self = this;
      var searchResults = $('.searchResults');
      var searchClone = $("h2, .searchResults").clone();
      searchResults.html('<p>one sec...</p>');

      $.ajax({
        type: 'GET',
        dataType: 'json',
        cache: true,

        url: 'https://api.nutritionix.com/v1_1/search/' + query +'?results=0%3A10&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Cnf_calories&appId=b207a370&appKey=16f9bcdd52a20a8e547a5337c4d98b89'}).done(function(data) {

        var item;
        var addButton = $('#itemSubmit');
        var searchItemHTML = '';
        if(data.hits.length == 0) {
          var noResults = '<p>No results found for search term of: ' + query + '</p>';
          searchResults.html(noResults);
          return;
        }

        for (var i = 0; i < data.hits.length; i++) {
          searchItemHTML += '<li class="searchItem"><span class="searchName">' + data.hits[i].fields.item_name + ' </span><span class="searchCalories">  <strong>' + Math.round(data.hits[i].fields.nf_calories) + ' Cal. </mark></strong></li>';
        }
        searchResults.html(searchItemHTML);
        var searchItem = $('.searchItem');
        // Enable food selection click event
        searchItem.on('click', function() {
          addButton.prop('disabled', false);
          var items = $(this).find('.searchName').text();
          var cals = $(this).find('.searchCalories').text();
          $('#foodName').text(items);
          $('#foodCalorie').text(cals);
          $(".searchItem").hide();
          return;
        });
      }).fail(function() {
        searchResults.html('<p> Damn, damn, damn... error retrieving the food information.');
      });
    }
  });
})();
