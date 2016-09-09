module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      build: {
        files: [
          {src: 'js/app.js', dest: 'js/app.min.js'},
          {src: 'js/models/food.js', dest: 'js/models/food.min.js'},
          {src: 'js/collections/foods.js', dest: 'js/collections/foods.min.js'},
          {src: 'js/helpers/helpers.js', dest: 'js/helpers/helpers.min.js'},
          {src: 'js/views/foodsView.js', dest: 'js/views/foodsView.min.js'},
          {src: 'js/views/foodView.js', dest: 'js/views/foodView.min.js'},
          {src: 'js/views/searchView.js', dest: 'js/views/searchView.min.js'}
          // {src: 'css/main.css', dest: 'css/main.min.css'}
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
