// ═══════════════════════════════════════════════
//  BIG DADDY'S HALAL GRILL v3 — main.js
// ═══════════════════════════════════════════════

// ⚠️ REPLACE WITH YOUR PAYPAL BUSINESS EMAIL
const PAYPAL_EMAIL = "YOUR_PAYPAL_EMAIL@example.com";
// Receipt goes to this email (owner)
const OWNER_EMAIL = "seleven255@gmail.com";

// ── STATE ──────────────────────────────────────
let cart = [];          // [{id, name, price, img, qty, option}]
let currentUser = null; // {name, email, phone}
let itemModal_item = null;
let itemModal_qty = 1;
let itemModal_option = "regular"; // "regular" | "combo"
let verifyCode = "";

// ── NAV ────────────────────────────────────────
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 60));
hamburger.addEventListener("click", () => { hamburger.classList.toggle("open"); mobileMenu.classList.toggle("open"); });
mobileMenu.querySelectorAll(".mob-link").forEach(l => l.addEventListener("click", () => { hamburger.classList.remove("open"); mobileMenu.classList.remove("open"); }));
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const t = document.querySelector(a.getAttribute("href"));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:"smooth", block:"start" }); }
  });
});

// ── MENU RENDER ────────────────────────────────
const menuTabs = document.getElementById("menuTabs");
const menuGrid = document.getElementById("menuGrid");
const menuNote = document.getElementById("menuNote");

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
    menuTabs.appendChild(btn);
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

// ── ITEM DETAIL MODAL ──────────────────────────
const itemModal      = document.getElementById("itemModal");
const itemModalClose = document.getElementById("itemModalClose");
const itemModalImg   = document.getElementById("itemModalImg");
const itemModalTags  = document.getElementById("itemModalTags");
const itemModalName  = document.getElementById("itemModalName");
const itemModalDesc  = document.getElementById("itemModalDesc");
const itemModalOpts  = document.getElementById("itemModalOptions");
const itemQtyMinus   = document.getElementById("itemQtyMinus");
const itemQtyPlus    = document.getElementById("itemQtyPlus");
const itemQtyVal     = document.getElementById("itemQtyVal");
const itemModalAddBtn = document.getElementById("itemModalAddBtn");
const itemModalTotal = document.getElementById("itemModalTotal");

