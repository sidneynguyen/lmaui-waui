var parsedNote = '';
var parsedSong = '';

$(document).ready(function() {
  $('#song-input').on('input', function() {
    parseNote($(this).val());
  });

  $('#song-input').on('keypress', function(e) {
    if (e.keyCode === 13) {
      addNoteToSong(parsedNote);
      $(this).val('');
      parseNote('');
    }
  });
});

function parseNote(note) {
  parsedNote = note;
  var length = parsedNote.length;
  if (length > 0) {
    parsedNote = parseNoteLetter(parsedNote);
  }
  if (length > 1) {
    parsedNote = parseNoteMod(parsedNote);
  }
  $('#parsed-note').text(parsedNote);
}

function parseNoteLetter(note) {
  var letter = note[0];
  if (letter.match(/[a-g]/i)) {
    return letter.toUpperCase() + note.substring(1);
  }
  return 'Letter error';
}

function parseNoteMod(note) {
  var letter = note[1];
  if (letter === '3') {
    return note[0] + '#';
  }
  if (letter === 'B') {
    return note[0] + 'b';
  }
  if (letter === '#' || letter === 'b') {
    return note;
  }
  return 'Mod error';
}

function addNoteToSong(note) {
  parsedSong += ' ' + note;
  $('#parsed-song').text(parsedSong);
}