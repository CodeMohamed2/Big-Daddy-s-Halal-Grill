// ═══════════════════════════════════════════════
//  BIG DADDY'S HALAL GRILL v3 — main.js
// ═══════════════════════════════════════════════

// ⚠️ REPLACE WITH YOUR PAYPAL BUSINESS EMAIL
const PAYPAL_EMAIL = "YOUR_PAYPAL_EMAIL@example.com";
const OWNER_EMAIL  = "seleven255@gmail.com";

// ── STATE ──────────────────────────────────────
let cart            = [];
let currentUser     = null;
let itemModal_item  = null;
let itemModal_qty   = 1;
let itemModal_option = "regular";
let verifyCode      = "";
let selectedPrepTime = "Now";

// ── WAIT FOR FIREBASE ──────────────────────────
// Firebase is loaded as an ES module in index.html.
// We wait for it to be ready before wiring up Google buttons.
function waitForFirebase(cb) {
  if (window._firebaseSignIn) { cb(); }
  else { setTimeout(() => waitForFirebase(cb), 100); }
}

// ── NAV ────────────────────────────────────────
const navbar    = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu= document.getElementById("mobileMenu");

window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 60));
hamburger.addEventListener("click", () => { hamburger.classList.toggle("open"); mobileMenu.classList.toggle("open"); });
mobileMenu.querySelectorAll(".mob-link").forEach(l => l.addEventListener("click", () => {
  hamburger.classList.remove("open"); mobileMenu.classList.remove("open");
}));
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:"smooth", block:"start" }); }
  });
});

// ── MENU RENDER ────────────────────────────────
const menuTabsEl = document.getElementById("menuTabs");
const menuGrid   = document.getElementById("menuGrid");
const menuNote   = document.getElementById("menuNote");

function buildMenuTabs() {
  MENU_CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === 0 ? " active" : "");
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      renderMenuCat(cat.id);
    });
    menuTabsEl.appendChild(btn);
  });
}

function renderMenuCat(catId) {
  const data = MENU[catId];
  menuNote.textContent = data.note;
  menuGrid.innerHTML = "";
  data.items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "menu-card" + (!item.img ? " no-img" : "");
    card.style.transitionDelay = `${i * 0.04}s`;
    const imgHTML = item.img
      ? `<div class="mc-img-wrap"><img src="${item.img}" alt="${item.name}" loading="lazy"/></div>`
      : `<div class="mc-no-img">🍽️</div>`;
    const tagHTML = item.tag ? `<div class="mc-tag">${item.tag}</div>` : "";
    card.innerHTML = `
      ${imgHTML}
      <div class="mc-body">
        ${tagHTML}
        <div class="mc-top-row">
          <p class="mc-name">${item.name}</p>
          <span class="mc-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="mc-desc">${item.desc}</p>
        <p class="mc-add-hint">Tap to add →</p>
      </div>`;
    card.addEventListener("click", () => openItemModal(item));
    menuGrid.appendChild(card);
    requestAnimationFrame(() => card.classList.add("visible"));
  });
}

buildMenuTabs();
renderMenuCat("burgers");

// ── ITEM MODAL ─────────────────────────────────
const itemModal       = document.getElementById("itemModal");
const itemModalClose  = document.getElementById("itemModalClose");
const itemModalImg    = document.getElementById("itemModalImg");
const itemModalTags   = document.getElementById("itemModalTags");
const itemModalName   = document.getElementById("itemModalName");
const itemModalDesc   = document.getElementById("itemModalDesc");
const itemModalOpts   = document.getElementById("itemModalOptions");
const itemQtyMinus    = document.getElementById("itemQtyMinus");
const itemQtyPlus     = document.getElementById("itemQtyPlus");
const itemQtyVal      = document.getElementById("itemQtyVal");
const itemModalAddBtn = document.getElementById("itemModalAddBtn");
const itemModalTotal  = document.getElementById("itemModalTotal");

function openItemModal(item) {
  itemModal_item   = item;
  itemModal_qty    = 1;
  itemModal_option = "regular";
  itemModalImg.innerHTML = item.img
    ? `<img src="${item.img}" alt="${item.name}"/>`
    : `<div class="item-modal-no-img">🍽️</div>`;
  itemModalTags.innerHTML = item.tag ? `<span class="mc-tag">${item.tag}</span>` : "";
  itemModalName.textContent = item.name;
  itemModalDesc.textContent = item.desc;
  itemModalOpts.innerHTML = "";
  if (item.hasCombo && item.comboPrice) {
    itemModalOpts.innerHTML = `
      <p class="option-label">Choose Size</p>
      <div class="option-btns">
        <button class="option-btn selected" data-opt="regular">Regular — $${item.price.toFixed(2)}</button>
        <button class="option-btn" data-opt="combo">Combo (+ Fries & Drink) — $${item.comboPrice.toFixed(2)}</button>
      </div>`;
    itemModalOpts.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        itemModalOpts.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        itemModal_option = btn.dataset.opt;
        updateItemModalTotal();
      });
    });
  }
  updateItemModalTotal();
  itemQtyVal.textContent = itemModal_qty;
  itemModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function updateItemModalTotal() {
  if (!itemModal_item) return;
  const price = itemModal_option === "combo" && itemModal_item.comboPrice
    ? itemModal_item.comboPrice : itemModal_item.price;
  itemModalTotal.textContent = `$${(price * itemModal_qty).toFixed(2)}`;
}

