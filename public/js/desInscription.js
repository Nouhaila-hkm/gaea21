$("#disableAccount").on("click", function (e) {
    console.log("desInscription !");
    e.preventDefault();
    // ON DESACTIVE LE BOUTON POUR QU'UN DEUXIEME CLIC N'AIT AUCUN EFFET
    $("#disableAccount").prop('disabled', true)
    console.log($("#disableAccount").is(':disabled'))

    const button = document.getElementById('disableAccount');
    const gaeaUserId = parseInt(button.dataset.id);
    const disablePass = md5($('#disablePass').val());

    const inputHidden = document.getElementById('urlEnv');
    const apiUrl = inputHidden.dataset.urlapi;

    $.ajax({
        method: "POST",
        url: apiUrl+"/apictrl/disable/" + gaeaUserId,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            password : disablePass,
        }),
        error: function (xhr, status, error) {
            console.log(xhr, status, error);
        },  
    }).done(function (response) {
                console.log("Reponse : ", response);
                
                if(response.statut === 200){
                    document.getElementById('disabledAccountMessage').innerHTML = '<span style="color:green;font-size:2em;">Votre compte est désactivé + modalités de supression.</span>';
                }
                else{
                    document.getElementById('disabledAccountMessage').innerHTML = '<span style="color:red;font-size:2em;">' + response.message + '</span>';
                    $("#disableAccount").prop('disabled', false);
                    console.log($("#disableAccount").is(':disabled'));
                }
        })
                    
});