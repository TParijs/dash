console.log("js loaded")
const submitBtn = document.querySelector('.submit-btn');
        submitBtn.addEventListener('click', function() {
            const usernameInput = document.querySelector('.username');
            const passwordInput = document.querySelector('.password');
            const username = usernameInput.value;
            const password = passwordInput.value;

           
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            
            console.log('Username:', username);
            console.log('Password:', password);

            
            alert('Login successful!');
            window.location.href = "/html-pages/home.html"
            
        });

//         // takes the username and password from localstorage
// const username = localStorage.getItem('username');
// const password = localStorage.getItem('password');

// // shows the username and password in the console
// console.log('Username:', username);
// console.log('Password:', password);
// //shows it in the html
// const showUsername = document.querySelector('.show-user');
// showUsername.innerHTML = username;