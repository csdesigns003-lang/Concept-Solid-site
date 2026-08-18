// sapem/js/reviews.js
// Requires supabase-js CDN + js/auth.js (defines `supabaseClient`, `getSession`)
// to be loaded BEFORE this file.
// Call initReviews("<product-id>") once the page knows which product it's
// showing (matches the ids in sapem-products.json / the sku values).
// For pages nested under sapem/products/, pass the relative login path too:
//   initReviews("hub", "../login.html")

let SAPEM_CURRENT_PRODUCT_ID = null;
let SAPEM_LOGIN_PATH = "login.html";

async function initReviews(productId, loginPath = "login.html") {
  SAPEM_CURRENT_PRODUCT_ID = productId;
  SAPEM_LOGIN_PATH = loginPath;
  await renderReviewForm();
  await loadReviews();
}

// Form is always visible/usable. If the visitor is already logged in and has
// reviewed this product before, pre-fill so re-submitting edits their review.
async function renderReviewForm() {
  const session = await getSession();
  if (!session) return;

  const { data: existing } = await supabaseClient
    .from("reviews")
    .select("*")
    .eq("product_id", SAPEM_CURRENT_PRODUCT_ID)
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (existing) {
    document.getElementById("review-rating").value = existing.rating;
    document.getElementById("review-text").value = existing.review_text || "";
  }
}

async function loadReviews() {
  const list = document.getElementById("reviews-list");
  list.innerHTML = `<p class="text-gray-500">Loading reviews...</p>`;

  const { data, error } = await supabaseClient
    .from("reviews")
    .select("*")
    .eq("product_id", SAPEM_CURRENT_PRODUCT_ID)
    .order("created_at", { ascending: false });

  if (error) {
    list.innerHTML = `<p class="text-red-600">Couldn't load reviews.</p>`;
    console.error("loadReviews error:", error);
    return;
  }

  if (!data.length) {
    list.innerHTML = `<p class="text-gray-500">No reviews yet — be the first!</p>`;
    return;
  }

  list.innerHTML = data.map(r => `
    <div class="border-b py-4">
      <div class="text-yellow-500">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      <p class="font-semibold mt-1">${escapeHtml(r.reviewer_name || "SapEM Customer")}</p>
      <p class="text-gray-600 mt-1">${escapeHtml(r.review_text || "")}</p>
      <p class="text-xs text-gray-400 mt-1">${new Date(r.created_at).toLocaleDateString()}</p>
    </div>
  `).join("");
}

// Fill out the form, then this checks/prompts for login at the very end,
// right before the write — the entered rating/text are captured up front
// so nothing is lost if a login prompt has to appear.
async function submitReview() {
  const rating = parseInt(document.getElementById("review-rating").value, 10);
  const reviewText = document.getElementById("review-text").value.trim();

  let session = await getSession();
  if (!session) {
    session = await promptLoginInline();
    if (!session) return; // cancelled or failed — review not lost, still in the form
  }

  const { error } = await supabaseClient
    .from("reviews")
    .upsert({
      product_id: SAPEM_CURRENT_PRODUCT_ID,
      user_id: session.user.id,
      rating,
      review_text: reviewText,
      reviewer_name: session.user.email ? session.user.email.split("@")[0] : "SapEM Customer"
    }, { onConflict: "product_id,user_id" });

  if (error) {
    alert("Couldn't submit review: " + error.message);
    console.error("submitReview error:", error);
    return;
  }

  await loadReviews();
}

// Inline login modal — signs in directly via supabaseClient (NOT auth.js's
// login(), which redirects to dashboardMap.html). Resolves with the session
// on success, or null on cancel.
function promptLoginInline() {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;";
    overlay.innerHTML = `
      <div style="background:white;padding:24px;border-radius:8px;width:90%;max-width:360px;">
        <h3 style="font-weight:bold;font-size:1.125rem;margin-bottom:12px;">Log in to submit your review</h3>
        <input id="review-login-email" type="email" placeholder="Email" style="width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;padding:8px;margin-bottom:8px;">
        <input id="review-login-password" type="password" placeholder="Password" style="width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:4px;padding:8px;margin-bottom:8px;">
        <p id="review-login-error" style="color:#dc2626;font-size:0.875rem;margin-bottom:8px;display:none;"></p>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button id="review-login-cancel" style="padding:8px 16px;border-radius:4px;">Cancel</button>
          <button id="review-login-submit" style="padding:8px 16px;background:#15803d;color:white;border-radius:4px;">Log In</button>
        </div>
        <p style="font-size:0.8rem;margin-top:10px;">No account? <a href="${SAPEM_LOGIN_PATH}" style="color:#15803d;text-decoration:underline;">Sign up here</a></p>
      </div>
    `;
    document.body.appendChild(overlay);

    const close = (result) => {
      document.body.removeChild(overlay);
      resolve(result);
    };

    document.getElementById("review-login-cancel").onclick = () => close(null);

    document.getElementById("review-login-submit").onclick = async () => {
      const email = document.getElementById("review-login-email").value.trim();
      const password = document.getElementById("review-login-password").value;
      const errorEl = document.getElementById("review-login-error");
      errorEl.style.display = "none";

      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) {
        errorEl.textContent = error.message;
        errorEl.style.display = "block";
        return;
      }
      close(data.session);
    };
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
