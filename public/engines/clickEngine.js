var melodyOutput = '';
var melody = [];

$('.note').click(function() {
  var note = {
    letter: $(this).text(),
    octave: $('#melody-octave').val(),
    length: $('#melody-notelength').val()
  };
  melody.push(note);
  renderMelody();
});

function renderMelody() {
  $('#melody-output').empty();
  for (var i = 0; i < melody.length; i++) {
    $('#melody-output').append($('<div>').addClass('melody-note-container').attr('id', i + '-melody').addClass('melody-length-' + melody[i].length)
        .append($('<p>').addClass('melody-letter').addClass('melody-octave-' + melody[i].octave).text(melody[i].letter)));
  }
}

var chords = '';

$('.chord-base').click(function() {
  chords += $(this).text() + ' ';
  $('#chord-output').text(chords);
});