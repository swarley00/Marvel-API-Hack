$(function () {

	$('.search-btn').click(function (event) {
		var myInput = $('.input-field').val();
		apiCall(myInput);
	});

	function apiCall (inputName) {
		var characterAPI = 'https://gateway.marvel.com/v1/public/characters';
		$.getJSON(characterAPI, {
			apikey: '8f39c130c033ff3886d62c54d7a4ecb2',
			name: inputName
		})
		.done(function (data) {
			console.log(data);
			var image = data.data.results[0].thumbnail;
			var characterName = data.data.results[0].name;
			$('.character-image').show();
			$('.character-profile').attr("src", image.path + "." + image.extension);
			$('.character-name').text(characterName);
		});
	}
});

//data.data.results[0].id
