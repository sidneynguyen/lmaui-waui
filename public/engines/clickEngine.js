var melody = '';

$('.note').click(function() {
  melody += $(this).text() + ' ';
  $('#melody-output').text(melody);
})