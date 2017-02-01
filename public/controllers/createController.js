function submitSong() {
  var song = arrayToJson($('#song-form').serializeArray());
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/song',
    data: song,
    success: function(song) {
        window.location = '/';
    }
  });
  return false;
}

function arrayToJson(formArray) {
  var song = {
    title: formArray[0].value,
    music: formArray[1].value,
    privacy: formArray[2].value
  };
  return song;
}