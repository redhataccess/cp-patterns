module.exports = function( grunt, pkg ) {
    var path = require( 'path' );
    grunt.config.merge( {
        php: {
            dist: {
                options: {
                    hostname: 'localhost',
                    port: 5001,
                    base: './',
                    open: 'schema/page'
                }
            },
            test: {
                options: {
                    silent: true,
                    port: 5001,
                    base: './'
                }
            }
        },
        rsync: {
            options: {
                args: [ "--verbose", "--copy-dirlinks" ],
                exclude: [ ".git*", "*.scss", "node_modules", ".sass-cache" ],
                recursive: true
            },
            webrh: {
                options: {
                    src: "./",
                    dest: "/usr/share/patternbuilder/webroot",
                    host: "root@web-rh-build.dev.a1.vary.redhat.com",
                    delete: true // Careful this option could cause data loss, read the docs!
                }
            }
        }
    } );
    grunt.registerTask( 'schema', function( name ) {
        if ( name == undefined ) {
            name = "band";
        }
        grunt.config.set( 'php.dist.options.open', 'schema/' + name );
        grunt.task.run( 'dev' );
        grunt.task.run( 'php' );
        grunt.task.run( 'watch' );
    } );
}
