async function loadComponent(id, file){

const response = await fetch(file)
const html = await response.text()

document.getElementById(id).innerHTML = html

}

document.addEventListener("DOMContentLoaded", () => {

if(document.getElementById("concept-header"))
loadComponent("concept-header","/components/concept-header.html")

if(document.getElementById("concept-footer"))
loadComponent("concept-footer","/components/concept-footer.html")

if(document.getElementById("sapem-header"))
loadComponent("sapem-header","/components/sapem-header.html")

if(document.getElementById("sapem-footer"))
loadComponent("sapem-footer","/components/sapem-footer.html")

})
