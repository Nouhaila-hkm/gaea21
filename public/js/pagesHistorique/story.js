let btn_plus = document.querySelectorAll('.boite .plus');

let btn_moins = document.querySelectorAll('.hidden-content .moins');

let hiddenContent = document.querySelectorAll('.hidden-content');

const displayContent = (e) => {
  const selectedStoryBox = e.currentTarget.getAttribute('data-id');

  hiddenContent.forEach((el) => {
    const wantToDisplayHiddenContent = el.getAttribute('data-id');
    if (selectedStoryBox === wantToDisplayHiddenContent) {
      el.classList.add('display', `p${selectedStoryBox}`);
    }else{
        el.classList.remove('display');
    }
  });
};

const hiddeContent = (e) => {
  hiddenContent.forEach((el) => {
    el.classList.remove('display');
  });
};

btn_plus.forEach((el) => {

  el.addEventListener('click', displayContent);
});

btn_moins.forEach((el) => {
  el.addEventListener('click', hiddeContent);
});
