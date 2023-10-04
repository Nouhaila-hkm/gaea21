/* let emailisvalid = false;

var emailPasswordReinit = document.getElementById('emailPasswordReinit');

if(emailPasswordReinit) {
    emailPasswordReinit.addEventListener('change', function () {
        let validemail = verifyEmail(this);
        });
}
const verifyEmail = function (Email) {
    //let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let emailRegExp = new RegExp('^([\\S]+)@([\\S]+\\.)([a-zA-Z]{2,4})', 'i');
    console.log(emailRegExp)
    let testEmail = emailRegExp.test(Email.value);
    if (testEmail == false) {
        document.getElementById('reinitPasswordMessage').innerHTML = '<span style="color:red;">Veuillez saisir une adresse email valide</span>';
    } else {
        document.getElementById('reinitPasswordMessage').innerHTML = '';
        emailisvalid = true;
        return true;
    }
    return false;
} */

$("#reinitPasswordButton").on("click", function (e) {
    e.preventDefault();
    // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
    $("#reinitPasswordButton").prop('disabled', true);

    console.log("click !");

    const inputHidden = document.getElementById('urlEnv');
    const apiUrl = inputHidden.dataset.urlapi;
    const siteUrl = inputHidden.dataset.urlsite;

   /*  if(emailisvalid){ */
        $.ajax({
            method: "POST",
            url: apiUrl+"/apictrl/requestpassword",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                url: siteUrl,
                email: $('#emailPasswordReinit').val()
            }),
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            },
        }).done(function(response){
            document.getElementById('reinitPasswordMessage').innerHTML = '<span style="color:green;font-size:2em;">' + response.message +'</span>';
        })
    /* } */

    $("#reinitPasswordButton").prop('disabled', false)
})