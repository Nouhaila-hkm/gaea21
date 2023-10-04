//
// function check_all(){
//     const check_all = document.getElementById('check_all');
//     const f1 = document.getElementsByClassName('element');
//     console.log(f1)
//
//     for (let i = 0; i< f1.length; i++){
//         if (!f1[i].checked){
//             f1[i].checked = true;
//         }
//     }
//     return  true
// }
//
// $(function (){
//     $("#check_all").toggle(
//         selects(),
//         deSelect()
//     )
// })
function selects() {
    const ele = document.getElementsByName('chk');
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].type === 'checkbox') {
            ele[i].checked = true;
        } else {
            ele[i].checked = false;
        }

    }
}

function deSelect() {
    const ele = document.getElementsByName('chk');
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].type === 'checkbox')
            ele[i].checked = false;

    }
}