const btn_plus_categorie1 = document.querySelector('.categorie1 .btn-plus')
const btn_moins_categorie1 = document.querySelector('.categorie1 .btn-moins')

const categorie1 = document.querySelector('.categorie1')
const categorie2 = document.querySelector('.categorie2')

const textCategorie1 = document.querySelector('.categorie1 .developper')

const btn_plus_categorie2 = document.querySelector('.categorie2 .btn-plus')
const btn_moins_categotie2 = document.querySelector('.categorie2 .btn-moins')

const troisPetitsPoints = document.querySelector('.categorie2 .troiPetitsPoints')
const text = document.querySelector('.categorie2 .suite')
const textCat2 = document.querySelector('.categorie2 .text-adevelopper')

btn_plus_categorie1.addEventListener("click", () => {

    categorie1.style.height = "unset"
    textCategorie1.style.display='block'
   btn_plus_categorie1.style.display='none'
   btn_moins_categorie1.style.display='inline-block'
})

btn_moins_categorie1.addEventListener("click", () => {
    categorie1.style.height = "21.4583333333vw"
    textCategorie1.style.display='none'
    btn_plus_categorie1.style.display='inline-block'
    btn_moins_categorie1.style.display='none'
 })

 btn_plus_categorie2.addEventListener("click", () => {
    categorie2.style.height = "unset"
    troisPetitsPoints.style.display='none'
    text.style.display='inline'
    textCat2.style.display='flex'
    btn_plus_categorie2.style.display='none'
    btn_moins_categotie2.style.display='inline-block'
 })
 
 btn_moins_categotie2.addEventListener("click", () => {
    categorie2.style.height = "21.4583333333vw"
    troisPetitsPoints.style.display='inline'
    text.style.display='none'
    textCat2.style.display='none'
    btn_plus_categorie2.style.display='inline-block'
    btn_moins_categotie2.style.display='none'
  })