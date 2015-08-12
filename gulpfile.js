/// <vs />
// How-To con VISUAL http://www.mikeobrien.net/blog/using-gulp-to-build-and-deploy-dotnet-apps-on-windows/
var 
 gulp = require('gulp'),
    watch = require('gulp-watch'), /* Para tareas que mantienen la ejecución */
    exec = require('gulp-exec'),
    exec_std = require('child_process').exec;
    assemblyInfo = require('gulp-dotnet-assembly-info'), // Para sobreescribir los datos del AssemblyInfo
    msbuild = require('gulp-msbuild'), // Para compilar 
    mocha = require('gulp-mocha'), // Framework de testing
    xmlpoke = require('xmlpoke'), // Para leer y editar XML
 /* Testing de UI */
    path = require('path'),
    child_process = require('child_process'),
    protractor = require("gulp-protractor").protractor;
// YARGS se usa para pasar argumentos (por si hace falta)
//var args = require('yargs').argv;

// Ejecución por defecto, sin parámetro
gulp.task('default', function () {
    console.log('Tareas disponibles: ');
    console.log('* testui -> Ejecuta los test con protractor [PENDIENTE]');
    console.log('* testmocha -> Ejecuta los test con mocha [PENDIENTE]');
    console.log('* runtest -> Ejecuta los test');
    console.log('* ci -> Ejecuta el proceso de integración continua');
    //console.log('* publicadev -> Publica a desarrollo');
    //console.log('* publicareal -> Publica a producción');
    console.log('* run -> Ejecuta la app en local');
    console.log('* deploy -> Despliega la app');
});

// Para ejecutar los tests
gulp.task('runtest', /*['tasks'],*/ function (callback) {
    console.log('Comenzando pruebas.');
    
    var dominio = 'https://plazas.stamplayapp.com/';
    
    return gulp.src(["tests/protactor.js"])
    .pipe(protractor({
        configFile: "tests/protractor.config.js",
        args: ['--baseUrl', dominio]
    }))
    .on('error', function (e) {
        //console.log(e);
        throw e;
    });
});

gulp.task('testui', /*['tasks'],*/ function (callback) {
    console.log('Comenzando pruebas de interfaz.');
    
    var dominio = 'https://plazas.stamplayapp.com/';
    
    return gulp.src(["tests/protactor.js"])
    .pipe(protractor({
        configFile: "tests/protractor.config.js",
        args: ['--baseUrl', dominio]
    }))
    .on('error', function (e) {
        //console.log(e);
        throw e;
    });
    
    callback();
});

gulp.task('testmocha', /*['tasks'],*/ function (callback) {
    console.log('Comenzando pruebas de servicios.');
    /* MOCHA */
    //return gulp.src('tests/testDev.js', { read: false })
    //    .pipe(mocha({ reporter: 'spec' }));
    callback();
});

// Publica a desarrollo')
gulp.task('publicadev', ['webconfigdev', 'runtest'], function (callback) { });
// Publica a real
gulp.task('publicareal', ['webconfigreal', 'runtest'], function (callback) { });

// Para cuando hay integración continua :')
gulp.task('ci', []);

gulp.task('run', [], function (callback) {
    console.log('Ejecutando app!');
    
    
    exec_std('stamplay start', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

    //gulp.src('.')
    //    .pipe(exec('stamplay start'));
});

gulp.task('deploy', [], function (callback) {
    console.log('Desplegando app!');
       
    var options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
    };
    var reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    }
    
    gulp.src('./**/**')
        .pipe(exec('stamplay deploy', options))
    //.pipe(exec('git checkout <%= file.path %> <%= options.customTemplatingThing %>', options))
    .pipe(exec.reporter(reportOptions));

    callback();
});