async function loadProjects(dataFile, containerID){

const res = await fetch(dataFile)
const projects = await res.json()

const grid = document.getElementById(containerID)

projects.forEach(p=>{

grid.innerHTML += `

<a href="project.html?id=${p.id}"
class="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">

<img src="${p.image}" class="rounded mb-4">

<h3 class="text-xl font-bold mb-2">
${p.name}
</h3>

<p class="text-gray-600 text-sm">
Difficulty: ${p.difficulty}
</p>

</a>

`

})

}

async function loadProject(id){

const res = await fetch("data/projects.json")
const projects = await res.json()

const p = projects.find(x=>x.id===id)

document.getElementById("project-name").innerText = p.name
document.getElementById("project-difficulty").innerText = p.difficulty
document.getElementById("project-time").innerText = p.time
document.getElementById("project-cost").innerText = p.cost
document.getElementById("project-tools").innerText = p.tools
document.getElementById("project-description").innerText = p.description

document.getElementById("project-image").src = p.image

document.getElementById("download-btn").href = p.zip

}


async function downloadProject(){

await recordDownload()

window.location.href = "files/project-files.zip"

}
