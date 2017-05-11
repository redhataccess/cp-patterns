module.exports = function (grunt, pkg, paths) {
    grunt.config.merge({

        // Sass
        // https://github.com/sindresorhus/grunt-sass
        sass: {
            options: {
                includePaths: [ "./bower_components" ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: paths.src + '/sass/',
                    src: [
                        '**/*.scss'
                    ],
                    dest: paths.dist + '/css',
                    ext: '.css'
                }]
            }
        },

        // https://github.com/DennisBecker/grunt-sass-globbing
        sass_globbing: {
            your_target: {
                files: {
                    'src/sass/__components.scss': 'src/library/components/**/*.scss',
                    'src/sass/__layouts.scss': 'src/library/layouts/**/*.scss',
                    'src/sass/__base.scss': 'src/sass/base/**/*.scss',
                    'src/sass/global/__extends.scss': 'src/sass/global/extends/**/*.scss',
                    'src/sass/global/__functions.scss': 'src/sass/global/functions/**/*.scss',
                    'src/sass/global/__mixins.scss': 'src/sass/global/mixins/**/*.scss',
                    'src/sass/global/__variables.scss': 'src/sass/global/variables/**/*.scss',
                },
                options: {
                    useSingleQuotes: false
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'last 2 versions',
                    'Firefox > 23',
                    'iOS > 5'
                ]
            },
            dev: {
                expand: true,
                flatten: true,
                src: paths.dist + '/css/*.css',
                dest: paths.dist + '/css/',
                options: {
                    map: false
                }
            },
            dist: {
                expand: true,
                flatten: true,
                src: paths.dist + '/css/*.css',
                dest: paths.dist + '/css/',
                options: {
                    map: false
                }
            }
        },

        // Sass Lint
        // https://github.com/sasstools/grunt-sass-lint
        sasslint: {
            options: {
                configFile: './.sass-lint.yml',
            },
            target: [
                paths.src + '/sass/**/*.scss',
                paths.src + '/library/**/*.scss'
            ]
        },

        // Validate CSS files
        // https://www.npmjs.org/package/grunt-contrib-csslint
        csslint: {
            options: {
                // TODO
            },
            dist: [
                paths.dist + '/css/**/*.css'
            ],
        },

        watch: {
            sass: {
                files: [
                    paths.src + '/{,**/}*.scss'
                ],
                tasks: [ 'sass:dist', 'autoprefixer:dist' ]
            },
            livereload: {
                options: {
                    livereload: 1336
                },
                files: [
                    paths.dist + '/**/*'
                ]
            }
        }

    });
}
