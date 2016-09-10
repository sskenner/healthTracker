module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      build: {
        files: [
          {src: 'src/js/app.js', dest: 'dist/js/app.min.js'},
          {src: 'src/js/models/food.js', dest: 'dist/js/models/food.min.js'},
          {src: 'src/js/collections/foods.js', dest: 'dist/js/collections/foods.min.js'},
          {src: 'src/js/helpers/helpers.js', dest: 'dist/js/helpers/helpers.min.js'},
          {src: 'src/js/views/foodsView.js', dest: 'dist/js/views/foodsView.min.js'},
          {src: 'src/js/views/foodView.js', dest: 'dist/js/views/foodView.min.js'},
          {src: 'src/js/views/searchView.js', dest: 'dist/js/views/searchView.min.js'}
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
