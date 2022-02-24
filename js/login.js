const elLoginForm = document.querySelector('.login-form');
const elUsernameInput = document.querySelector('.login-form__input--username');
const elPasswordInput = document.querySelector('.login-form__input--password');

elLoginForm.addEventListener('submit', (evt) =>{
    evt.preventDefault()

    const usernameInput = elUsernameInput.value.trim();
    const passwordInput = elPasswordInput.value.trim();

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify({
                email: usernameInput,
                password: passwordInput,
        }),
    }).then((response) => response.json())
    .then((data) => {
        if(data?.token){
            window.localStorage.setItem('token', data.token);

            window.location.replace('index.html');
        }
    });
});

