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

function renderMelody() {
  $('#melody-output').empty();
  for (var i = 0; i < melody.length; i++) {
    $('#melody-output').append($('<div>').addClass('melody-note-container').attr('id', i + '-melody')
            .addClass('melody-length-' + melody[i].length)
        .append($('<p>').addClass('melody-letter').addClass('melody-octave-' + melody[i].octave).text(melody[i].letter + melody[i].octave)));
  }
}

var chords = [];

$('.chord-base').click(function() {
  var chord = {
    base: $(this).text(),
    length: $('#chord-length').val()
  }
  chords.push(chord);
  renderSong();
});

function renderChordProgression() {
  $('#chord-output').empty();
  for (var i = 0; i < chords.length; i++) {
    $('#chord-output').append($('<div>').addClass('chord-container').addClass('chord-length-' + chords[i].length)
        .append($('<p>').text(chords[i].base)));
  }
}

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
          console.log('m - i: ' + i);
          mI++;
        } else {
          $('#song-output').append($('<div>').addClass('fill-length-' + 48 - parseInt(melody[mI - 1].length)));
          console.log('m - fill: ' + 48 - parseInt(melody[mI - 1].length));
          break;
        }
      } else {
        if (cI < chords.length && i + parseInt(chords[cI].length) <= 48) {
          $('#song-output').append($('<div>').addClass('chord-container').addClass('chord-length-' + chords[cI].length)
            .append($('<p>').text(chords[cI].base)));
          i += parseInt(chords[cI].length);
          console.log('c - i: ' + i);
          cI++;
        } else {
          $('#song-output').append($('<div>').addClass('fill-length-' + 48 - parseInt(melody[cI - 1].length)));
          console.log('c - fill: ' + 48 - parseInt(melody[mI - 1].length));
          break;
        }
      }
    }
    onM = !onM;
  }
}