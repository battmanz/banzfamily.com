var express = require('express');
var glob = require('glob');
var path = require('path');

var app = express();
var imagesPath = '/home/ubuntu/Dropbox/Photos/December\ 2015';
var fauxImagesPath = '/images/';

app.use(express.static('public'));
app.use('/css/normalize.css', express.static('node_modules/normalize.css/normalize.css'));
app.use('/images/', express.static(imagesPath));

var router = express.Router();
router.get('/', function(request, response) {
	response.json({message: 'Hooray! The API is working!'});
});
router.get('/images', function(request, response) {
	var options = {
		nonull: false,
		nodir: true
	};
	glob(imagesPath + '/*.jpg', options, function(error, files) {
		response.json(files.map(function(file) {
			return fauxImagesPath + path.relative(imagesPath, file);
		}));
	});

	/*response.json([
		'/images/IMG_8233.jpg',
		'/images/IMG_8306.jpg'
	]);*/
});
app.use('/api', router);

app.listen(8080, function() {
	console.log('Server running at http://127.0.0.1:8080/');
});
