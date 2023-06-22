        // takes the username and password from localstorage
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');

// shows the username and password in the console
console.log('Username:', username);
console.log('Password:', password);
//shows it in the html
const showUsername = document.querySelector('.show-user');
showUsername.innerHTML = username;