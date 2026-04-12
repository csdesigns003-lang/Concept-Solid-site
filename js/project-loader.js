let currentProject = null


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

currentProject = p


document.getElementById("project-name").innerText = p.name
document.getElementById("project-difficulty").innerText = p.difficulty
document.getElementById("project-time").innerText = p.time
document.getElementById("project-cost").innerText = p.cost
document.getElementById("project-tools").innerText = p.tools
document.getElementById("project-description").innerText = p.description

document.getElementById("project-image").src = p.image


// CREATE BUTTONS
const buttons = document.getElementById("project-buttons")
buttons.innerHTML = ""


// DOWNLOAD BUTTON
if(p.download){

buttons.innerHTML += `
<button onclick="downloadProject()"
class="bg-blue-600 hover:bg-blue-700
text-white text-xl font-semibold
px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition">

⬇ Download Files

</button>
`
}


// EXTERNAL LINK
if(p.external_link){

buttons.innerHTML += `
<a href="${p.external_link}" target="_blank"
class="bg-green-600 hover:bg-green-700
text-white text-xl font-semibold
px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition">

🔗 View Project

</a>
`
}


// VIDEO
if(p.video){

buttons.innerHTML += `
<a href="${p.video}" target="_blank"
class="bg-red-600 hover:bg-red-700
text-white text-xl font-semibold
px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition">

▶ Watch Video

</a>
`
}

}



async function downloadProject(){

if(!currentProject) return

await recordDownload()

window.location.href = currentProject.download

}



async function loadDownloads(){

let {data} = await supabase
.from("project_downloads")
.select("download_count")
.eq("project_slug",projectSlug)
.single()

document.getElementById("downloadCount").innerText =
data.download_count

}

loadDownloads()
