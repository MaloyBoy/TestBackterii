const form = document.getElementById('form');
const name = document.getElementById('name');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const tackt = document.getElementById('tackt');

document.getElementById('enter').disabled = false;

/**
 * Отрицательный input
 * @param input
 * @param message
 */
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error'
}

/**
 * Положительный input
 * @param input
 */
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Регулярки
 * @param email,name,phone
 * @returns {boolean}
 */
function regEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function regName(name) {
    return /^[А-Яа-яЁё]{2,16}$/.test(name);
}

function regPhone(phone) {
    return /^\s*\+?375((33\d{7})|(29\d{7})|(44\d{7}|)|(25\d{7}))\s*$/.test(phone);
}

/**
 * Валидация и отправка
 */
$('button.enter').click(function (e) {
    e.preventDefault();
    const namev = name.value.trim();
    const phonev = phone.value.trim();
    const emailv = email.value.trim();
    const taktv = tackt.value.trim();
    if (namev === '' && phonev === '' && emailv === '' && taktv === '') {
        setErrorFor(name, 'Введите имя');
        setErrorFor(phone, 'Введите телефон');
        setErrorFor(email, 'Введите почту');
        setErrorFor(tackt, 'Введите количество тактов');
    } else if (namev === '') {
        setErrorFor(name, 'Введите имя корректно');
    } else if (!regName(namev)) {
        setErrorFor(name, 'Введите имя корректно');
    } else if (phonev === '') {
        setSuccessFor(name);
        setErrorFor(phone, 'Введите телефон корректно');
    } else if (!regPhone(phonev)) {
        setSuccessFor(name);
        setErrorFor(phone, 'Введите телефон корректно');
    } else if (emailv === '') {
        setSuccessFor(name);
        setSuccessFor(phone);
        setErrorFor(email, 'Введите почту корректно');
    } else if (taktv === '') {
        setSuccessFor(name);
        setSuccessFor(phone);
        setSuccessFor(email);
        setErrorFor(tackt, 'Введите количество тактов корректно');
    } else if ((taktv > 100) && (taktv <= 0)) {
        setSuccessFor(name);
        setSuccessFor(phone);
        setSuccessFor(email);
        setErrorFor(tackt, 'Введите количество тактов корректно');
    } else if (taktv <= 0) {
        setSuccessFor(name);
        setSuccessFor(phone);
        setSuccessFor(email);
        setErrorFor(tackt, 'Введите количество тактов корректно');
    } else {
        setSuccessFor(name);
        setSuccessFor(phone);
        setSuccessFor(email);
        setSuccessFor(tackt);
        $.ajax({
            method: "POST",
            url: "bacterii.php",
            dataType: 'json',
            data: {
                tackt: taktv,
            }
        })
            .done(function (msg) {
                let GreenBact = msg['GreenBactGreen']+msg['GreenBactRed'];
                let RedBact = msg['RedBactGreen']+msg['RedBactRed'];
                alert ("Зелёных бактерий "+GreenBact);
                alert ("Красных бактерий "+RedBact);
                 /*else {
                    setErrorFor(name, 'Не верно введён логин или пароль');
                    setErrorFor(phone, 'Не верно введён логин или пароль');
                    $('input.name').val('');
                    $('input.password').val('');
                    $('input.email').val('');
                    $('input.tackt').val('');*/
            })
    }
})