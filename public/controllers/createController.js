function submitSong() {
  var song = arrayToJson($('#song-form').serializeArray());
  song.melody = melody;
  song.chords = chords;
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
    privacy: formArray[1].value
  };
  return song;
}