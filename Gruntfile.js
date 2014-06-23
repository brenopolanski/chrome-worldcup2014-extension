module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            files: ['js/app.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask('default', ['jshint']);
};