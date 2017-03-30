var melody = [];

$('.note').click(function() {
  var note = {
    letter: $(this).text(),
    octave: $('#melody-octave').val(),
    length: $('#melody-notelength').val()
  };
  if (note.letter == 'Pause') {
    note.letter = '';
  }
  melody.push(note);
  renderSong();
});

var chords = [];

$('.chord-base').click(function() {
  var chord = {
    base: $(this).text(),
    length: $('#chord-length').val()
  }
  chords.push(chord);
  renderSong();
});

function renderSong() {
  $('#song-output').empty();
  var mI = 0;
  var cI = 0;
  var onM = true;
  while (mI < melody.length || cI < chords.length) {
    for (var i = 0; i < 48;) {
      if (onM) {
        if (mI < melody.length && i + parseInt(melody[mI].length) <= 48) {
          $('#song-output').append($('<div>').addClass('melody-note-container').attr('id', mI + '-melody')
                  .addClass('melody-length-' + melody[mI].length)
              .append($('<p>').addClass('melody-letter').addClass('melody-octave-' + melody[mI].octave)
                  .text(melody[mI].letter + melody[mI].octave)));
          i += parseInt(melody[mI].length);
          mI++;
        } else {
          var left = 0;
          if (melody.length != 0) {
            left = 48 - parseInt(melody[mI - 1].length);
          }
          $('#song-output').append($('<div>').addClass('fill-length-' + left));
          break;
        }
      } else {
        if (cI < chords.length && i + parseInt(chords[cI].length) <= 48) {
          $('#song-output').append($('<div>').addClass('chord-container').addClass('chord-length-' + chords[cI].length)
            .append($('<p>').text(chords[cI].base)));
          i += parseInt(chords[cI].length);
          cI++;
        } else {
          var left = 0
          if (chords.length != 0) {
            left = 48 - parseInt(chords[cI - 1].length);
          }
          $('#song-output').append($('<div>').addClass('fill-length-' + left));
          break;
        }
      }
    }
    if (!onM) {
      $('#song-output').append($('<br><br>'));
    }
    onM = !onM;
  }
}

function melodyToString() {
  var str = '';
  for (var i = 0; i < melody.length; i++) {
    var curr = melody[i];
    str += curr.letter + '^' + curr.octave + '*' + curr.length + '-';
  }
  return str;
}

function chordsToString() {
  var str = '';
  for (var i = 0; i < chords.length; i++) {
    var curr = chords[i];
    str += curr.base + '*' + curr.length + '-';
  }
  return str;
}