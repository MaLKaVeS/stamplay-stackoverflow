module.exports = function (grunt) {
    
    //Deploys everything
    grunt.registerInitTask('deploy', 'Deploy app', function () {
        grunt.task.run(['build']);

        grunt.task.run();

    });
}