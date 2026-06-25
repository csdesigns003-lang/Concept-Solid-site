const SUPABASE_URL = "https://odantloiqtucdqoqwjnl.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYW50bG9pcXR1Y2Rxb3F3am5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODc2NjMsImV4cCI6MjA4OTE2MzY2M30._NFnGZ2GlRSPrB37cRn5mVdvCdMe1MuGbI6SPSa44BU"

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Auth actions ──────────────────────────────────────────

async function signup(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({ email, password })
  if (error) { alert(error.message); return null }
  alert("Account created! Check your email to confirm.")
  return data
}

async function login(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })
  if (error) { alert("Login failed: " + error.message); return null }
  window.location.href = "dashboard.html"
}

async function logout() {
  await supabaseClient.auth.signOut()
  window.location.href = "login.html"
}

// ── Session / guard ───────────────────────────────────────

async function getSession() {
  const { data } = await supabaseClient.auth.getSession()
  return data.session
}

async function getUser() {
  const { data } = await supabaseClient.auth.getUser()
  return data.user
}

async function requireAuth() {
  const { data } = await supabaseClient.auth.getSession()
  if (!data.session) {
    window.location.href = "login.html"
    return null
  }
  return data.session
}

// ── Sensor data ───────────────────────────────────────────

async function loadUserSensors() {
  const { data, error } = await supabaseClient
    .from("sensors")
    .select("*")
  if (error) { console.error("Sensor load error:", error); return [] }
  return data
}

async function loadLatestReadings(sensorId) {
  const { data, error } = await supabaseClient
    .from("sensor_readings")
    .select("*")
    .eq("sensor_id", sensorId)
    .order("received_at", { ascending: false })
    .limit(50)
  if (error) { console.error("Reading load error:", error); return [] }
  return data
}

async function sendPasswordReset(email) {
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: "https://yourusername.github.io/pages/reset-password.html"
  })
  if (error) { alert(error.message); return false }
  return true
}

async function updatePassword(newPassword) {
  const { error } = await supabaseClient.auth.updateUser({
    password: newPassword
  })
  if (error) { alert(error.message); return false }
  return true
}
