module.exports = function (grunt, pkg, paths) {

    grunt.config.merge({
        clean: {
            assetsDist: [ paths.dist + '/*' ],
            sassGlobbing: [ paths.src + '/**/__*' ],
            shots: [ paths.test + '/visual/shots/*.png', '!' + paths.test + '/visual/shots/*.baseline.png' ]
        },

        copy: {
            templates: {
                expand: true,
                cwd: 'src',
                src: [ 'library/**/api/*.twig' ],
                dest: paths.dist + '/library/templates/',
                flatten: true
            },
            data: {
                expand: true,
                cwd: paths.src + '/library',
                src: [
                    '**/docs/*.json',
                    '**/docs/*.yaml',
                    '**/tests/*.json'
                ],
                dest: paths.dist + '/library/data/',
                flatten: true
            },
            schemas: {
                expand: true,
                cwd: paths.src + '/library',
                src: [ '**/api/*.json' ],
                dest: paths.dist + '/library/schemas/',
                flatten: true
            },
            docs: {
                expand: true,
                src: [ paths.src + '/library/**/*.docs.md' ],
                dest: paths.dist + '/library/docs/',
                flatten: true
            },
            images: {
                expand: true,
                cwd: paths.src + '/',
                src: [ 'images/*.{png,jpg,gif}' ],
                dest: paths.dist + '/images/',
                flatten: true
            }
        },

        watch: {
            templates: {
                files: [ paths.src + '/library/**/api/*.twig' ],
                tasks: [ 'copy:templates' ]
            },
            data: {
                files: [
                    paths.src + '/library/**/*.docs.json',
                    paths.src + '/library/**/*.docs.yaml',
                    paths.src + '/library/**/*.tests.json'
                ],
                tasks: [ 'copy:data' ]
            },
            schemas: {
                files: [ paths.src + '/library/**/api/*.json' ],
                tasks: [ 'copy:schemas' ]
            },
            test_data: {
                files: [
                    paths.src + '/library/**/*.docs.md'
                ],
                tasks: [ 'copy:docs' ]
            },
            images: {
                files: [
                    paths.src + '/images/*.{png,jpg,gif}'
                ],
                tasks: [ 'copy:images' ]
            }
        }

    });

}
