// ============================================================
// DATABASE MENU COFFEE SHOP
// ============================================================
const menuDatabase = [
    {
        id: 1,
        name: "Kopi Susu Gula Aren",
        category: "coffee",
        price: 22000,
        badge: "Best Seller",
        description: "Espresso robusta blend, susu segar creamy, dan gula aren organik khas nusantara.",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Caramel Macchiato",
        category: "coffee",
        price: 28000,
        badge: "Recommended",
        description: "Espresso bold berpadu susu steamed lembut dengan drizzle caramel manis gurih.",
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Vanilla Cold Brew",
        category: "coldbrew",
        price: 26000,
        badge: "Favorit",
        description: "Kopi seduh dingin selama 16 jam dengan sentuhan aroma vanila madu yang menyegarkan.",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Americano on the Rocks",
        category: "coldbrew",
        price: 20000,
        badge: "Classic",
        description: "Double shot espresso arabica murni disajikan dengan es batu kristal segar.",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Espresso Single Origin",
        category: "coffee",
        price: 18000,
        badge: "Pure",
        description: "Ekstrak kopi pekat dari biji arabica pilihan dengan crema tebal dan aroma semerbak.",
        image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Matcha Latte Kyoto",
        category: "non-coffee",
        price: 25000,
        badge: "Popular",
        description: "Bubuk matcha asli Jepang dengan susu creamy dan sedikit rasa manis alami.",
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Red Velvet Choco Cream",
        category: "non-coffee",
        price: 24000,
        badge: "Sweet",
        description: "Perpaduan rasa red velvet yang manis legit dengan taburan cokelat Belgia.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Almond Butter Croissant",
        category: "food",
        price: 23000,
        badge: "Fresh Baked",
        description: "Pastry renyah berlapis dengan mentega Prancis dan taburan kacang almond sangrai.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Truffle Cheese French Fries",
        category: "food",
        price: 22000,
        badge: "Snack",
        description: "Kentang goreng gurih renyah dengan aroma minyak truffle dan parutan keju parmesan.",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Toast Cokelat Keju Melt",
        category: "food",
        price: 19000,
        badge: "Crispy",
        description: "Roti panggang tebal dengan lelehan cokelat premium dan keju cheddar melimpah.",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80"
    }
];

// ============================================================
// STATE APLIKASI
// ============================================================
let cart = [];
let activeCategory = "all";
let searchQuery = "";
let discountPercent = 0;
let appliedPromoCode = "";

// ============================================================
// ELEMEN DOM
// ============================================================
const menuGrid = document.getElementById("menu-grid");
const menuCounter = document.getElementById("menu-counter");
const categoryTabs = document.getElementById("category-tabs");
const searchInput = document.getElementById("search-input");
const tableNumberInput = document.getElementById("table-number-input");
const orderTable = document.getElementById("order-table");
const orderName = document.getElementById("order-name");
const orderNotes = document.getElementById("order-notes");
const navTableDisplay = document.getElementById("nav-table-display");

// Drawer & Cart Elemen
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartCount = document.getElementById("cart-count");
const drawerItemCount = document.getElementById("drawer-item-count");
const cartItemsContainer = document.getElementById("cart-items-container");

// Kalkulator Elemen
const calcSubtotal = document.getElementById("calc-subtotal");
const calcTax = document.getElementById("calc-tax");
const calcDiscount = document.getElementById("calc-discount");
const calcGrandTotal = document.getElementById("calc-grand-total");
const btnTotalDisplay = document.getElementById("btn-total-display");
const discountRow = document.getElementById("discount-row");
const discountPercentText = document.getElementById("discount-percent");
const promoCodeInput = document.getElementById("promo-code-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const promoMsg = document.getElementById("promo-msg");
const checkoutBtn = document.getElementById("checkout-btn");

// Mobile Floating Cart
const mobileCartBar = document.getElementById("mobile-cart-bar");
const mobileCartCount = document.getElementById("mobile-cart-count");
const mobileCartTotal = document.getElementById("mobile-cart-total");
const mobileOpenCart = document.getElementById("mobile-open-cart");

// Modal Struk Elemen
const receiptModalOverlay = document.getElementById("receipt-modal-overlay");
const receiptBody = document.getElementById("receipt-body");
const receiptOrderId = document.getElementById("receipt-order-id");
const sendWaBtn = document.getElementById("send-wa-btn");
const printReceiptBtn = document.getElementById("print-receipt-btn");
const newOrderBtn = document.getElementById("new-order-btn");

// ============================================================
// FORMATTER RUPIAH
// ============================================================
function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(number);
}

