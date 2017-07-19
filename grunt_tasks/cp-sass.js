module.exports = function (grunt, pkg, paths) {
    grunt.config.merge({

        // Sass
        // https://github.com/sindresorhus/grunt-sass
        cp_sass: {
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
            cp_library: {
                files: {
                    'src/sass/__components.scss': 'src/cp-library/atoms/**/*.scss',
                    'src/sass/__components.scss': 'src/cp-library/components/**/*.scss',
                    'src/sass/__components.scss': 'src/cp-library/organisms/**/*.scss',
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

        // Sass Lint
        // https://github.com/sasstools/grunt-sass-lint
        cp_sasslint: {
            options: {
                configFile: './.sass-lint.yml',
            },
            target: [
                paths.src + '/sass/**/*.scss',
                paths.src + '/library/**/*.scss'
            ]
        }

    });
}
