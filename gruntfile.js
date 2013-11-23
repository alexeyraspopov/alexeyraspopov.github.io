module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-md2html');
	grunt.loadNpmTasks('grunt-bump');

	grunt.initConfig({
		md2html: {
			dist: {
				options: {
					layout: '_layout.html',
					basePath: './',
				},
				files: [{
					expand: true,
					cwd: '_posts',
					src: '*.md',
					dest: 'posts',
					ext: '.html'
				}]
			}
		}
	});

	grunt.registerTask('default', 'md2html');
};