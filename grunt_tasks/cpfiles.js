module.exports = function (grunt, pkg, paths) {

  grunt.config.merge(
    {
      // clean already defined in files.js

      copy: {
        cp_templates: {
          expand:  true,
          cwd:     'src',
          src:     ['cp-library/**/api/*.twig'],
          dest:    paths.dist + '/library/templates/',
          flatten: true
        },
        cp_data:      {
          expand:  true,
          cwd:     paths.src + '/cp-library',
          src:     [
            '**/docs/*.json',
            '**/docs/*.yaml',
            '**/tests/*.json'
          ],
          dest:    paths.dist + '/library/data/',
          flatten: true
        },
        cp_schemas:   {
          expand:  true,
          cwd:     paths.src + '/cp-library',
          src:     ['**/api/*.json'],
          dest:    paths.dist + '/library/schemas/',
          flatten: true
        },
        cp_assets:       {
          expand:  true,
          cwd:     paths.src + '/cp-library',
          src:     [
            '**/assets/*.json',
            '**/assets/*.manifest.yaml',
            '**/assets/**/*.js',
            '**/assets/**/*.css'
          ],
          dest:    paths.dist + '/library/assets/',
          rename: function(dest, src) {
            newdest = src.substring( src.indexOf('/') + 1 );
            newdest = dest + newdest.replace('/assets','');

            return newdest;
          }
        },
        cp_docs:      {
          expand:  true,
          src:     [paths.src + '/cp-library/**/*.docs.md'],
          dest:    paths.dist + '/library/docs/',
          flatten: true
        },
        cp_images:    {
          expand:  true,
          cwd:     paths.src + '/',
          src:     ['images/*.{png,jpg,gif}'],
          dest:    paths.dist + '/images/',
          flatten: true
        }
      },

      watch: {
        cp_templates: {
          files: [paths.src + '/cp-library/**/api/*.twig'],
          tasks: ['copy:cp_templates']
        },
        cp_data:      {
          files: [
            paths.src + '/cp-library/**/*.docs.json',
            paths.src + '/cp-library/**/*.docs.yaml',
            paths.src + '/cp-library/**/*.tests.json'
          ],
          tasks: ['copy:cp_data']
        },
        cp_assets:      {
          files: [
            paths.src + '/cp-library/**/assets/*.yaml',
            paths.src + '/cp-library/**/assets/*.json',
            paths.src + '/cp-library/**/assets/**/*.js',
            paths.src + '/cp-library/**/assets/**/*.css'
          ],
          tasks: ['copy:cp_assets']
        },
        cp_schemas:   {
          files: [paths.src + '/cp-library/**/api/*.json'],
          tasks: ['copy:cp_schemas']
        },
        cp_test_data: {
          files: [
            paths.src + '/cp-library/**/*.docs.md'
          ],
          tasks: ['copy:cp_docs']
        },
        cp_images:    {
          files: [
            paths.src + '/images/*.{png,jpg,gif}'
          ],
          tasks: ['copy:cp_images']
        }
      }

    }
  );

}
