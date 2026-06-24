const SUPABASE_URL = "https://odantloiqtucdqoqwjnl.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kYW50bG9pcXR1Y2Rxb3F3am5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODc2NjMsImV4cCI6MjA4OTE2MzY2M30._NFnGZ2GlRSPrB37cRn5mVdvCdMe1MuGbI6SPSa44BU"

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Auth actions ──────────────────────────────────────────

async function signup(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) { alert(error.message); return null }
  alert("Account created! Check your email to confirm.")
  return data
}

async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) { alert("Login failed: " + error.message); return null }
  window.location.href = "dashboard.html"
}

async function logout() {
  await supabase.auth.signOut()
  window.location.href = "login.html"
}

// ── Session / guard ───────────────────────────────────────

async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

async function getUser() {
  const { data } = await supabase.auth.getUser()
  return data.user
}

// Call this at the top of dashboard.html — redirects if not logged in
async function requireAuth() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    window.location.href = "login.html"
    return null
  }
  return data.session
}

// ── Sensor data ───────────────────────────────────────────

async function loadUserSensors() {
  const { data, error } = await supabase
    .from("sensors")
    .select("*")
  if (error) { console.error("Sensor load error:", error); return [] }
  return data
}

async function loadLatestReadings(sensorId) {
  const { data, error } = await supabase
    .from("sensor_readings")
    .select("*")
    .eq("sensor_id", sensorId)
    .order("received_at", { ascending: false })
    .limit(50)
  if (error) { console.error("Reading load error:", error); return [] }
  return data
}
