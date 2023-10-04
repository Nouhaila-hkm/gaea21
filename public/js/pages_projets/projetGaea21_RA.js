// const boxes = document.querySelectorAll(".box");
// const hover = "_hover.png";
// const extension = ".png"
// let url=""

// boxes.forEach((box) => {
//   box.addEventListener("mouseover", (e) => {
//     console.log(e.target)
//     // console.log(url)
//     if(url==""){
//     url = e.target.children[0].src.slice(0,-4)
//     url = url + hover
//     e.target.children[0].setAttribute("src",url)}
//   });
// // });
//     box.addEventListener("mouseout", (e) => {
//         // console.log(url.slice(-10))
//         if(url.slice(-10)==hover){
//         url = e.target.children[0].src.slice(0,-10)
//         // console.log(url)
//         url = url + extension
//         // console.log(url)
//         e.target.children[0].setAttribute("src",url)}
//         url=""
//     });

//   })

// /*
// 1 - Selectionne toutes les boxes
// 2 - Au "mouseover" d'un element on selectionne l'image à l'interieur et on fait le fill
//     2.1 - modififie l'attribut src de la balise <img>
//         2.1.1 - remplacer le "." par "_hover."
// 3 - Au "mouseout" d'un élément on selectionne l'image à l'interieur et on fait le fill
//     3.1 - modififie l'attribut src de la balise <img>    
//         3.1.1 - remplacer le "_hover." par "."
// */

// /*
// 1 - Ecouter l'evenement sur les double fleches
// 2 - Au click :
//     2.1 - Ajouter une class à la div (ul)
//     2.2 - La class a une translation sur X negative en ease qui se fait sur 0.5s
// */

// const next_el = document.querySelector(".next-arrow");
// const prev_el = document.querySelector(".prev-arrow");
// const last_el = document.querySelector(
//   "#menu-sous-header .sous-nav .menu .item:last-of-type"
// );

// next_el.addEventListener("click", () => {
//   // console.log("hello")
//   document.querySelector(".menu").classList.add("forward");
//   next_el.classList.add("remove");
//   last_el.style.marginLeft = "0px";
//   prev_el.classList.add("display");
// });

// prev_el.addEventListener("click", () => {
//   // console.log("hello")
//   document.querySelector(".menu").classList.add("backward");
//   next_el.classList.add("remove");
//   last_el.style.marginLeft = "0px";
//   prev_el.classList.add("display");
// });
