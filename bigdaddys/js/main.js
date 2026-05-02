// ============================================================
//  BIG DADDY'S HALAL GRILL — main.js
// ============================================================

// ⚠️  REPLACE THIS WITH YOUR PAYPAL BUSINESS EMAIL BEFORE GOING LIVE
const PAYPAL_BUSINESS_EMAIL = "YOUR_PAYPAL_EMAIL@example.com";

// ─── CART STATE ────────────────────────────────────────────
let cart = {};

// ─── NAV ───────────────────────────────────────────────────
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll(".mob-link").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
  });
});

// ─── SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ─── MENU TABS ─────────────────────────────────────────────
const menuGrid = document.getElementById("menuGrid");
const menuNote = document.getElementById("menuNote");

function renderMenuTab(cat) {
  const data = MENU[cat];
  menuNote.textContent = data.note;
  menuGrid.innerHTML = "";
  data.items.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.style.animationDelay = `${i * 0.05}s`;
    const displayPrice = item.priceLabel || `$${item.price.toFixed(2)}`;
    card.innerHTML = `
      ${item.img ? `<div class="mc-img"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>` : ""}
      <div class="mc-body">
        <div class="mc-top">
          <div class="mc-info">
            <p class="mc-name">${item.name}${item.tag ? ` <span class="mc-tag">${item.tag}</span>` : ""}</p>
            <p class="mc-desc">${item.desc}</p>
          </div>
          <div class="mc-prices">
            <span class="mc-price">${displayPrice}</span>
          </div>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
    requestAnimationFrame(() => card.classList.add("visible"));
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenuTab(tab.dataset.cat);
  });
});

renderMenuTab("burgers");

// ─── CART BUILDER ──────────────────────────────────────────
const cartItemsEl = document.getElementById("cartItems");

function renderCartTab(cat) {
  const data = MENU[cat];
  cartItemsEl.innerHTML = "";
  data.items.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-row";
    const key = item.name;
    const inCart = cart[key] || { qty: 0 };
    const displayPrice = item.priceLabel || `$${item.price.toFixed(2)}`;

    row.innerHTML = `
      ${item.img ? `<div class="cr-img"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>` : ""}
      <div class="cr-info">
        <p class="cr-name">${item.name}</p>
        <span class="cr-price">${displayPrice}</span>
      </div>
      <div class="cr-controls">
        <button class="qty-btn minus" data-key="${key}" ${inCart.qty === 0 ? "disabled" : ""}>−</button>
        <span class="qty-val" id="qty-${key.replace(/[\s']/g,'_')}">${inCart.qty}</span>
        <button class="qty-btn plus" data-key="${key}" data-price="${item.price}">+</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  cartItemsEl.querySelectorAll(".qty-btn.plus").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if (!cart[key]) cart[key] = { qty: 0, price: parseFloat(btn.dataset.price) };
      cart[key].qty++;
      updateSummary();
      renderCartTab(cat);
    });
  });

  cartItemsEl.querySelectorAll(".qty-btn.minus").forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if (cart[key] && cart[key].qty > 0) {
        cart[key].qty--;
        if (cart[key].qty === 0) delete cart[key];
        updateSummary();
        renderCartTab(cat);
      }
    });
  });
}

document.querySelectorAll(".ctab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".ctab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderCartTab(tab.dataset.ccat);
  });
});

renderCartTab("burgers");

// ─── SUMMARY ───────────────────────────────────────────────
function updateSummary() {
  const summaryItems = document.getElementById("summaryItems");
  const summaryTotal = document.getElementById("summaryTotal");
  const keys = Object.keys(cart).filter(k => cart[k].qty > 0);

  if (keys.length === 0) {
    summaryItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add items on the left!</p>';
    summaryTotal.style.display = "none";
    return;
  }

  let subtotal = 0;
  summaryItems.innerHTML = "";
  keys.forEach(key => {
    const item = cart[key];
    const lineTotal = item.qty * item.price;
    subtotal += lineTotal;
    const row = document.createElement("div");
    row.className = "sum-row";
    row.innerHTML = `
      <span class="sum-name">${item.qty}× ${key}</span>
      <span class="sum-price">$${lineTotal.toFixed(2)}</span>
    `;
    summaryItems.appendChild(row);
  });

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  document.getElementById("subtotalAmt").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("taxAmt").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("totalAmt").textContent = `$${total.toFixed(2)}`;
  summaryTotal.style.display = "block";
}

// ─── CHECKOUT → PAYPAL ─────────────────────────────────────
document.getElementById("checkoutForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail").value.trim();
  const notes = document.getElementById("custNotes").value.trim();

  if (!name || !phone || !email) {
    alert("Please fill in your name, phone and email.");
    return;
  }

  const keys = Object.keys(cart).filter(k => cart[k].qty > 0);
  if (keys.length === 0) {
    alert("Your cart is empty! Please add at least one item.");
    return;
  }

  let orderLines = keys.map(k => `${cart[k].qty}x ${k} @ $${cart[k].price.toFixed(2)}`).join("; ");
  let subtotal = keys.reduce((s, k) => s + cart[k].qty * cart[k].price, 0);
  let tax = subtotal * 0.13;
  let total = subtotal + tax;

  const paypalNote = [
    `ORDER from ${name}`,
    `Phone: ${phone} | Email: ${email}`,
    `Type: Pickup — 45 Four Winds Dr Unit C3, North York`,
    `Items: ${orderLines}`,
    `Subtotal: $${subtotal.toFixed(2)} | HST: $${tax.toFixed(2)} | Total: $${total.toFixed(2)}`,
    notes ? `Notes: ${notes}` : ""
  ].filter(Boolean).join(" | ");

  const paypalBaseURL = `https://www.paypal.com/cgi-bin/webscr`;
  const params = new URLSearchParams({
    cmd: "_xclick",
    business: PAYPAL_BUSINESS_EMAIL,
    item_name: `Big Daddy's Halal Grill Order — ${name}`,
    item_number: `BD-${Date.now()}`,
    amount: total.toFixed(2),
    currency_code: "CAD",
    custom: paypalNote,
    return: window.location.href + "#order",
    cancel_return: window.location.href + "#order",
  });

  document.getElementById("modalMsg").textContent =
    `Thanks ${name}! Your pickup order (${keys.length} item${keys.length > 1 ? "s" : ""}) totalling $${total.toFixed(2)} CAD is ready. You'll now be redirected to PayPal to complete payment.`;

  document.getElementById("modalOverlay").classList.add("open");

  document.getElementById("modalClose").onclick = () => {
    document.getElementById("modalOverlay").classList.remove("open");
    window.open(`${paypalBaseURL}?${params.toString()}`, "_blank");
    cart = {};
    updateSummary();
    renderCartTab(document.querySelector(".ctab.active").dataset.ccat);
    document.getElementById("checkoutForm").reset();
  };
});

// ─── SCROLL REVEAL ─────────────────────────────────────────
const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("revealed"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ─── ACTIVE NAV ────────────────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove("active"));
      const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (link) link.classList.add("active");
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));
