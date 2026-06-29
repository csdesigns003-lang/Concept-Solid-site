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
    redirectTo: "https://concept-solid.com/sapem/reset-password.html"
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

async function claimHub(hubHardwareId, hubName) {
  // First try the claim function (for unclaimed hubs)
  const { data, error } = await supabaseClient
    .rpc("claim_hub", { p_hardware_id: hubHardwareId.trim() })

  let hubId = null

  if (error) {
    // If claim failed, check if this hub is already claimed by THIS user
    const { data: existing } = await supabaseClient
      .from("hubs")
      .select("*")
      .eq("hub_hardware_id", hubHardwareId.trim())
      .single()

    if (existing) {
      // Already claimed by this user — just return it
      hubId = existing.id
    } else {
      // Genuinely not found or claimed by someone else
      alert("Hub serial number not found. Make sure the hub is powered on and connected to the internet, then try again.")
      return null
    }
  } else {
    hubId = data
  }

  // Fetch the full hub row
  const { data: hub, error: fetchError } = await supabaseClient
    .from("hubs")
    .select("*")
    .eq("id", hubId)
    .single()

  if (fetchError || !hub) {
    alert("Hub claimed but failed to load details.")
    return null
  }

  // Save user-provided name if entered
  if (hubName && hubName.trim()) {
    await supabaseClient
      .from("hubs")
      .update({ hub_name: hubName.trim() })
      .eq("id", hub.id)
    hub.hub_name = hubName.trim()
  }

  return hub
}
