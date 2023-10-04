$("#reinitPasswordLostButton").on("click", function (e) {
    e.preventDefault();
    // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
    $("#reinitPasswordLostButton").prop('disabled', true);

    console.log("click !");

    const button = document.getElementById('reinitPasswordLostButton');
    const tokenNew = button.dataset.token;

    const inputHidden = document.getElementById('urlEnv');
    const apiUrl = inputHidden.dataset.urlapi;

   /*  if(emailisvalid){ */
        $.ajax({
            method: "PUT",
            url: apiUrl+"/apictrl/resetpassword/" + tokenNew,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                password: md5($('#newPasswordLost').val()),
                newpassword: md5($('#newPasswordConfirmationLost').val()),
            }),
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            },
        }).done(function(response){
            document.getElementById('reinitPasswordLostMessage').innerHTML = '<span style="color:green;font-size:2em;">' + response.message +'</span><a href="../../login">Page de connexion</a>';
        })
    /* } */

    $("#reinitPasswordLostButton").prop('disabled', false)
})