itemQtyMinus.addEventListener("click", () => { if (itemModal_qty > 1) { itemModal_qty--; itemQtyVal.textContent = itemModal_qty; updateItemModalTotal(); } });
itemQtyPlus.addEventListener("click",  () => { itemModal_qty++; itemQtyVal.textContent = itemModal_qty; updateItemModalTotal(); });
itemModalClose.addEventListener("click", closeItemModal);
itemModal.addEventListener("click", e => { if (e.target === itemModal) closeItemModal(); });
function closeItemModal() { itemModal.classList.remove("open"); document.body.style.overflow = ""; }

itemModalAddBtn.addEventListener("click", () => {
  if (!itemModal_item) return;
  const price = itemModal_option === "combo" && itemModal_item.comboPrice
    ? itemModal_item.comboPrice : itemModal_item.price;
  const label = itemModal_option === "combo" ? `${itemModal_item.name} (Combo)` : itemModal_item.name;
  const existing = cart.find(c => c.id === itemModal_item.id && c.option === itemModal_option);
  if (existing) { existing.qty += itemModal_qty; }
  else { cart.push({ id: itemModal_item.id, name: label, price, img: itemModal_item.img, qty: itemModal_qty, option: itemModal_option }); }
  updateCartCount();
  closeItemModal();
  flashCartBtn();
});

function flashCartBtn() {
  const btn = document.getElementById("btnOpenCart");
  btn.style.background = "var(--red)"; btn.style.borderColor = "var(--red)";
  setTimeout(() => { btn.style.background = ""; btn.style.borderColor = ""; }, 600);
}

// ── CART DRAWER ────────────────────────────────
const cartOverlay   = document.getElementById("cartOverlay");
const cartDrawer    = document.getElementById("cartDrawer");
const cartItemsList = document.getElementById("cartItemsList");
const cartSummary   = document.getElementById("cartSummary");
const btnCheckout   = document.getElementById("btnCheckout");

document.getElementById("btnOpenCart").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function openCart()  { renderCart(); cartOverlay.classList.add("open"); cartDrawer.classList.add("open"); document.body.style.overflow = "hidden"; }
function closeCart() { cartOverlay.classList.remove("open"); cartDrawer.classList.remove("open"); document.body.style.overflow = ""; }

function renderCart() {
  cartItemsList.innerHTML = "";
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="cart-empty">Your cart is empty. Browse the menu to add items!</p>';
    cartSummary.style.display = "none"; return;
  }
  cart.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "cart-item-row";
    const imgHTML = item.img
      ? `<div class="cart-item-img"><img src="${item.img}" alt="${item.name}" loading="lazy"/></div>`
      : `<div class="cart-item-no-img">🍽️</div>`;
    row.innerHTML = `
      ${imgHTML}
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-sub">$${item.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item-controls">
        <button class="ci-qty-btn" data-idx="${idx}" data-dir="minus">−</button>
        <span class="ci-qty">${item.qty}</span>
        <button class="ci-qty-btn" data-idx="${idx}" data-dir="plus">+</button>
        <span class="ci-price">$${(item.price * item.qty).toFixed(2)}</span>
      </div>`;
    cartItemsList.appendChild(row);
  });
  cartItemsList.querySelectorAll(".ci-qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.idx);
      if (btn.dataset.dir === "plus") { cart[idx].qty++; }
      else { cart[idx].qty--; if (cart[idx].qty <= 0) cart.splice(idx, 1); }
      updateCartCount(); renderCart();
    });
  });
  const sub = cartSubtotal(), tax = sub * 0.13;
  document.getElementById("cartSubtotal").textContent = `$${sub.toFixed(2)}`;
  document.getElementById("cartTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `$${(sub + tax).toFixed(2)}`;
  cartSummary.style.display = "block";
}

function cartSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function updateCartCount() { document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0); }

btnCheckout.addEventListener("click", () => { closeCart(); openCheckout(); });

// ── PREP TIME SELECTOR ─────────────────────────
document.querySelectorAll(".prep-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".prep-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedPrepTime = btn.dataset.prep;
  });
});

