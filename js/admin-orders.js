const supabase = window.supabase.createClient(
"https://YOURPROJECT.supabase.co",
"YOUR_PUBLIC_ANON_KEY"
)

async function loadOrders(){

const { data } = await supabase
.from("orders")
.select("*")
.order("created_at",{ ascending:false })

const table = document.getElementById("orders-table")

table.innerHTML=""

data.forEach(order => {

table.innerHTML += `

<tr class="border-t">

<td class="p-4">
${order.stripe_session_id}
</td>

<td class="p-4">
${order.name}<br>
<span class="text-sm text-gray-500">${order.email}</span>
</td>

<td class="p-4">
$${order.amount_total/100}
</td>

<td class="p-4">
${order.status || "Paid"}
</td>

<td class="p-4 space-x-3">

<button onclick="viewOrder('${order.stripe_session_id}')"
class="text-blue-600">
View
</button>

<a href="${order.shipping_label || '#'}"
target="_blank"
class="text-green-600">
Label
</a>

<button onclick="markShipped('${order.stripe_session_id}')"
class="text-purple-600">
Ship
</button>

</td>

</tr>

`

})

}

function viewOrder(id){

alert("Open order " + id)

}

async function markShipped(id){

await supabase
.from("orders")
.update({ status:"Shipped" })
.eq("stripe_session_id",id)

loadOrders()

}

loadOrders()
