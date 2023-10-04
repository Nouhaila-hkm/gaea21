// PARTIE CARROUSEL 
const containerElement = document.getElementById("container");
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("g");
const nextButton = document.getElementById("d");
const linkNext = document.getElementById("lien_suivant");
const linkPrev = document.getElementById("lien_avant");
const pathName= window.location.pathname;

console.log(prevButton.getAttribute("id"))
// PARTIE FIL DE SUIVI 

const progress = document.getElementById("progression");
const circles = document.querySelectorAll(".circle");

let currentActive= 1;

// PARTIE CARROUSEL

nextButton.addEventListener("click", (event) => {
    currentActive++;

    if(currentActive>circles.length){
        if(pathName==="/coaching/projet/pendant"|| pathName==="/coaching/projet/pendant#projetPendant"){
            currentActive=circles.length
            linkNext.href="/coaching/projet/apres#projetApres";
        }
        else{
            currentActive=circles.length
            linkNext.href="/coaching/humain/apres#humainApres";
        }
        
    }

    update();

    const slideWidth = slide.clientWidth;
    containerElement.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
    currentActive--;

    if(currentActive<1){
        if(pathName==="/coaching/projet/pendant" || pathName==="/coaching/projet/pendant#projetPendant"){
            currentActive=1
            linkPrev.href="/coaching/projet/avant#projetAvant";
        }
        else{
            currentActive=1
            linkPrev.href="/coaching/humain/avant#humainAvant";
        }
        
    }

    update();

    const slideWidth = slide.clientWidth;
    containerElement.scrollLeft -= slideWidth;
});


function update(){
    circles.forEach((circle,index)=>{
        if(index < currentActive){
            circle.classList.add('active')
        }
        else{
            circle.classList.remove('active')
        }
    })

    const actives= document.querySelectorAll('.active');

    progress.style.width=(actives.length -1 ) / (circles.length - 1)*100 +'%'

    if (currentActive===1){
        nextButton.disabled=false;
    }
    else if (currentActive===circles.length) {

        prevButton.disabled=false;
    }
    else{
        prevButton.disabled=false;
        nextButton.disabled=false;
    }
}
