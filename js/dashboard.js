async function loadSensors(){

const response = await fetch(
"https://api.sapemsystems.com/user-sensors"
)

const sensors = await response.json()

let html=""

sensors.forEach(sensor => {

html += `
<tr>

<td>${sensor.name}</td>

<td>${sensor.pressure}</td>

<td>${sensor.battery}V</td>

</tr>
`

})

document.getElementById("sensor-table").innerHTML = html

}

loadSensors()
setInterval(loadSensors,5000)
