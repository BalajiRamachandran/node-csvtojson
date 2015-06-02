/*
	GRUNT instructions
	1. ensure you have dependencies installed run `npm install` in the root directory of the repo to get dev dependencies
	2. run `grunt` in root dir of the repo in a shell to get the watcher started
		The watcher looks at files. When a file is added or changed it passes the file through jshint
	3. run `grunt test` to execute all unit tests and get output
*/

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	var files = ['Gruntfile.js', 'libs/**/*.js', 'test/*.js', 'bin/csvtojson', 'bin/csvtojson.js'];
	grunt.initConfig({
		jshint: {
			all: {
				src: files,
				options: {
					'globals': {
						// Add things that are global but not defined by js nativly. Note that standard node globals are already defined.
					},
					// see the docs for full list of options http://jshint.com/docs/options/
					'bitwise': true,
					'curly': true,
					'eqeqeq': true,
					'forin': true,
					'freeze': true,
					'funcscope': true,
					'futurehostile': true,
					'latedef': true,
					'maxcomplexity': 10, // arbitrary but anything over 10 quickly becomes hard to think about
					'maxdepth': 3, // also arbitrary. Deeply nested functions should be refactored to use helper functions.
					'maxparams': 4, // arbitrary. Consider using an object literal instead of list of params.
					'nocomma': true,
					//'nonew': true, // In the future when all objects are refactored to avoid new.
					//'strict': true, // in the future when all functions are closer to adhering to strict.
					'notypeof': true,
					'undef': true,
					'unused': true,
					'node': true // defines node globals
				}
			}
		},
		mochaTest: {
			test: {
				src: (function () {console.log([files[2]]); return [files[2]];}())
			}
		},
		watch: {
			files: files,
			tasks: ['newer:jshint:all'],
			options: {
				spawn: false,
				event: ['changed', 'added']
			}
		}
	});
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('test', ['mochaTest']);
};