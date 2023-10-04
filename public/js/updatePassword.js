var passisvalid = false;
var passConfirmed = false;

if(document.querySelector('#currentPassword')) {
    let currentPassword = document.querySelector('#currentPassword');
};
if(document.querySelector('#newPassword')) {
    let newPassword = document.querySelector('#newPassword');
};
if(document.querySelector('#newPasswordConfirmation')) {
    let newPasswordConfirmation = document.querySelector('#newPasswordConfirmation');
};

if(typeof(currentPassword) !== 'undefined') {
    currentPassword.addEventListener('change', function () {
        let validpassword = verifyPassword(this);
    });
}
if(typeof(newPassword) !== 'undefined') {
    newPassword.addEventListener('change', function () {
        let validpassword = verifyPassword(this);
    });
}
if(typeof(newPasswordConfirmation) !== 'undefined') {
    newPasswordConfirmation.addEventListener('change', function () {
        console.log("Change ok");
        let validpassword = verifyPassword2(this);
        let confirmedPassword = confirmationPassword2(this);
    });
}
function verifyPassword2(password) {
        if(document.getElementById(password.getAttribute('id')+'Valid')){
        if (password.value.length < 8) {
            document.getElementById(password.getAttribute('id')+'Valid').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins 8 caractères</span>';
        } else if (!/[A-Z]/.test(password.value)) {
            document.getElementById(password.getAttribute('id')+'Valid').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins un caractère en majuscule</span>';
        } else if (!/[0-9]/.test(password.value)) {
            document.getElementById(password.getAttribute('id')+'Valid').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins un chiffre</span>';
        } else if (!/[a-z]/.test(password.value)) {
            document.getElementById(password.getAttribute('id')+'Valid').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins un caractère en minuscule</span>';
        } else {
            document.getElementById(password.getAttribute('id')+'Valid').innerHTML = '';
            passisvalid = true;
            return true;
        }
    }
    return false;
}

function confirmationPassword2(password) {
    if (password.value !== newPassword.value) {
        console.log("KO");
        console.log("type pwd : " + typeof(toString(password)));
        console.log("type new pwd : " + typeof(newPassword));
        document.getElementById('updatePasswordMessage').innerHTML = '<span style="color:red;">Le mot de passe de confirmation est différent</span>';
    } else {
        document.getElementById('updatePasswordMessage').innerHTML = '';
        passConfirmed = true;
        return true;
    }
    return false;
}

$("#updatePasswordButton").on("click", function (e) {
    e.preventDefault();
    // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
    $("#updatePasswordButton").prop('disabled', true)
    console.log($("#updatePasswordButton").is(':disabled'));

    const button = document.getElementById('updatePasswordButton');
    const email = button.dataset.email;

    const inputHidden = document.getElementById('urlEnv');
    const apiUrl = inputHidden.dataset.urlapi;

    console.log('mdp : ' + $("#currentPassword").val());
    console.log('new mdp : ' + $("#newPassword").val());
    console.log('confirmation mdp : ' + $("#newPasswordConfirmation").val());

    console.log('pass is valid : ' + passisvalid);
    console.log('pass is confirmed : ' + passConfirmed);

    if(passisvalid && passConfirmed){
        $.ajax({
            method: "PUT",
            url: apiUrl+"/apictrl/changepassword",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                email: email,
                password: md5($('#currentPassword').val()),
                newpassword: md5($('#newPassword').val()),
                newpasswordconfirmed: md5($('#newPasswordConfirmation').val())
            }),
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            },
        }).done(function(response){
                console.log(response);
                e.preventDefault();
    // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
    $("#updatePasswordButton").prop('disabled', true)
    console.log($("#updatePasswordButton").is(':disabled'));
                if(response.status){
                    document.getElementById('updatePasswordMessage').innerHTML = '<span style="color:green;font-size:2em;">' + response.message +'</span>';
                }
                else{
                    document.getElementById('updatePasswordMessage').innerHTML = '<span style="color:green;font-size:2em;">Mot de passe modifié</span>';
                }
            })
    }

    $("#updatePasswordButton").attr('disabled',false);
    return false;

});