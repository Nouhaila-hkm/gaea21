const btnDiscovery = document.getElementById('btn_discovery');
const modalNewsletter = document.querySelector('.modal-position');
const closeModalNewsletter = document.querySelector('.close');
const overlay=document.getElementById('overlay');


btnDiscovery.addEventListener('click', ()=>{

    modalNewsletter.style.display="block"
    overlay.style.display="block";
})


closeModalNewsletter.addEventListener('click',()=>{
    modalNewsletter.style.display="none"
    overlay.style.display="none";
})