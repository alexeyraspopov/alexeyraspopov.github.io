gulp = require('gulp');
glob = require('glob');
path = require('path');
moment = require('moment');
rename = require('gulp-rename');
markdown = require('gulp-markdown');
layoutize = require('gulp-layoutize');

posts = glob.sync('_posts/*.md').map(function(post){
	var tokens = path.basename(post, '.md').split('-'),
		date = moment(tokens.splice(0, 3).join('-')).format('MMM DD, YYYY'),
		name = tokens.join('-');

	return { path: post, date: date, name: name };
});

gulp.task('default', function(){
	return posts.map(function(post){
		return gulp.src(post.path)
			.pipe(markdown())
			.pipe(layoutize({
				templatePath: '_layouts/index.jade',
				engine: 'jade',
				locals: { time: post.date }
			}))
			.pipe(rename({
				basename: post.name
			}))
			.pipe(gulp.dest('posts'));
	});
});