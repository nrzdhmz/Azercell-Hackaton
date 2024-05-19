function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  if (username === 'admin' && password === 'adminadmin') {
    window.location.href = './home.html';
  } else {
    alert('Invalid username or password!');
    document.getElementById('password').value = '';
  }
}