// ── CHECKOUT MODAL ─────────────────────────────
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm  = document.getElementById("checkoutForm");

document.getElementById("checkoutModalClose").addEventListener("click", () => {
  checkoutModal.classList.remove("open"); document.body.style.overflow = "";
});
checkoutModal.addEventListener("click", e => { if (e.target === checkoutModal) { checkoutModal.classList.remove("open"); document.body.style.overflow = ""; } });

function openCheckout() {
  const lines = document.getElementById("checkoutSummaryLines");
  lines.innerHTML = "";
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "co-sum-row";
    row.innerHTML = `<span class="co-sum-name">${item.qty}× ${item.name}</span><span>$${(item.price*item.qty).toFixed(2)}</span>`;
    lines.appendChild(row);
  });
  const sub = cartSubtotal(), tax = sub * 0.13, total = sub + tax;
  document.getElementById("checkoutTotalLine").innerHTML = `<span>Total (incl. HST)</span><span>$${total.toFixed(2)}</span>`;
  if (currentUser) {
    document.getElementById("coName").value  = currentUser.name  || "";
    document.getElementById("coPhone").value = currentUser.phone || "";
    document.getElementById("coEmail").value = currentUser.email || "";
  }
  // Reset prep time to Now
  selectedPrepTime = "Now";
  document.querySelectorAll(".prep-btn").forEach(b => b.classList.toggle("active", b.dataset.prep === "Now"));
  checkoutModal.classList.add("open");
  document.body.style.overflow = "hidden";
}

checkoutForm.addEventListener("submit", e => {
  e.preventDefault();
  const name  = document.getElementById("coName").value.trim();
  const phone = document.getElementById("coPhone").value.trim();
  const email = document.getElementById("coEmail").value.trim();
  const notes = document.getElementById("coNotes").value.trim();
  if (!name || !phone || !email) { alert("Please fill in your name, phone and email."); return; }
  const sub = cartSubtotal(), tax = sub * 0.13, total = sub + tax;
  const orderLines = cart.map(i => `${i.qty}x ${i.name} @ $${i.price.toFixed(2)}`).join("; ");
  const paypalNote = [
    `ORDER: ${name}`,
    `Phone: ${phone} | Email: ${email}`,
    `Prep: ${selectedPrepTime}`,
    `Pickup: 45 Four Winds Dr Unit C3, North York`,
    `Items: ${orderLines}`,
    `Subtotal: $${sub.toFixed(2)} | HST: $${tax.toFixed(2)} | Total: $${total.toFixed(2)}`,
    notes ? `Notes: ${notes}` : ""
  ].filter(Boolean).join(" | ");

  const params = new URLSearchParams({
    cmd: "_xclick", business: PAYPAL_EMAIL,
    item_name: `Big Daddy's Order — ${name}`,
    item_number: `BD-${Date.now()}`,
    amount: total.toFixed(2), currency_code: "CAD",
    custom: paypalNote,
    return: window.location.href, cancel_return: window.location.href,
  });

  checkoutModal.classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("successMsg").textContent =
    `Thanks ${name}! Your pickup order of $${total.toFixed(2)} CAD is confirmed. Prep starts: ${selectedPrepTime}. You'll be redirected to complete payment now.`;
  document.getElementById("successModal").classList.add("open");
  document.getElementById("successClose").onclick = () => {
    document.getElementById("successModal").classList.remove("open");
    window.open(`https://www.paypal.com/cgi-bin/webscr?${params.toString()}`, "_blank");
    cart = []; updateCartCount();
    checkoutForm.reset();
  };
});

// ── AUTH MODAL ─────────────────────────────────
const authModal  = document.getElementById("authModal");
const btnAccount = document.getElementById("btnAccount");

function openAuthModal(tab = "signin") {
  authModal.classList.add("open"); document.body.style.overflow = "hidden"; switchAuthTab(tab);
}
function closeAuthModal() { authModal.classList.remove("open"); document.body.style.overflow = ""; }

document.getElementById("authModalClose").addEventListener("click", closeAuthModal);
authModal.addEventListener("click", e => { if (e.target === authModal) closeAuthModal(); });
btnAccount.addEventListener("click", () => { if (currentUser) showUserMenu(); else openAuthModal("signin"); });
document.getElementById("mobBtnAccount").addEventListener("click", () => {
  mobileMenu.classList.remove("open"); hamburger.classList.remove("open");
  if (currentUser) showUserMenu(); else openAuthModal("signin");
});

document.querySelectorAll(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => switchAuthTab(tab.dataset.tab));
});
function switchAuthTab(id) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === id));
  document.getElementById("panelSignin").classList.toggle("active", id === "signin");
  document.getElementById("panelSignup").classList.toggle("active", id === "signup");
}

