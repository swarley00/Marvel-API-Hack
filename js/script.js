$(function () {

	$('.search-btn').click(function (event) {
		var myInput = $('.input-field').val();
		getCharacters(myInput);
	});

	$(document).keydown(function (event) {
		var myInput = $('.input-field').val();
		if (event.which == 13) {
			event.preventDefault();
			getCharacters(myInput);
		}
	});

	$('.input-field').autocomplete({
		source: function (request, response) {
			var characterAPI = 'https://gateway.marvel.com/v1/public/characters';
			$.getJSON(characterAPI, {
				limit: 20,
				apikey: '8f39c130c033ff3886d62c54d7a4ecb2'
			})
			.done(function (data) {
				var characterList = data.data.results.length;
				for (var i = 0; i < characterList; i++) {
					response(data.data.results[i].name);
					console.log(data.data.results[i].name);
				}
			});
		}
	});
	
	// var availableCharacters = [
	// 	"A.I.M.",
	// 	"Aaron Stack",
	// 	"Absorbing Man"
	// ];

	// $('.input-field').autocomplete({
	// 	source: availableCharacters
	// });

	function getCharacters (inputName) {
		var characterAPI = 'https://gateway.marvel.com/v1/public/characters';
		$.getJSON(characterAPI, {
			apikey: '8f39c130c033ff3886d62c54d7a4ecb2',
			name: inputName
		})
		.done(function (data) {
			var image = data.data.results[0].thumbnail;
			var characterName = data.data.results[0].name;
			var characterID = data.data.results[0].id;
			//console.log(data);
			$('.character-image').show();
			$('.character-profile').attr("src", image.path + "." + image.extension);
			$('.character-name').text(characterName);
			getComics(characterID, characterName);
		});
	}

	function getComics (characterID, characterName) {
		var characterId = characterID;
		var comicsAPI = 'https://gateway.marvel.com/v1/public/characters/' + characterId + '/comics';
		$.getJSON(comicsAPI, {
			apikey: '8f39c130c033ff3886d62c54d7a4ecb2'
		})
		.done(function (data) {
			var characterNAME = characterName;
			var comics = data.data.results.length;
			console.log(data);
			$('.comic-copy').show();
			$('.comic-container').show();
			$('.comic-description').text("Here are the most recent comic book titles " + characterNAME + " appears in.");
			for (var i=0; i < comics; i++) {
				var image = data.data.results[i].thumbnail;
				var comicTitle = data.data.results[i].title;
				$('.comic-container').append("<div class='comic'><img src='" + image.path + "." + image.extension + "' alt='Comic Image' height='324px' width='216px'><p>" + comicTitle + "</p></div>");
			}
		});
	}

});