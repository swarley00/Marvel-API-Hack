$(function () {

	$('.search-btn').click(function (event) {
		var myInput = $('.input-field').val();
		getCharacters(myInput);
	});

	function getCharacters (inputName) {
		var characterAPI = 'https://gateway.marvel.com/v1/public/characters';
		$.getJSON(characterAPI, {
			apikey: '8f39c130c033ff3886d62c54d7a4ecb2',
			name: inputName
		})
		.done(function (data) {
			//console.log(data);
			var image = data.data.results[0].thumbnail;
			var characterName = data.data.results[0].name;
			var characterID = data.data.results[0].id;
			$('.character-image').show();
			$('.character-profile').attr("src", image.path + "." + image.extension);
			$('.character-name').text(characterName);
			getComics(characterID);
		});
	}

	function getComics (characterID) {
		var characterId = characterID;
		var comicsAPI = 'https://gateway.marvel.com/v1/public/characters/' + characterId + 'comics';
		$.getJSON(comicsAPI, {
			//dateDescriptor: 'thisMonth',
			apikey: '8f39c130c033ff3886d62c54d7a4ecb2'
		})
		.done(function (data) {
			var characterName = data.data.results[0].name;
			var comics = data.data.results[0].comics.items.length;
			console.log(data);
			$('.comic-copy').show();
			$('.comic-container').show();
			$('.comic-description').text("Here are the most recent comic book titles " + characterName + " appears in.");
			for (var i=0; i < comics; i++) {
				var comicTitle = data.data.results[0].comics.items[i].name;
				console.log(comicTitle);
				$('.comic').append("<p>" + comicTitle + "</p>");
				// $('.comic-title').text(comicTitle);
			}
		});
	}
});

//data.data.