// ── REAL GOOGLE SIGN-IN (Firebase) ────────────
waitForFirebase(() => {
  // Listen for auth state changes (handles page reload too)
  window._onAuthChanged(user => {
    if (user) {
      signInUser({
        name:  user.displayName || user.email.split("@")[0],
        email: user.email,
        phone: user.phoneNumber || "",
        photo: user.photoURL || null
      });
    }
  });

  document.getElementById("btnGoogleSignin").addEventListener("click", async () => {
    try {
      const result = await window._firebaseSignIn();
      const user = result.user;
      signInUser({ name: user.displayName, email: user.email, phone: user.phoneNumber || "", photo: user.photoURL });
      closeAuthModal();
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        alert("Google sign-in failed: " + err.message);
      }
    }
  });

  document.getElementById("btnGoogleSignup").addEventListener("click", async () => {
    try {
      const result = await window._firebaseSignIn();
      const user = result.user;
      signInUser({ name: user.displayName, email: user.email, phone: user.phoneNumber || "", photo: user.photoURL });
      closeAuthModal();
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        alert("Google sign-up failed: " + err.message);
      }
    }
  });
});

// ── MANUAL EMAIL SIGN IN ───────────────────────
document.getElementById("btnSignin").addEventListener("click", () => {
  const email = document.getElementById("siEmail").value.trim();
  const pass  = document.getElementById("siPassword").value;
  if (!email || !pass) { alert("Please enter your email and password."); return; }
  const stored = localStorage.getItem("bd_user_" + email);
  if (!stored) { alert("No account found with that email. Please sign up first."); return; }
  const user = JSON.parse(stored);
  if (user.password !== btoa(pass)) { alert("Incorrect password. Please try again."); return; }
  signInUser(user); closeAuthModal();
});

// ── PHONE VERIFICATION ─────────────────────────
document.getElementById("btnSendCode").addEventListener("click", () => {
  const phone = document.getElementById("suPhone").value.trim();
  if (!phone || phone.replace(/\D/g,"").length < 10) { alert("Please enter a valid phone number."); return; }
  verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  document.getElementById("verifyField").style.display = "block";
  document.getElementById("codeHint").textContent = `Demo code: ${verifyCode} (in production this would SMS to ${phone})`;
  document.getElementById("btnSendCode").textContent = "Resend";
  document.querySelectorAll(".code-digit")[0].focus();
});

document.querySelectorAll(".code-digit").forEach((input, i, all) => {
  input.addEventListener("input", () => { if (input.value && i < all.length - 1) all[i + 1].focus(); });
  input.addEventListener("keydown", e => { if (e.key === "Backspace" && !input.value && i > 0) all[i - 1].focus(); });
});

// ── MANUAL SIGN UP ─────────────────────────────
document.getElementById("btnSignup").addEventListener("click", () => {
  const name  = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const phone = document.getElementById("suPhone").value.trim();
  const pass  = document.getElementById("suPassword").value;
  if (!name || !email || !phone || !pass) { alert("Please fill in all fields."); return; }
  if (pass.length < 8) { alert("Password must be at least 8 characters."); return; }
  if (!verifyCode) { alert("Please verify your phone number first."); return; }
  const entered = [...document.querySelectorAll(".code-digit")].map(d => d.value).join("");
  if (entered !== verifyCode) { alert("Incorrect verification code. Please try again."); return; }
  const user = { name, email, phone, password: btoa(pass) };
  localStorage.setItem("bd_user_" + email, JSON.stringify(user));
  signInUser(user); closeAuthModal();
  alert(`✅ Account created! Welcome, ${name}!`);
});

// ── USER STATE HELPERS ─────────────────────────
function signInUser(user) {
  currentUser = user;
  const first = (user.name || "").split(" ")[0] || "Account";
  document.getElementById("navAccountLabel").textContent = first;
  if (user.photo) {
    document.getElementById("navAvatar").innerHTML = `<img src="${user.photo}" style="width:22px;height:22px;border-radius:50%;object-fit:cover"/>`;
  } else {
    document.getElementById("navAvatar").textContent = first.charAt(0).toUpperCase();
  }
}

function showUserMenu() {
  if (confirm(`Signed in as ${currentUser.name}\n\nClick OK to sign out.`)) {
    currentUser = null;
    document.getElementById("navAccountLabel").textContent = "Sign In";
    document.getElementById("navAvatar").textContent = "👤";
    if (window._firebaseSignOut) window._firebaseSignOut();
  }
}

// ── SCROLL REVEAL ──────────────────────────────
const revealEls = document.querySelectorAll(".reveal-up,.reveal-left,.reveal-right");
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); revealObs.unobserve(e.target); } });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

// ── ACTIVE NAV ─────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a");
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      const l = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (l) l.classList.add("active");
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));
