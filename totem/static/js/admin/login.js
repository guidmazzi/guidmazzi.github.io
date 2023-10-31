const buttonRedirect = document.querySelector('#redirect')
buttonRedirect.addEventListener('click', function() {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    
    if (!username.value && !password.value){
        alert('Preencha os campos!')
    }else if (!username.value) {
        alert('Campo "Username" não está preenchido')
    } else if (!password.value) {
        alert('Campo "Password" não está preenchido')
    } else {
        if (username.value === 'admin' && password.value === 'admin'){
            window.location.href = 'admin.html';
        } else {
            alert('Usuário não encontrado')
        }
    }
    
});