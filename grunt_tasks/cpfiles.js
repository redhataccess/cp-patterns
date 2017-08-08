module.exports = function (grunt, pkg, paths) {

    grunt.config.merge({
        // clean already defined in files.js

        copy: {
            cp_templates: {
                expand: true,
                cwd: 'src',
                src: [ 'cp-library/**/api/*.twig' ],
                dest: paths.dist + '/library/templates/',
                flatten: true
            },
            cp_data: {
                expand: true,
                cwd: paths.src + '/cp-library',
                src: [
                    '**/docs/*.json',
                    '**/docs/*.yaml',
                    '**/tests/*.json'
                ],
                dest: paths.dist + '/library/data/',
                flatten: true
            },
            cp_schemas: {
                expand: true,
                cwd: paths.src + '/cp-library',
                src: [ '**/api/*.json' ],
                dest: paths.dist + '/library/schemas/',
                flatten: true
            },
            cp_docs: {
                expand: true,
                src: [ paths.src + '/cp-library/**/*.docs.md' ],
                dest: paths.dist + '/library/docs/',
                flatten: true
            },
            cp_images: {
                expand: true,
                cwd: paths.src + '/',
                src: [ 'images/*.{png,jpg,gif}' ],
                dest: paths.dist + '/images/',
                flatten: true
            }
        },

        watch: {
            cp_templates: {
                files: [ paths.src + '/cp-library/**/api/*.twig' ],
                tasks: [ 'copy:templates' ]
            },
            cp_data: {
                files: [
                    paths.src + '/cp-library/**/*.docs.json',
                    paths.src + '/cp-library/**/*.docs.yaml',
                    paths.src + '/cp-library/**/*.tests.json'
                ],
                tasks: [ 'copy:data' ]
            },
            cp_schemas: {
                files: [ paths.src + '/cp-library/**/api/*.json' ],
                tasks: [ 'copy:schemas' ]
            },
            cp_test_data: {
                files: [
                    paths.src + '/cp-library/**/*.docs.md'
                ],
                tasks: [ 'copy:docs' ]
            },
            cp_images: {
                files: [
                    paths.src + '/images/*.{png,jpg,gif}'
                ],
                tasks: [ 'copy:images' ]
            }
        }

    });

}
