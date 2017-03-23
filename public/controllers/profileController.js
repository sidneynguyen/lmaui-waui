$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/user/me',
    success: parseProfile
  });
});

function parseProfile(profile) {
  if (profile.isAuthenticated) {
    $('#username-display').text(profile.user.username);
    var songs = profile.songs;
    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      var date = new Date(song.dateCreated);
      $('#song-list').append($('<div>').attr('id', song._id))
          .append($('<a>').attr('href', '/song/' + song._id)
              .append($('<h1>').text(song.title)))
          .append($('<p>').text(song.melody))
          .append($('<small>').text(song.chords)).append($('<br>'))
          .append($('<small>').text(date.toString()));
    }
  } else {
    window.location = '/login';
  }
}