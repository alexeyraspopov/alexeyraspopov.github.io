function load(url){
	return new RSVP.Promise(function(resolve, reject){
		var request = new XMLHttpRequest();

		request.onload = function(){
			resolve(this.responseText);
		};

		request.open('GET', url, true);
		request.send(null);
	});
}

function createArticle(source){
	var article = document.createElement('article');

	article.className = 'post';
	article.innerHTML = source;

	return article;
}

var renderer = new marked.Renderer();

renderer.heading = function(text, level){
	return interpolate('<h{ level }><a href="#{ hash }">{ text }</a></h{ level }>', {
		text: text,
		level: level,
		hash: slugify(text)
	});
};

function parseSource(source){
	return marked(source, { renderer: renderer });
}

load('posts.json')
	.then(JSON.parse)
	.then(function(posts){
		return RSVP.Promise.all(posts.map(load));
	})
	.then(function(posts){
		return posts
			.map(parseSource)
			.map(createArticle);
			// time
	})
	.then(function(posts){
		posts.forEach(function(post){
			document.querySelector('main').appendChild(post);
		});
	});