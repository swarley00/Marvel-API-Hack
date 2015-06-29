$(function () {

	$('.search-btn').click(function (event) {
		var myInput = $('.input-field').val();
		getCharacters(myInput);
		getComics();
	});

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
			$('.character-image').show();
			$('.character-profile').attr("src", image.path + "." + image.extension);
			$('.character-name').text(characterName);
		});
	}

	function getComics () {
		var characterID = ;
		var comicsAPI = 'https://gateway.marvel.com/v1/public/characters/' + characterID + 'comics';
		$.getJSON(comicsAPI, {
			apikey: '8f39c130c033ff3886d62c54d7a4ecb2',
		})
		.done(function (data) {
			console.log(data);
		});
	}
});

//data.data.results[0].id
//var comicsAPI = 'https://gateway.marvel.com/v1/public/characters/1009664/comics';
//How do I get the Character ID from one API call and use it in another API call?