function openItemModal(item) {
  itemModal_item = item;
  itemModal_qty = 1;
  itemModal_option = "regular";

  // Image
  if (item.img) {
    itemModalImg.innerHTML = `<img src="${item.img}" alt="${item.name}" />`;
  } else {
    itemModalImg.innerHTML = `<div class="item-modal-no-img">🍽️</div>`;
  }

  // Tags
  itemModalTags.innerHTML = item.tag ? `<span class="mc-tag">${item.tag}</span>` : "";

  itemModalName.textContent = item.name;
  itemModalDesc.textContent = item.desc;

  // Combo options
  itemModalOpts.innerHTML = "";
  if (item.hasCombo && item.comboPrice) {
    itemModalOpts.innerHTML = `
      <p class="option-label">Choose Size</p>
      <div class="option-btns">
        <button class="option-btn selected" data-opt="regular">Regular — $${item.price.toFixed(2)}</button>
        <button class="option-btn" data-opt="combo">Combo (+Fries & Drink) — $${item.comboPrice.toFixed(2)}</button>
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

function closeItemModal() {
  itemModal.classList.remove("open");
  document.body.style.overflow = "";
}

itemModalAddBtn.addEventListener("click", () => {
  if (!itemModal_item) return;
  const price = itemModal_option === "combo" && itemModal_item.comboPrice
    ? itemModal_item.comboPrice : itemModal_item.price;
  const label = itemModal_option === "combo" ? `${itemModal_item.name} (Combo)` : itemModal_item.name;

  // Check if same item+option already in cart
  const existing = cart.find(c => c.id === itemModal_item.id && c.option === itemModal_option);
  if (existing) {
    existing.qty += itemModal_qty;
  } else {
    cart.push({ id: itemModal_item.id, name: label, price, img: itemModal_item.img, qty: itemModal_qty, option: itemModal_option });
  }

  updateCartCount();
  closeItemModal();
  flashCartBtn();
});

function flashCartBtn() {
  const btn = document.getElementById("btnOpenCart");
  btn.style.background = "var(--red)";
  btn.style.borderColor = "var(--red)";
  setTimeout(() => { btn.style.background = ""; btn.style.borderColor = ""; }, 600);
}

// ── CART DRAWER ────────────────────────────────
const cartOverlay   = document.getElementById("cartOverlay");
const cartDrawer    = document.getElementById("cartDrawer");
const cartClose     = document.getElementById("cartClose");
const cartItemsList = document.getElementById("cartItemsList");
const cartSummary   = document.getElementById("cartSummary");
const btnCheckout   = document.getElementById("btnCheckout");

document.getElementById("btnOpenCart").addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

function openCart() {
  renderCart();
  cartOverlay.classList.add("open");
  cartDrawer.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartOverlay.classList.remove("open");
  cartDrawer.classList.remove("open");
  document.body.style.overflow = "";
}

function renderCart() {
  cartItemsList.innerHTML = "";
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="cart-empty">Your cart is empty. Browse the menu to add items!</p>';
    cartSummary.style.display = "none";
    return;
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
      if (btn.dataset.dir === "plus") {
        cart[idx].qty++;
      } else {
        cart[idx].qty--;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      }
      updateCartCount();
      renderCart();
    });
  });

  const sub = cartSubtotal();
  const tax = sub * 0.13;
  document.getElementById("cartSubtotal").textContent = `$${sub.toFixed(2)}`;
  document.getElementById("cartTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `$${(sub + tax).toFixed(2)}`;
  cartSummary.style.display = "block";
}

function cartSubtotal() { return cart.reduce((s, i) => s + i.price * i.qty, 0); }
function updateCartCount() { document.getElementById("cartCount").textContent = cart.reduce((s, i) => s + i.qty, 0); }

btnCheckout.addEventListener("click", () => {
  closeCart();
  openCheckout();
});

// ── CHECKOUT MODAL ─────────────────────────────
const checkoutModal = document.getElementById("checkoutModal");
const checkoutForm  = document.getElementById("checkoutForm");

document.getElementById("checkoutModalClose").addEventListener("click", () => {
  checkoutModal.classList.remove("open");
  document.body.style.overflow = "";
});

function openCheckout() {
  // Fill summary
  const lines = document.getElementById("checkoutSummaryLines");
  lines.innerHTML = "";
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "co-sum-row";
    row.innerHTML = `<span class="co-sum-name">${item.qty}× ${item.name}</span><span>$${(item.price*item.qty).toFixed(2)}</span>`;
    lines.appendChild(row);
  });

  const sub = cartSubtotal();
  const tax = sub * 0.13;
  const total = sub + tax;
  const tl = document.getElementById("checkoutTotalLine");
  tl.innerHTML = `<span>Total (incl. HST)</span><span>$${total.toFixed(2)}</span>`;

  // Autofill if signed in
  if (currentUser) {
    document.getElementById("coName").value = currentUser.name || "";
    document.getElementById("coPhone").value = currentUser.phone || "";
    document.getElementById("coEmail").value = currentUser.email || "";
  }

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

  const sub   = cartSubtotal();
  const tax   = sub * 0.13;
  const total = sub + tax;

  const orderLines = cart.map(i => `${i.qty}x ${i.name} @ $${i.price.toFixed(2)}`).join("; ");
  const paypalNote = [
    `ORDER: ${name}`,
    `Phone: ${phone} | Email: ${email}`,
    `Pickup: 45 Four Winds Dr Unit C3, North York`,
    `Items: ${orderLines}`,
    `Subtotal: $${sub.toFixed(2)} | HST: $${tax.toFixed(2)} | Total: $${total.toFixed(2)}`,
    notes ? `Notes: ${notes}` : ""
  ].filter(Boolean).join(" | ");

  const params = new URLSearchParams({
    cmd: "_xclick",
    business: PAYPAL_EMAIL,
    item_name: `Big Daddy's Order — ${name}`,
    item_number: `BD-${Date.now()}`,
    amount: total.toFixed(2),
    currency_code: "CAD",
    custom: paypalNote,
    return: window.location.href,
    cancel_return: window.location.href,
  });

  checkoutModal.classList.remove("open");
  document.body.style.overflow = "";

  // Show success, then redirect to PayPal
  const msg = document.getElementById("successMsg");
  msg.textContent = `Thanks ${name}! Your pickup order of $${total.toFixed(2)} CAD is confirmed. You'll be redirected to complete payment now.`;
  document.getElementById("successModal").classList.add("open");

  document.getElementById("successClose").onclick = () => {
    document.getElementById("successModal").classList.remove("open");
    window.open(`https://www.paypal.com/cgi-bin/webscr?${params.toString()}`, "_blank");
    cart = [];
    updateCartCount();
  };
});

// ── AUTH MODAL ─────────────────────────────────
const authModal = document.getElementById("authModal");
const btnAccount = document.getElementById("btnAccount");
const mobBtnAccount = document.getElementById("mobBtnAccount");

