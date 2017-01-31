var isAuthenticated = false;

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/user',
    success: authCheck
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/song',
    success: displaySongs
  });
});

var authCheck = function(auth) {
  isAuthenticated = auth.isAuthenticated;
  if (isAuthenticated) {
    $('.auth-hide').hide();
    $('.auth-show').show();
  } else {
    $('.auth-hide').show();
    $('.auth-show').hide();
  }
}

var displaySongs = function(songs) {
  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];
    $('#song-list').append($('<div>')
        .append($('<h1>').text(song.title))
        .append($('<p>').text(song.music))
        .append($('<small>').text(song.dateCreated)));
  }
}

function submitSong() {
  var song = arrayToJson($('#song-form').serializeArray());
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/song',
    data: song,
    success: function(song) {
      $('#song-list').append($('<div>')
        .append($('<h1>').text(song.title))
        .append($('<p>').text(song.music))
        .append($('<small>').text(song.dateCreated)));
    }
  });
  return false;
}

function arrayToJson(formArray) {
  var song = {
    title: formArray[0].value,
    music: formArray[1].value,
  };
  return song;
}
