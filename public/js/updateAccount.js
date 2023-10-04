var emailisvalid = false;

function verifyEmailUpdate (Email) {
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

if(document.getElementById('updateMail')) {
    let emailUpdate = document.getElementById('updateMail');
    emailUpdate.addEventListener('change', function () {
        let validemail = verifyEmailUpdate(this);
        });
};

$("#updateAccountButton").on("click", function (e) {
    e.preventDefault();
    // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
    $("#updateAccountButton").prop('disabled', true) 
    console.log($("#updateAccountButton").is(':disabled'))
    console.log('email type : ' + typeof($("#updateMail").val()));
    console.log('email content : ' + $("#updateMail").val());

    const button = document.getElementById('updateAccountButton');
    const gaeaUserId = parseInt(button.dataset.id);
    console.log("id to update : "+gaeaUserId);

    const inputHidden = document.getElementById('urlEnv');
    const apiUrl = inputHidden.dataset.urlapi;

    if(emailisvalid && $('#updateUsername').val()){
        $.ajax({
            method: "PUT",
            url: apiUrl+"/apictrl/company/change/" + gaeaUserId,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                username: $("#updateUsername").val(),
                email: $('#updateMail').val()
            }),
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
            },
        }).done(function (response) {
            if(response.status === 200){
                console.log("ok");
                let formData = new FormData();

                let objArr = {
                    "gaeaUserId": gaeaUserId,
                    "mail": $('#updateMail').val(),
                    "userName": $("#updateUsername").val(),
                };
                
                formData.append('objArr',JSON.stringify(objArr))

                $.ajax({
                    method: "POST",
                    url: "/profile/update",
                    dataType: "json",
                    processData: false,
                    contentType: false,
                    data: formData,
                    error: function (xhr, status, error) {
                        console.log(xhr, status, error);
                    },  
                }).done(function(response2){
                    document.getElementById('updateAccountMessage').innerHTML = '<span style="color:green;font-size:2em;">'+response.message+'</span>';
                })
            }
            else{
                document.getElementById('updateAccountMessage').innerHTML = '<span style="color:red;font-size:2em;">'+response.message+'</span>';
            }
        })
    }

});