// ============================================================
// RENDER KATALOG MENU
// ============================================================
function renderMenu() {
    // Filter berdasarkan kategori dan pencarian
    const filteredMenu = menuDatabase.filter(item => {
        const matchesCategory = activeCategory === "all" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Update counter menu
    menuCounter.innerText = `Menampilkan ${filteredMenu.length} menu`;

    if (filteredMenu.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                <p style="font-size: 1.2rem;">🔍 Menu tidak ditemukan</p>
                <p style="font-size: 0.9rem;">Coba cari dengan kata kunci lain atau pilih kategori Semua.</p>
            </div>
        `;
        return;
    }

    menuGrid.innerHTML = filteredMenu.map(item => {
        // Cek apakah item sudah ada di keranjang
        const cartItem = cart.find(c => c.id === item.id);
        const inCartText = cartItem ? ` (${cartItem.qty}x)` : "";

        return `
            <div class="menu-card" data-id="${item.id}">
                <div class="card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
                    <span class="card-badge-tag">${item.badge}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-desc">${item.description}</p>
                    <div class="card-footer">
                        <span class="card-price">${formatRupiah(item.price)}</span>
                        <button class="btn-add-order" onclick="addToCart(${item.id})">
                            <span>+ Pesan</span>${inCartText}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// ============================================================
// MANAJEMEN KERANJANG (CART) & KALKULATOR OTOMATIS
// ============================================================
function addToCart(id) {
    const menuItem = menuDatabase.find(item => item.id === id);
    if (!menuItem) return;

    const existingIndex = cart.findIndex(c => c.id === id);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            qty: 1
        });
    }

    updateCartAndCalculator();
    renderMenu();

    // Buka drawer secara halus jika baru pertama kali menambah item
    if (cart.length === 1 && cart[0].qty === 1) {
        openCartDrawer();
    }
}

function updateQuantity(id, change) {
    const itemIndex = cart.findIndex(c => c.id === id);
    if (itemIndex === -1) return;

    cart[itemIndex].qty += change;

    if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
    }

    updateCartAndCalculator();
    renderMenu();
}

