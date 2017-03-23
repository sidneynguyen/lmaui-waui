var melody = '';

$('.note').click(function() {
  melody += $(this).text() + ' ';
  $('#melody-output').text(melody);
});

var chords = '';

$('.chord-base').click(function() {
  chords += $(this).text() + ' ';
  $('#chord-output').text(chords);
});