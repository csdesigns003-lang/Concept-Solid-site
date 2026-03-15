const SUPABASE_URL = "https://odantloiqtucdqoqwjnl.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYW50bG9pcXR1Y2Rxb3F3am5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODc2NjMsImV4cCI6MjA4OTE2MzY2M30._NFnGZ2GlRSPrB37cRn5mVdvCdMe1MuGbI6SPSa44BU"

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

async function initDashboard(){
  const session = await requireAuth();
  console.log("Logged in as:", session.user.email);
  loadUserSensors();
}
initDashboard();

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
