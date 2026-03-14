async function loadSensors(){

let response = await fetch(
"https://api.conceptsolid.com/sensors"
)

let sensors = await response.json()

let container=document.getElementById("sensorData")

sensors.forEach(s=>{

container.innerHTML += `
<div class="p-6 bg-white shadow mb-4">

<h3>${s.name}</h3>

<p>Pressure: ${s.pressure}</p>

<p>Battery: ${s.battery}</p>

</div>
`

})

}

loadSensors()
