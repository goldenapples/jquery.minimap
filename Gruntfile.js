module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*\n' +
                ' * jQuery.minimap - <%= pkg.repository.url %>\n' +
                ' * Version: <%= pkg.version %>; built <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * Requires: jQuery\n' +
                ' *\n' +
                ' * Released under the MIT license.\n' +
                ' * <%= pkg.repository.url %>/blob/master/LICENSE.txt\n' +
                ' */\n\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! jQuery.minimap v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    'gh-pages': {
      src: ['index.html','demo/*','src/*']
    },
    watch: {
      scripts: {
        files: ['src/*'],
        tasks: ['concat','uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['concat','uglify']);

};
