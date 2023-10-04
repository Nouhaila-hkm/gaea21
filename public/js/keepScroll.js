window.onbeforeunload = function(){
  sessionStorage.setItem('scrolly', window.scrollY);
};
window.onload = function(){
  console.log(sessionStorage.getItem('scrolly'));
  console.log(window.scrollY);
  console.log(parseInt(sessionStorage.getItem('scrolly')));
  window.scrollTo(0, parseInt(sessionStorage.getItem('scrolly')));
};
