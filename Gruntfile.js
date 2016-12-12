module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.config('uglify', {
    scripts: {
      files: {
        'assets/app.js' : 'javascripts/app.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.config('cssmin', {
    app: {
      files: {
        'assets/app.css': ['stylesheets/style.css']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.config("watch", {
    styles: {
      files: ['stylesheets/**/*.css'],
      tasks: ['cssmin']
    },
    scripts: {
      files: ['javascripts/**/*.js'],
      tasks: ['uglify']
    },
    interface: {
      files: ['**/*.html']
    },
    options: {
      livereload: true
    },
  
  });
  grunt.registerTask('default', ['watch']);
}

