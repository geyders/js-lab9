function showTab(tab) {
    document.getElementById('registerForm').style.display = (tab === 'register') ? 'block' : 'none';
    document.getElementById('loginForm').style.display = (tab === 'login') ? 'block' : 'none';
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${tab}')"]`).classList.add('active');
}

function togglePasswordVisibility(id, icon) {
    const field = document.getElementById(id);
    if (field.type === 'password') {
        field.type = 'text';
        icon.src = 'img/eye.jpg';
    } else {
        field.type = 'password';
        icon.src = 'img/eye-slash.jpg';
    }
}

function updateCities() {
    const country = document.getElementById('country').value;
    const city = document.getElementById('city');
    city.innerHTML = '';
    city.disabled = !country;

    const cities = {
        ua: ['Київ', 'Львів', 'Одеса'],
        pl: ['Варшава', 'Краків', 'Гданськ']
    };

    if (country && cities[country]) {
        cities[country].forEach(c => {
            const opt = document.createElement('option');
            opt.value = opt.textContent = c;
            city.appendChild(opt);
        });
    }
}

function validateForm(e) {
    e.preventDefault();
    let valid = true;

    const getEl = id => document.getElementById(id);
    const setError = (id, msg) => {
        getEl(id).style.border = '2px solid red';
        getEl(id + 'Error').textContent = msg;
        valid = false;
    };
    const setValid = id => {
        getEl(id).style.border = '2px solid green';
        getEl(id + 'Error').textContent = '';
    };

    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇ]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+380\d{9}$/;

    const fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'phone', 'dob', 'sex', 'country', 'city'];
    fields.forEach(id => getEl(id).style.border = '#ccc');

    if (!nameRegex.test(getEl('firstName').value)) setError('firstName', 'Від 3 до 15 літер');
    else setValid('firstName');

    if (!nameRegex.test(getEl('lastName').value)) setError('lastName', 'Від 3 до 15 літер');
    else setValid('lastName');

    if (!emailRegex.test(getEl('email').value)) setError('email', 'Невірний формат email');
    else setValid('email');

    const password = getEl('password').value;
    if (password.length < 6) setError('password', 'Мінімум 6 символів');
    else setValid('password');

    if (password !== getEl('confirmPassword').value) setError('confirmPassword', 'Паролі не збігаються');
    else setValid('confirmPassword');

    if (!phoneRegex.test(getEl('phone').value)) setError('phone', 'Формат: +380XXXXXXXXX');
    else setValid('phone');

    const dob = new Date(getEl('dob').value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (dob > today) setError('dob', 'Дата не може бути в майбутньому');
    else if (age < 12) setError('dob', 'Вам має бути 12 років або більше');
    else setValid('dob');

    ['sex', 'country', 'city'].forEach(id => {
        if (!getEl(id).value) setError(id, 'Обовʼязкове поле');
        else setValid(id);
    });

    if (valid) {
        document.getElementById('registerSuccess').textContent = 'Реєстрація успішна!';
        document.getElementById('registerForm').reset();
        updateCities();
    }
}

function validateLoginForm(e) {
    e.preventDefault();
    let valid = true;

    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');

    if (loginUsername.value.length < 3) {
        loginUsername.style.border = '2px solid red';
        document.getElementById('loginUsernameError').textContent = 'Імʼя має містити щонайменше 3 символи';
        valid = false;
    } else {
        loginUsername.style.border = '2px solid green';
        document.getElementById('loginUsernameError').textContent = '';
    }

    if (loginPassword.value.length < 6) {
        loginPassword.style.border = '2px solid red';
        document.getElementById('loginPasswordError').textContent = 'Мінімум 6 символів';
        valid = false;
    } else {
        loginPassword.style.border = '2px solid green';
        document.getElementById('loginPasswordError').textContent = '';
    }

    if (valid) alert('Авторизація успішна!');
}
