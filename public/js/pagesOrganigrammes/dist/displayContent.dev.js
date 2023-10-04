"use strict";

var display = document.querySelectorAll('.plus'); // const fleche = document.querySelectorAll('.plus svg');

console.log(display);
var angle = 90;
display.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var clickedArrow = e.currentTarget.childNodes[1].querySelector('svg');
    console.log(clickedArrow);
    clickedArrow.classList.toggle('rotate');
    var hiddenContent = clickedArrow.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.hiddenContent');
    console.log(hiddenContent);
    hiddenContent.classList.toggle('hidde');
  });
});