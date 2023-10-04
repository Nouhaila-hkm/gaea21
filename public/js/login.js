$("#buttonLog").on("click", function (e) {
    $("#buttonLog").attr('disabled',true);
    e.preventDefault();
    console.log($("#buttonLog").is(':disabled'));

    const inputHidden = document.getElementById('urlEnv');
    const apiUrl = inputHidden.dataset.urlapi;

    if ($("#passwordLog").val() && $("#mailLog").val() ) {
        console.log("champs valides");
        var password = md5($("#passwordLog").val());

        $.ajax({
            method: "POST",
            url: apiUrl+"/apictrl/login",
            dataType :"json",
            contentType:"application/json",
            data: JSON.stringify({
                email : $("#mailLog").val(),
                password : password,
            }),
            error: function (xhr, status, error) {
                console.log(xhr, status, error);
                //document.getElementById('errorLogin').innerHTML = '<span style="color:red;">Une erreur est survenue. Veillez à saisir des informations conformes à votre compte ou essayez ultérieurement.</span>';
            },
        }).done(function(response) {
            console.log(response)
            let {id, username, email, message} = response;
            if (id) {
                console.log("redirection");
                e.preventDefault();
                console.log($("#buttonLog").is(':disabled'));
                $.redirect('/redirectLogin', {id,email,username});
                //document.location.href = "http://127.0.0.1:8001/redirectLogin";
            } else {
                $("#buttonLog").attr('disabled',false);
                document.getElementById('errorLogin').innerHTML = `<p>${response.message}</p>`;
            }
        });
    }
    else
        console.log("champs non valides");
})