function updateCartAndCalculator() {
    // 1. Hitung Total Kuantitas
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.innerText = totalQty;
    drawerItemCount.innerText = `${totalQty} item`;

    // 2. Kalkulator Otomatis Biaya
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.10); // Pajak Resto 10%
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const grandTotal = Math.max(0, subtotal + tax - discountAmount);

    // 3. Update Tampilan Kalkulator
    calcSubtotal.innerText = formatRupiah(subtotal);
    calcTax.innerText = formatRupiah(tax);
    
    if (discountPercent > 0) {
        discountRow.style.display = "flex";
        discountPercentText.innerText = `${discountPercent}%`;
        calcDiscount.innerText = `- ${formatRupiah(discountAmount)}`;
    } else {
        discountRow.style.display = "none";
    }

    calcGrandTotal.innerText = formatRupiah(grandTotal);
    btnTotalDisplay.innerText = formatRupiah(grandTotal);

    // 4. Update Tampilan Keranjang Mobile Floating Bar
    if (totalQty > 0) {
        mobileCartBar.classList.add("visible");
        mobileCartCount.innerText = `${totalQty} Item Pesanan`;
        mobileCartTotal.innerText = formatRupiah(grandTotal);
    } else {
        mobileCartBar.classList.remove("visible");
    }

    // 5. Render Daftar Item di Drawer
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <div class="empty-cart-icon">🛒</div>
                <p style="font-weight: 600; color: var(--text-main);">Keranjang Anda Kosong</p>
                <p style="font-size: 0.85rem;">Pilih menu kopi atau makanan favorit Anda untuk mulai memesan.</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item-card">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-single-price">${formatRupiah(item.price)} / porsi</div>
                </div>
                <div class="item-qty-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="item-total-price">${formatRupiah(item.price * item.qty)}</div>
            </div>
        `).join("");
    }
}

// ============================================================
// PROMO & VOUCHER DISKON
// ============================================================
applyPromoBtn.addEventListener("click", () => {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (!code) {
        promoMsg.className = "promo-msg error";
        promoMsg.innerText = "Masukkan kode promo terlebih dahulu.";
        return;
    }

    if (code === "KOPISENANG") {
        discountPercent = 15;
        appliedPromoCode = "KOPISENANG";
        promoMsg.className = "promo-msg success";
        promoMsg.innerText = "🎉 Diskon 15% berhasil diterapkan!";
    } else if (code === "HEMAT10") {
        discountPercent = 10;
        appliedPromoCode = "HEMAT10";
        promoMsg.className = "promo-msg success";
        promoMsg.innerText = "🎉 Diskon 10% berhasil diterapkan!";
    } else {
        promoMsg.className = "promo-msg error";
        promoMsg.innerText = "Kode promo tidak valid atau kadaluarsa.";
    }

    updateCartAndCalculator();
});

// ============================================================
// BUKA & TUTUP DRAWER KERANJANG
// ============================================================
function openCartDrawer() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
}

openCartBtn.addEventListener("click", openCartDrawer);
closeCartBtn.addEventListener("click", closeCartDrawer);
cartOverlay.addEventListener("click", closeCartDrawer);
mobileOpenCart.addEventListener("click", openCartDrawer);

// ============================================================
// SINKRONISASI NOMOR MEJA
// ============================================================
function syncTableNumber(val) {
    if (val) {
        tableNumberInput.value = val;
        orderTable.value = val;
        navTableDisplay.innerText = `Meja ${val}`;
    } else {
        navTableDisplay.innerText = "Belum Diisi";
    }
}

tableNumberInput.addEventListener("input", (e) => syncTableNumber(e.target.value));
orderTable.addEventListener("input", (e) => syncTableNumber(e.target.value));

// ============================================================
// FILTER KATEGORI & PENCARIAN
// ============================================================
categoryTabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;

    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeCategory = btn.dataset.category;
    renderMenu();
});

searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderMenu();
});

// ============================================================
// CHECKOUT & STRUK PESANAN
// ============================================================
let lastOrderData = null;

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang belanja Anda masih kosong. Silakan pilih menu terlebih dahulu!");
        return;
    }

    const table = orderTable.value.trim();
    const name = orderName.value.trim();
    const notes = orderNotes.value.trim() || "-";
    const payment = document.querySelector('input[name="payment-method"]:checked')?.value || "QRIS";

    if (!table) {
        alert("Harap masukkan Nomor Meja Anda!");
        orderTable.focus();
        return;
    }

    if (!name) {
        alert("Harap masukkan Nama Pemesan!");
        orderName.focus();
        return;
    }

    // Kalkulasi Total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = Math.round(subtotal * 0.10);
    const discountAmount = Math.round(subtotal * (discountPercent / 100));
    const grandTotal = Math.max(0, subtotal + tax - discountAmount);
    const orderId = `NP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const timeString = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

    lastOrderData = {
        orderId,
        timeString,
        table,
        name,
        notes,
        payment,
        items: [...cart],
        subtotal,
        tax,
        discountAmount,
        grandTotal
    };

    // Render Struk
    receiptOrderId.innerText = `#${orderId}`;
    receiptBody.innerHTML = `
        <div class="receipt-meta">
            <div><strong>Nama:</strong> ${name}</div>
            <div><strong>Meja:</strong> Meja ${table}</div>
            <div><strong>Waktu:</strong> ${timeString}</div>
            <div><strong>Bayar:</strong> ${payment}</div>
        </div>
        ${notes !== "-" ? `<div style="font-size: 0.8rem; color: var(--primary); margin-bottom: 0.8rem;"><strong>Catatan:</strong> ${notes}</div>` : ""}
        <div class="receipt-divider"></div>
        <div class="receipt-items-list">
            ${cart.map(item => `
                <div class="receipt-item-row">
                    <span>${item.qty}x ${item.name}</span>
                    <strong>${formatRupiah(item.price * item.qty)}</strong>
                </div>
            `).join("")}
        </div>
        <div class="receipt-divider"></div>
        <div class="receipt-item-row">
            <span>Subtotal</span>
            <span>${formatRupiah(subtotal)}</span>
        </div>
        <div class="receipt-item-row">
            <span>Pajak Resto (10%)</span>
            <span>${formatRupiah(tax)}</span>
        </div>
        ${discountAmount > 0 ? `
            <div class="receipt-item-row" style="color: var(--success);">
                <span>Diskon Promo (${discountPercent}%)</span>
                <span>-${formatRupiah(discountAmount)}</span>
            </div>
        ` : ""}
        <div class="receipt-grand-total">
            <span>Total Bayar:</span>
            <span>${formatRupiah(grandTotal)}</span>
        </div>
    `;

    // Siapkan Link WhatsApp
    const waText = encodeURIComponent(
`*PESANAN BARU - NOPAL COFFEE* ☕
----------------------------------
*Order ID:* #${orderId}
*Nama:* ${name}
*Nomor Meja:* Meja ${table}
*Metode Bayar:* ${payment}
*Catatan:* ${notes}

*Rincian Menu:*
${cart.map(i => `• ${i.qty}x ${i.name} = ${formatRupiah(i.price * i.qty)}`).join("\n")}

*Subtotal:* ${formatRupiah(subtotal)}
*Pajak (10%):* ${formatRupiah(tax)}
${discountAmount > 0 ? `*Diskon:* -${formatRupiah(discountAmount)}\n` : ""}*TOTAL AKHIR:* ${formatRupiah(grandTotal)}
----------------------------------
Mohon segera diproses, terima kasih!`
    );

    sendWaBtn.onclick = () => {
        window.open(`https://wa.me/6281615544428?text=${waText}`, "_blank");
    };

    // Tutup Drawer & Tampilkan Modal Struk
    closeCartDrawer();
    receiptModalOverlay.classList.add("active");
});

// Tombol Cetak Struk
printReceiptBtn.addEventListener("click", () => {
    window.print();
});

// Tombol Selesai / Pesan Baru
newOrderBtn.addEventListener("click", () => {
    cart = [];
    discountPercent = 0;
    promoCodeInput.value = "";
    promoMsg.innerText = "";
    orderNotes.value = "";
    updateCartAndCalculator();
    renderMenu();
    receiptModalOverlay.classList.remove("active");
});

// Inisialisasi awal saat dokumen dimuat
document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
    updateCartAndCalculator();
});
