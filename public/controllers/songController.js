$(document).ready(function() {
  var path = window.location.pathname;
  var id = parsePathForId(path);
  
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/song/' + id,
    success: displaySong
  });
});

function displaySong(song) {
  if (song.err) {
    console.log(song.err);
  }
  $('#title').text(song.title);
  $('#melody').text(song.melody);
  $('#chords').text(song.chords);
  $('#date-created').text(song.dateCreated);
}

function parsePathForId(path) {
  var id = '';
  var i = path.length - 1;
  while (path.charAt(i) != '/' && i > 0) {
    id = path.charAt(i) + id;
    i--;
  }
  return id;
}