var onAuthCheck = function(isAuth) {
  if (!isAuth) {
    window.location = '/login';
  }
}