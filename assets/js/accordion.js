

var acc = document.getElementsByClassName("accordion");

var i;

for (i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        console.log(panel)
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;

        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            

        }
        if(this.classList.contains("one")){
            let item = document.getElementById('icon')
            if (item.innerText == 'arrow_downward') {
                item.innerText = 'arrow_forward'
                document.getElementById("btn1").style.marginLeft = "80%";
                document.getElementById("btn1").style.marginTop = "-50px"
            } else {
                item.innerText = 'arrow_downward'
                document.getElementById("btn1").style.marginLeft = "45%";
                document.getElementById("btn1").style.marginTop = "50px"
            }
        } else if (this.classList.contains("two")){
            let item = document.getElementById('ic2')
            if (item.innerText == 'arrow_downward') {
                item.innerText = 'arrow_forward'
                document.getElementById("btn2").style.marginLeft = "80%";
                document.getElementById("btn2").style.marginTop = "-50px"
            } else {
                item.innerText = 'arrow_downward'
                document.getElementById("btn2").style.marginLeft = "45%";
                document.getElementById("btn2").style.marginTop = "50px"
            }
        } else if (this.classList.contains("three")){
            let item = document.getElementById('ic3')
            if (item.innerText == 'arrow_downward') {
                item.innerText = 'arrow_forward'
                document.getElementById("btn3").style.marginLeft = "80%";
                document.getElementById("btn3").style.marginTop = "-50px"
            } else {
                item.innerText = 'arrow_downward'
                document.getElementById("btn3").style.marginLeft = "45%";
                document.getElementById("btn3").style.marginTop = "50px"
            }
        }

        

        
    });


}