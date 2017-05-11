module.exports = function (grunt, pkg, paths) {
    var path = require('path');
    grunt.config.merge({

        webdriver: {
            options: {},
            remote: {
                configFile: paths.test + '/visual/jenkins.wdio.conf.js'
            },
            local: {
                configFile: paths.test + '/visual/wdio.conf.js'
            }
        },

        // Configure a mochaTest task
        mochaTest: {
            local: {
                options: {},
                src: [
                    paths.test + '/**/*.js',
                    '!' + paths.test + '/visual/**/*.js'
                ],
            },
            remote: {
                options: {
                    reporter: 'xunit',
                    captureFile: paths.test + '/reports/mocha.xml',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: [
                    paths.test + '/**/*.js',
                    '!' + paths.test + '/visual/**/*.js'
                ],
            }
        }

    });


    // test task can accept two params
    // file: if this param is blank then a server is spun up and all tests are run
    //        If a value is passed (i.e. featured-item) then featured-item-wd.js
    // update:   If 'update' is as the first or second param, then any failing tests will result in a new baslines being created
    //
    // grunt test
    // grunt test:*
    // grunt test:featured-item:update
    grunt.registerTask('test', function (file, update) {
        if (update == 'update' || file == 'update') {
            process.env.updateBaseline = true
        }
        if (file && file != 'update') {
            process.env.customSpecs = file
        }
        else {
            process.env.customSpecs = "*"
        }
        if (process.env.ROOT_URL) {
            // grunt.task.run('mochaTest:remote');
            grunt.task.run('webdriver:remote');
        }
        else {
            // grunt.task.run('mochaTest:local');
            grunt.task.run('webdriver:local');
        }
        grunt.task.run('clean:shots');
    })

}
