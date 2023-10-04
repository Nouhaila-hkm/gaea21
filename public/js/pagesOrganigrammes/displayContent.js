const display = document.querySelectorAll('.plus');
// const fleche = document.querySelectorAll('.plus svg');
 
console.log(display);

const angle = 90;

display.forEach((el) => {
  el.addEventListener('click', (e) => {
    const clickedArrow = e.currentTarget.childNodes[1].querySelector('svg');

    console.log(clickedArrow);

    clickedArrow.classList.toggle('rotate');

    const hiddenContent =
      clickedArrow.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(
        '.hiddenContent'
      );
      console.log(hiddenContent);
    hiddenContent.classList.toggle('hidde');
  });
});
