"use strict";

var btn_plus = document.querySelectorAll('.boite .plus');
var btn_moins = document.querySelectorAll('.hidden-content .moins');
var hiddenContent = document.querySelectorAll('.hidden-content');

var displayContent = function displayContent(e) {
  var selectedStoryBox = e.currentTarget.getAttribute('data-id');
  hiddenContent.forEach(function (el) {
    var wantToDisplayHiddenContent = el.getAttribute('data-id');

    if (selectedStoryBox === wantToDisplayHiddenContent) {
      el.classList.add('display', "p".concat(selectedStoryBox));
    } else {
      el.classList.remove('display');
    }
  });
};

var hiddeContent = function hiddeContent(e) {
  hiddenContent.forEach(function (el) {
    el.classList.remove('display');
  });
};

btn_plus.forEach(function (el) {
  el.addEventListener('click', displayContent);
});
btn_moins.forEach(function (el) {
  el.addEventListener('click', hiddeContent);
});