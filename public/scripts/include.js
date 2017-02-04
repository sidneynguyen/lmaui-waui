var isAuthenticated = false;

$(document).ready(function() {
  $('#navbar-container').load('templates/navbar.html');
  displayAuthItems();

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/user',
    success: authCheck
  });
});

var authCheck = function(auth) {
  isAuthenticated = auth.isAuthenticated;
  displayAuthItems();
}

function displayAuthItems() {
  if (isAuthenticated) {
    $('.auth-hide').hide();
    $('.auth-show').show();
  } else {
    $('.auth-hide').show();
    $('.auth-show').hide();
  }
}
