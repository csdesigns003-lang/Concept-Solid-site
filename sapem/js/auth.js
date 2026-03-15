const SUPABASE_URL = "YOUR_SUPABASE_URL"
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY"

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

async function signup(email,password){

const { data, error } = await supabase.auth.signUp({
email:email,
password:password
})

if(error){
alert(error.message)
return
}

alert("Account created. Check email confirmation.")
}

async function login(email,password){

const { data, error } = await supabase.auth.signInWithPassword({
email:email,
password:password
})

if(error){
alert("Login failed")
return
}

window.location.href="dashboard.html"

}

async function requireAuth(){

const { data } = await supabase.auth.getSession()

if(!data.session){
window.location.href="login.html"
}

return data.session

}

async function logout(){

await supabase.auth.signOut()

window.location.href="login.html"

}
