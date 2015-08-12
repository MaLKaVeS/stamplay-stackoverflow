/// <vs />
// How-To con VISUAL http://www.mikeobrien.net/blog/using-gulp-to-build-and-deploy-dotnet-apps-on-windows/
var 
 gulp = require('gulp'),
    watch = require('gulp-watch'), /* Para tareas que mantienen la ejecución */
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

gulp.task('deploy', [], function (callback) {
    console.log('Desplegando app!');
    
    

    callback();
});