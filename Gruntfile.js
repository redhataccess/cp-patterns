'use strict';

module.exports = function (grunt) {
    var pkg = require('./package.json');
    var timer = require("grunt-timer");
    timer.init(grunt);

    var paths = {
        src: "./src",
        dist: "./dist",
        test: "./test",
        fixtures: "./fixtures"
    };

    ////////////////////////
    // Configure Tasks
    ////////////////////////

    // require('./grunt_tasks/sass.js')(grunt, pkg, paths);
    require('./grunt_tasks/cpsass.js')(grunt, pkg, paths); // For CPUX only
    require('./grunt_tasks/javascript.js')(grunt, pkg, paths);
    require('./grunt_tasks/bump.js')(grunt, pkg, paths);
    require('./grunt_tasks/testing.js')(grunt, pkg, paths);
    require('./grunt_tasks/files.js')(grunt, pkg, paths);
    require('./grunt_tasks/cpfiles.js')(grunt, pkg, paths); // For CPUX only
    require('./grunt_tasks/server.js')(grunt, pkg, paths);

    grunt.config.merge({
        pkg: grunt.file.readJSON('package.json')
    });

    require('load-grunt-tasks')(grunt);

    // Default task compiles a distributable copy of the repo
    grunt.registerTask('default', [
        'clean', // files
        'copy:templates', // files
        'copy:data', // files
        'copy:schemas', // files
        'copy:images', // files
        'jsonlint', // js
        'jshint', // js
        'bower_concat', // js
        "sass_globbing", // sass
        'sass', // sass
        'autoprefixer:dev', // sass
        'concat', // js
        'modernizr:dist' // sass
    ]);

    // Default task compiles a distributable copy of the repo
    grunt.registerTask('cp', [
        //'clean', // files
        'default', // Run default first.
        'copy:cp_templates', // files
        'copy:cp_data', // files
        'copy:cp_schemas', // files
        'copy:cp_images', // files
        'copy:cp_assets', // files
        'jsonlint', // js
        'jshint', // js
        'bower_concat', // js
        // 'sass_globbing', // sass
        'sass', // sass
        'autoprefixer:dev', // sass
        'concat', // js
        'modernizr:dist' // sass
    ]);

    // Dev task is like default but includes tasks needed for testing or development
    grunt.registerTask('dev', [
        'clean', // files
        'copy', // files
        'jsonlint', // js
        'jshint', // js
        'bower_concat', // js
        "sass_globbing", // sass
        'sass', // sass
        'autoprefixer:dev', // sass
        'concat', // js
        'modernizr:dist' // sass
    ]);

    grunt.registerTask('watcher', [
        "dev",
        'php:dist', // server
        "watch"
    ]);

    grunt.registerTask('lint', [
        'jsonlint', // js
        'jshint' // js
    ]);

};
