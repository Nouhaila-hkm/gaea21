
    //Vérification de l'email et du mot de passe
    var passisvalid = false;
    var emailisvalid = false;
    var passConfirmed = false;
 
    if(document.querySelector('#mail')) {
        let email = document.querySelector('#mail');
        email.addEventListener('change', function () {
            let validemail = verifyEmail(this);
            console.log("emailValid = "+validemail);
            });
    };

    if(document.querySelector('#mdp')) {
        document.querySelector('#mdp').addEventListener('change', function () {
            console.log("pass existe");
            let validatepassword = verifyPassword(document.querySelector('#mdp'));
            console.log("passValid = "+validatepassword);
            console.log(this.value);
        });
    };

    if(document.querySelector('#mdpConfirmation')) {
        let passConfirmation = document.querySelector('#mdpConfirmation');
        passConfirmation.addEventListener('change', function () {
            let validpassword = verifyPassword(this);
            let confirmedPassword = confirmationPassword(this);
        });
    };

    function verifyEmail (Email) {
        //let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
        let emailRegExp = new RegExp('^([\\S]+)@([\\S]+\\.)([a-zA-Z]{2,4})', 'i');
        console.log(emailRegExp)
        let testEmail = emailRegExp.test(Email.value);
        if (testEmail == false) {
            document.getElementById('validemail').innerHTML = '<span style="color:red;">Veuillez saisir une adresse email valide</span>';
        } else {
            document.getElementById('validemail').innerHTML = '';
            emailisvalid = true;
            return true;
        }
        return false;
    }
  
    function verifyPassword(password) {
        console.log("verify");
        if (password.value.length < 8) {
            document.getElementById('validpassword').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins 8 caractères</span>';
        } else if (!/[A-Z]/.test(password.value)) {
            document.getElementById('validpassword').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins un caractère en majuscule</span>';
        } else if (!/[0-9]/.test(password.value)) {
            document.getElementById('validpassword').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins un chiffre</span>';
        } else if (!/[a-z]/.test(password.value)) {
            document.getElementById('validpassword').innerHTML = '<span style="color:red;">Votre mot de passe doit contenir au moins un caractère en minuscule</span>';
        } else {
            document.getElementById('validpassword').innerHTML = '';
            passisvalid = true;
            return true;
        }
        return false;
    }

    function confirmationPassword(password) {
        if (password.value !== document.querySelector('#mdp').value) {
            console.log("confirmation pass KO");
            console.log("type pwd : " + typeof(toString(password)));
            console.log("type new pwd : " + typeof(pass));
            document.getElementById('validpasswordConfirmation').innerHTML = '<span style="color:red;">Le mot de passe de confirmation est différent</span>';
        } else {
            document.getElementById('validpasswordConfirmation').innerHTML = '';
            passConfirmed = true;
            return true;
        }
        return false;
    }


   // console.log($("#button").is(':disabled'));


    $("#button").on("click", function (e) {
        console.log("alloooooooo");
        e.preventDefault();
        // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
         $("#button").prop('disabled', true) 
        console.log($("#button").is(':disabled'))
        var champsvalid = false;

        const inputHidden = document.getElementById('urlEnv');
        const apiUrl = inputHidden.dataset.urlapi;
        const siteUrl = inputHidden.dataset.urlsite;
        
                if ($("#mdp").val()
                    && $("#mail").val()
                    && $("#mdp").val()
                    && $("#mdpConfirmation").val()
                    && $("#firstNameRegister").val()
                    && $("#lastNameRegister").val()
                    && $("#birthdayRegister").val()
                    && $("#nationalityRegister").val()
                    && $("#adressRegister").val()
                    && $("#cityRegister").val()
                    && $("#zipRegister").val()
                    && $("#countryRegister").val()
                    && $("#username").val()) {
                        champsvalid = true;
                        console.log("Champs valides");
                        console.log(emailisvalid);
                        console.log(passisvalid);
                    }

                if (emailisvalid && passisvalid && champsvalid) {
                    console.log("je fais l'inscription");
                    var password = md5($("#mdp").val());
                    var confirmedpassword = md5($("#mdpConfirmation").val());
                    
                    console.log($("#mail").val());
                    console.log(password);
                    console.log($("#username").val());

                        $.ajax({
                            method: "POST",
                            url: apiUrl+"/apictrl/add/gaeauser",
                            
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify({
                                url: siteUrl,
                                username: $("#username").val(),
                                email: $("#mail").val(),
                                password: password,
                                newpassword: confirmedpassword
                            }),
                            /*beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
                                $('.div-msg-valid img').removeClass('hidden')
                            },*/
                            error: function (xhr, status, error) {
                                console.log(xhr, status, error);
                            },
                        }).done(function (response) {
                            let id = response.id;
                            let code = response.status;
                            let message = response.message;

                            if (id) {

                                let formData = new FormData();

                                    let objArr = {
                                        "gaeaUserId": id,
                                        "userName": $("#username").val(),
                                        "mail": $('#mail').val(),
                                        "firstName": $("#firstNameRegister").val(),
                                        "lastName": $("#lastNameRegister").val(),
                                        "birthDay": $("#birthdayRegister").val(),
                                        "nationality": $("#nationalityRegister").val(),
                                        "adress": $("#adressRegister").val(),
                                        "city": $("#cityRegister").val(),
                                        "zip": $("#zipRegister").val(),
                                        "country": $("#countryRegister").val(), 
                                        "phone": $("#phoneRegister").val() ? $("#phoneRegister").val() : null,
                                        "additionalAdress": $("#additionnalAdressRegister").val() ? $("#additionnalAdressRegister").val() : null,
                                    };

                                    formData.append('objArr',JSON.stringify(objArr))

                                    $.ajax({
                                        method: "POST",
                                        url: "/redirectRegister",
                                        dataType: "json",
                                        processData: false,
                                        contentType: false,
                                        data: formData,
                                        error: function (xhr, status, error) {
                                            console.log(xhr, status, error);
                                        },
                                    }).done(function (response2) {
                                                console.log("données envoyées à manager : ", response2);
                                                document.getElementById('confirmMailSent').innerHTML = '<span style="color:#969749 !important;width: 31em !important;margin-top: 1.5em !important;font-weight: bold !important;">Vous allez recevoir un mail contenant un lien sur votre adresse '+$('#mail').val()+' Vous pourrez vous connecter au site de Gaea21 aprés avoir cliqué sur celui-ci.</span>';
                                        })
                        }
                    })

                            
        }else{
            $("#button").prop('disabled', false)
            document.getElementById('confirmMailSent').innerHTML = '<span style="color:red;font-size:2em;">Veuillez remplir correctement les champs.</span>';
        }
});