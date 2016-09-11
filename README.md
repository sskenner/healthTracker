# HealthTracker123

A project for [Udacity's Front-End Web Developer Nanodegree][fend], [HealthTracker123][ht123] is a single page calorie intake tracking resource.

Typing food names into the search field displays a list of matching foods as provided by the [Nutritionix API][napi]. Selecting list food items: adds them to the list of tracked foods and updates total calorie count.

### Usage
For **hosted demo**
click [here][ht123].

For **local use**:
- Clone repo
```sh
(HTTPS)
$ git clone https://github.com/sskenner/healthTracker.git
```
OR
```sh
(SSH)
$ git clone git@github.com:sskenner/healthTracker.git
```
- Open `index.html` in your favorite browser.

1. **Enter** food name to search.
2. **Click** food name to select.
3. **Click** "Add food" button.

### Development
Want to help? Awesomeness .. [Grunt][grunt] is used to minify files for fast development.  To do so, some stuffs need to be in place.

##### Install node.js
Installation instructions found on the Node site [here][node].

##### Install npm (node package manager)
In the terminal.. in the root directory of local repository, type and run the command:
```sh
$ npm install
```

##### Install Grunt CLI (command line interface)
Also, in the terminal.. in the root directory of local repository, type and run the command:
```sh
$ npm install -g grunt-cli
```
##### Run Grunt
hmmmm..
```sh
$ grunt
```
voila.

### Resources used
- [Backbone.js](http://backbonejs.org/)
- [Underscore](http://underscorejs.org/)
- [P5.2 Health Tracker Webcast](https://www.youtube.com/watch?v=OvcPM0cNNEM)
- [Developing Backbone.js Applications](https://github.com/addyosmani/backbone-fundamentals/)
- [BackboneJS Tutorial](http://www.tutorialspoint.com/backbonejs/index.htm)
- [A complete guide for learning backbone js](http://codebeerstartups.com/2012/12/a-complete-guide-for-learning-backbone-js/)
- [Hello Backbone.js](http://arturadib.com/hello-backbonejs/)


[ht123]: <https://sskenner.github.io/healthTracker/>
[napi]: <https://developer.nutritionix.com/>
[fend]: <https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001>
[grunt]: <http://gruntjs.com/getting-started>
[node]: <https://nodejs.org/>