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

function addDeleteMelodyOnClick() {
  $('.delete-melody-note').click(function() {
    var id = $(this).parent().attr('id');
    var index = '';
    for (var i = 0; i < id.length; i++) {
      if (id[i] != '-') {
        index += id[i];
      } else {
        break;
      }
    }
    index = parseInt(index);
    melody.splice(index, 1);
    renderSong();
    return false;
  });
}

function renderSong() {
  $('#song-output').empty();
  var mI = 0;
  var cI = 0;
  var onM = true;
  var tmpM = null;
  var tmpC = null;
  while (mI < melody.length || cI < chords.length) {
    var i = 0;
    while (i < 48) {
      if (onM) {
        if (tmpM != null) {
          $('#song-output').append($('<div>').addClass('melody-note-container').attr('id', mI + '-melody')
                  .addClass('length-' + tmpM.length)
              .append($('<p>').addClass('melody-letter').addClass('melody-octave-' + melody[mI].octave)
                  .text(tmpM.letter + tmpM.octave))
              .append($('<button>').addClass('delete-melody-note').text('Delete')));
          i += parseInt(tmpM.length);
          tmpM = null;
          mI++;
        } else if (mI < melody.length) {

          if (i + parseInt(melody[mI].length) <= 48) {
            $('#song-output').append($('<div>').addClass('melody-note-container').attr('id', mI + '-melody')
                  .addClass('length-' + melody[mI].length)
              .append($('<p>').addClass('melody-letter').addClass('melody-octave-' + melody[mI].octave)
                  .text(melody[mI].letter + melody[mI].octave))
              .append($('<button>').addClass('delete-melody-note').text('Delete')));
            i += parseInt(melody[mI].length);
            mI++;
          } else {
            $('#song-output').append($('<div>').addClass('melody-note-container').attr('id', mI + '-melody')
                    .addClass('length-' + (48 - i))
                .append($('<p>').addClass('melody-letter').addClass('melody-octave-' + melody[mI].octave)
                    .text(melody[mI].letter + melody[mI].octave))
                .append($('<button>').addClass('delete-melody-note').text('Delete')));
            tmpM = {
              letter: '...',
              octave: melody[mI].octave,
              length: melody[mI].length - (48 - i)
            };
            break;
          }

        } else {
          var left = 0;
          if (melody.length != 0) {
            left = 48 - parseInt(melody[mI - 1].length);
          }
          $('#song-output').append($('<div>').addClass('length-' + left));
          break;
        }

      } else {
        if (tmpC != null) {
          $('#song-output').append($('<div>').addClass('chord-container').addClass('length-' + tmpC.length)
            .append($('<p>').text(tmpC.base)));
          i += parseInt(tmpC.length);
          tmpC = null;
          cI++;
        } else if (cI < chords.length) {

          if (i + parseInt(chords[cI].length) <= 48) {
            $('#song-output').append($('<div>').addClass('chord-container').addClass('length-' + chords[cI].length)
                .append($('<p>').text(chords[cI].base)));
            i += parseInt(chords[cI].length);
            cI++;
          } else {
            $('#song-output').append($('<div>').addClass('chord-container').addClass('length-' + (48 - i))
                .append($('<p>').text(chords[cI].base)));
            tmpC = {
              base: '...',
              length: chords[cI].length - (48 - i)
            };
            break;
          }

        } else {
          var left = 0
          if (chords.length != 0) {
            left = 48 - parseInt(chords[cI - 1].length);
          }
          $('#song-output').append($('<div>').addClass('length-' + left));
          break;
        }
      }
    }
    if (!onM) {
      $('#song-output').append($('<br><br>'));
    }
    onM = !onM;
  }
  addDeleteMelodyOnClick();
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