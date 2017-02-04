var parsedSong = '';

var melodyNote = '';

$(document).ready(function() {
  $('#note-input').on('input', function() {
    parseMelodyNote($(this).val());
  });

  $('#note-input').on('keypress', function(e) {
    if (e.keyCode === 13 && melodyNote.length > 0 && melodyNote.length <=5) {
      addNoteToSong(melodyNote);
      $(this).val('');
      melodyNote = '';
    }
  });
});

function parseMelodyNote(note) {
  melodyNote = note;
  if (melodyNote.length > 0) {
    var letter = note[0];
    if (letter.match(/[a-g]/i)) {
      melodyNote = letter.toUpperCase() + melodyNote.substring(1);
    } else {
      melodyNote = '';
    }
  }
  if (melodyNote.length > 1) {
    var letter = melodyNote[1];
    if (letter.match(/[bB]/i)) {
      melodyNote = melodyNote[0] + 'b' + melodyNote.substring(2);
    } else if (letter.match(/[#]/i)) {
      melodyNote = melodyNote[0] + '#' + melodyNote.substring(2);
    } else if (letter.match(/[1-8]/i)) {
      melodyNote = melodyNote;
    } else {
      melodyNote = melodyNote[0];
    }
  }
  if (melodyNote.length > 2) {
    if (!melodyNote.match(/[a-g][bB#][1-8]/i) && !melodyNote.match(/[a-g][1-8][*%]/i)) {
      melodyNote = melodyNote.substring(0, 2);
    }
  }
  if (melodyNote.length > 3) {
    if (!melodyNote.match(/[a-g][bB#][1-8][*%]/i) && !melodyNote.match(/[a-g][1-8][*%][0-4]/i)) {
      melodyNote = melodyNote.substring(0, 3);
    }
  }
  if (melodyNote.length > 4) {
    if (!melodyNote.match(/[a-g][bB#][1-8][*%][0-4]/i)) {
      melodyNote = melodyNote.substring(0, 4);
    }
  }
  if (melodyNote.length > 5) {
    melodyNote = melodyNote.substring(0, 5);
  }
  $('#note-input').val(melodyNote);
}

function addNoteToSong(note) {
  parsedSong += ',' + note;
  $('#parsed-song').text(parsedSong);
}
