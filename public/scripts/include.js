var isAuthenticated = false;
var onAuthCheck;

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
  displayAuthItems(isAuthenticated);

  // redirect to /login if requireAuth.js is included and user is not authenticated
  if (onAuthCheck) {
    onAuthCheck(isAuthenticated);
  }
}

function displayAuthItems(isAuth) {
  if (isAuth) {
    $('.auth-hide').hide();
    $('.auth-show').show();
  } else {
    $('.auth-hide').show();
    $('.auth-show').hide();
  }
}
