const supabase = supabase.createClient(
"https://YOURPROJECT.supabase.co",
"PUBLICKEY"
)

async function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let {data,error} = await supabase.auth.signInWithPassword({
email:email,
password:password
})

if(error){

alert(error.message)

}else{

window.location="dashboard.html"

}

}