function openAuthModal(tab = "signin") {
  authModal.classList.add("open");
  document.body.style.overflow = "hidden";
  switchAuthTab(tab);
}
function closeAuthModal() {
  authModal.classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("authModalClose").addEventListener("click", closeAuthModal);
authModal.addEventListener("click", e => { if (e.target === authModal) closeAuthModal(); });
btnAccount.addEventListener("click", () => {
  if (currentUser) { showUserMenu(); } else { openAuthModal("signin"); }
});
mobBtnAccount.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  hamburger.classList.remove("open");
  if (currentUser) { showUserMenu(); } else { openAuthModal("signin"); }
});

// Auth tabs
document.querySelectorAll(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => switchAuthTab(tab.dataset.tab));
});
function switchAuthTab(id) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === id));
  document.querySelectorAll(".auth-panel").forEach(p => p.classList.toggle("active", p.id === `panel${id.charAt(0).toUpperCase()+id.slice(1)}`));
}

// Google sign-in (simulated — requires Firebase in production)
function handleGoogleAuth() {
  const fakeName  = "Google User";
  const fakeEmail = "user@gmail.com";
  signInUser({ name: fakeName, email: fakeEmail, phone: "" });
  closeAuthModal();
  alert("✅ Signed in with Google!\n\nNote: To enable real Google Sign-In, add Firebase to your project.");
}
document.getElementById("btnGoogleSignin").addEventListener("click", handleGoogleAuth);
document.getElementById("btnGoogleSignup").addEventListener("click", handleGoogleAuth);

// Manual sign in
document.getElementById("btnSignin").addEventListener("click", () => {
  const email = document.getElementById("siEmail").value.trim();
  const pass  = document.getElementById("siPassword").value;
  if (!email || !pass) { alert("Please enter your email and password."); return; }
  const stored = localStorage.getItem("bd_user_" + email);
  if (!stored) { alert("No account found. Please sign up first."); return; }
  const user = JSON.parse(stored);
  if (user.password !== btoa(pass)) { alert("Incorrect password."); return; }
  signInUser(user);
  closeAuthModal();
});

// Phone code logic
let verifyTarget = "";
document.getElementById("btnSendCode").addEventListener("click", () => {
  const phone = document.getElementById("suPhone").value.trim();
  if (!phone || phone.length < 10) { alert("Please enter a valid phone number."); return; }
  verifyTarget = phone;
  verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  document.getElementById("verifyField").style.display = "block";
  document.getElementById("codeHint").textContent = `Demo code: ${verifyCode} (in production, SMS would be sent to ${phone})`;
  document.getElementById("btnSendCode").textContent = "Resend";
  // Focus first digit
  document.querySelectorAll(".code-digit")[0].focus();
});

// Code digit auto-advance
document.querySelectorAll(".code-digit").forEach((input, i, all) => {
  input.addEventListener("input", () => {
    if (input.value && i < all.length - 1) all[i + 1].focus();
  });
  input.addEventListener("keydown", e => {
    if (e.key === "Backspace" && !input.value && i > 0) all[i - 1].focus();
  });
});

// Manual sign up
document.getElementById("btnSignup").addEventListener("click", () => {
  const name  = document.getElementById("suName").value.trim();
  const email = document.getElementById("suEmail").value.trim();
  const phone = document.getElementById("suPhone").value.trim();
  const pass  = document.getElementById("suPassword").value;

  if (!name || !email || !phone || !pass) { alert("Please fill in all fields."); return; }
  if (pass.length < 8) { alert("Password must be at least 8 characters."); return; }

  // Verify code if phone was sent
  if (verifyCode) {
    const entered = [...document.querySelectorAll(".code-digit")].map(d => d.value).join("");
    if (entered !== verifyCode) { alert("Incorrect verification code. Please try again."); return; }
  } else {
    alert("Please verify your phone number first.");
    return;
  }

  const user = { name, email, phone, password: btoa(pass) };
  localStorage.setItem("bd_user_" + email, JSON.stringify(user));
  signInUser(user);
  closeAuthModal();
  alert(`✅ Account created! Welcome, ${name}!`);
});

function signInUser(user) {
  currentUser = user;
  document.getElementById("navAccountLabel").textContent = user.name.split(" ")[0];
  document.getElementById("navAvatar").textContent = user.name.charAt(0).toUpperCase();
  localStorage.setItem("bd_session", JSON.stringify(user));
}

function showUserMenu() {
  if (confirm(`Signed in as ${currentUser.name}\n\nClick OK to sign out.`)) {
    currentUser = null;
    localStorage.removeItem("bd_session");
    document.getElementById("navAccountLabel").textContent = "Sign In";
    document.getElementById("navAvatar").textContent = "👤";
  }
}

// Restore session
const session = localStorage.getItem("bd_session");
if (session) { try { signInUser(JSON.parse(session)); } catch(e) {} }

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
