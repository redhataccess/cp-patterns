module.exports = function( grunt, pkg, paths ) {
    grunt.config.merge( {

        bower_concat: {
            all: {
                dest: paths.dist + '/js/webrh.vendor.js',
                exclude: [
                    'compass-breakpoint',
                    'sassy-maps',
                    'jquery',
                    'qunit',
                    'rh-iconfont'
                ],
                dependencies: {},
                mainFiles: {
                    'slick-carousel': 'slick/slick.min.js'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },

        // Concat
        // https://www.npmjs.org/package/grunt-contrib-concat
        concat: {
            options: {
                separator: '',
                banner: 'var rh = rh || {};rh.webrh = rh.webrh || {}; (function($) {rh.webrh.load = function(context) {',
                footer: '};if (typeof Drupal !== "undefined" && Drupal.behaviors) {Drupal.behaviors.webrh = {attach: function (context, settings) {rh.webrh.load(context);}};}else {$(document).ready(function () {rh.webrh.load(document);});}})(jQuery);'
            },
            dist: {
                // load utils first in the file
                src: [
                    paths.src + '/js/utils/*.js',
                    paths.src + '/js/scrollTop/*.js',
                    paths.src + '/js/menu/*.js',
                    paths.src + '/js/**/*.js'
                ],
                dest: paths.dist + '/js/webrh.js'
            }
        },

        // Validate JS files
        // https://www.npmjs.org/package/grunt-contrib-jshint
        jshint: {
            options: {
                jshintrc: true,
                reporterOutput: ''
            },
            src: [
                paths.src + '/js/**/*.js',
                paths.src + '/**/*.tests.js',
                paths.tests + '/integration/**/*.js'
            ]
        },

        // Validate JSON files
        // https://www.npmjs.org/package/grunt-jsonlint
        jsonlint: {
            src: [
                paths.src + '/library/**/*.json',
                paths.fixtures + '/schemas/**/*.json'
            ]
        },

        modernizr: {
            dist: {
                "devFile": "remote",
                "outputFile": paths.dist + "/js/modernizr-custom.js",
                "extra": {
                    "shiv": true,
                    "printshiv": false,
                    "load": true,
                    "mq": true,
                    "cssclasses": true
                },
                "extensibility": {
                    "addtest": false,
                    "prefixed": false,
                    "teststyles": false,
                    "testprops": false,
                    "testallprops": false,
                    "hasevents": false,
                    "prefixes": true,
                    "domprefixes": false,
                    "cssclassprefix": ""
                },
                "uglify": true,
                "tests": [ 'css_filters' ],
                "parseFiles": true,
                "files": {
                    "src": [
                        paths.dist + '/css/*.css',
                        paths.dist + '/js/*.js'
                    ]
                },
                "matchCommunityTests": true,
                "customTests": []
            }
        },

        // Watch for changes and trigger compass and livereload
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            concat: {
                files: [
                    paths.src + '/js/**/*.*'
                ],
                tasks: [ 'concat', 'jshint:src' ]
            }
        }

    } );
}
