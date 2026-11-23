/* ROYAL EXPRESS - Advanced Global State & Multi-Vendor Record Store V8 */
const ROYAL_STORE_KEY = "ROYAL_EXPRESS_STORE_V8";
const ROYAL_USERS_KEY = "ROYAL_EXPRESS_USERS_V8";
const ROYAL_AUTH_KEY = "ROYAL_EXPRESS_AUTH_V8";
const ROYAL_ORDERS_KEY = "ROYAL_EXPRESS_ORDERS_V8";
const ROYAL_CART_KEY = "ROYAL_EXPRESS_CART_V8";
const ROYAL_MESSAGES_KEY = "ROYAL_EXPRESS_MESSAGES_V8";
const ROYAL_PAYMENTS_KEY = "ROYAL_EXPRESS_PAYMENTS_V8";
const ROYAL_ALERTS_KEY = "ROYAL_EXPRESS_ALERTS_V8";
const ROYAL_ADMIN_CREDS_KEY = "ROYAL_EXPRESS_ADMIN_CREDS_V8";
const ROYAL_RESELLER_LOGS_KEY = "ROYAL_EXPRESS_RESELLER_LOGS_V8";
const ROYAL_PASSWORD_RESETS_KEY = "ROYAL_EXPRESS_PWD_RESETS_V8";
const ROYAL_WITHDRAWALS_KEY = "ROYAL_EXPRESS_WITHDRAWALS_V8";
const ROYAL_PAYSTACK_PUBLIC_KEY = "pk_live_7f985c26dcf2229ff2c3cfe5e803bdcb2cec4936";

const ROYAL_CATEGORIES = [
    { name: "Electronics", icon: "fa-laptop" },
    { name: "Fashion", icon: "fa-shirt" },
    { name: "Home & Kitchen", icon: "fa-blender" },
    { name: "Beauty & Care", icon: "fa-pump-soap" },
    { name: "Sports & Fitness", icon: "fa-dumbbell" },
    { name: "Automotive", icon: "fa-car" },
    { name: "Gaming & Consoles", icon: "fa-gamepad" },
    { name: "Cameras & Audio", icon: "fa-camera" },
    { name: "Watches & Jewelry", icon: "fa-gem" },
    { name: "Office & Tech", icon: "fa-briefcase" }
];

function getPaystackPublicKey() {
    return ROYAL_PAYSTACK_PUBLIC_KEY;
}

function getAdminCreds() {
    let creds = JSON.parse(localStorage.getItem(ROYAL_ADMIN_CREDS_KEY));
    if (!creds) {
        creds = {
            email: "isaacbekoeasabre@gmail.com",
            phone1: "+233538287760",
            phone2: "+233538747584",
            password: "Royal@1924"
        };
        localStorage.setItem(ROYAL_ADMIN_CREDS_KEY, JSON.stringify(creds));
    }
    return creds;
}

function saveAdminCreds(creds) {
    localStorage.setItem(ROYAL_ADMIN_CREDS_KEY, JSON.stringify(creds));
}

function generateSeedProducts() {
    const categories = ROYAL_CATEGORIES.map(c => c.name);
    const adjectives = ["Pro", "Ultra", "Royal Edition", "Max", "Elite", "Smart", "Premium", "Wireless", "Luxury"];
    let products = [
        { id: "ROYAL-PRD-1001", name: "Smartphone 15 Pro Max", cat: "Electronics", price: 1299, originalPrice: 1299, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600", rating: 4.9, stock: 45, seller: "Royal Official Store", profitMargin: 0, discountActive: false },
        { id: "ROYAL-PRD-1002", name: "4K OLED Smart TV 65 Inch", cat: "Electronics", price: 1850, originalPrice: 1850, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600", rating: 4.8, stock: 20, seller: "TechZone Ghana", profitMargin: 50, discountActive: false },
        { id: "ROYAL-PRD-1003", name: "Noise Cancelling Headphones", cat: "Cameras & Audio", price: 299, originalPrice: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600", rating: 4.7, stock: 85, seller: "SoundMaster", profitMargin: 20, discountActive: false },
        { id: "ROYAL-PRD-1004", name: "Designer Leather Jacket", cat: "Fashion", price: 240, originalPrice: 240, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600", rating: 4.6, stock: 30, seller: "Royal Styles", profitMargin: 0, discountActive: false },
        { id: "ROYAL-PRD-1005", name: "Running Sneakers Breathable", cat: "Sports & Fitness", price: 120, originalPrice: 120, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600", rating: 4.8, stock: 110, seller: "Kasoa Sports Wear", profitMargin: 15, discountActive: false },
        { id: "ROYAL-PRD-1006", name: "Automatic Coffee Maker", cat: "Home & Kitchen", price: 350, originalPrice: 350, image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600", rating: 4.9, stock: 15, seller: "Royal Home Depot", profitMargin: 0, discountActive: false }
    ];
    const categoryImages = {
        "Electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
        "Fashion": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
        "Home & Kitchen": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",
        "Beauty & Care": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
        "Sports & Fitness": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600",
        "Automotive": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
        "Gaming & Consoles": "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600",
        "Cameras & Audio": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
        "Watches & Jewelry": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        "Office & Tech": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600"
    };
    let counter = 1010;
    for (let c of categories) {
        for (let a of adjectives) {
            let price = Math.floor(Math.random() * 400) + 50;
            products.push({
                id: `ROYAL-PRD-${counter}`, name: `${a} ${c} Item ${counter}`, cat: c,
                price, originalPrice: price, image: categoryImages[c] || categoryImages.Electronics,
                rating: (Math.random() * 1.5 + 3.5).toFixed(1), stock: Math.floor(Math.random() * 100) + 5,
                seller: counter % 2 === 0 ? "Royal Official Store" : "Partner Reseller",
                profitMargin: counter % 2 === 0 ? 0 : 25, discountActive: false
            });
            counter++;
        }
    }
    return products;
}

function getProducts() {
    let stored = localStorage.getItem(ROYAL_STORE_KEY);
    if (!stored) {
        let seeded = generateSeedProducts();
        localStorage.setItem(ROYAL_STORE_KEY, JSON.stringify(seeded));
        return seeded;
    }
    return JSON.parse(stored);
}

function saveProducts(products) {
    localStorage.setItem(ROYAL_STORE_KEY, JSON.stringify(products));
}

function getUsers() {
    return JSON.parse(localStorage.getItem(ROYAL_USERS_KEY) || "[]");
}

function saveUsers(users) {
    localStorage.setItem(ROYAL_USERS_KEY, JSON.stringify(users));
}

function getResellerLogs() {
    return JSON.parse(localStorage.getItem(ROYAL_RESELLER_LOGS_KEY) || "[]");
}

function saveResellerLogs(logs) {
    localStorage.setItem(ROYAL_RESELLER_LOGS_KEY, JSON.stringify(logs));
}

function getPasswordResets() {
    return JSON.parse(localStorage.getItem(ROYAL_PASSWORD_RESETS_KEY) || "[]");
}

function savePasswordResets(resets) {
    localStorage.setItem(ROYAL_PASSWORD_RESETS_KEY, JSON.stringify(resets));
}

function getWithdrawals() {
    return JSON.parse(localStorage.getItem(ROYAL_WITHDRAWALS_KEY) || "[]");
}

function saveWithdrawals(withdrawals) {
    localStorage.setItem(ROYAL_WITHDRAWALS_KEY, JSON.stringify(withdrawals));
}

function getCart() {
    return JSON.parse(localStorage.getItem(ROYAL_CART_KEY) || "[]");
}

function saveCart(cart) {
    localStorage.setItem(ROYAL_CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function getOrders() {
    return JSON.parse(localStorage.getItem(ROYAL_ORDERS_KEY) || "[]");
}

function saveOrders(orders) {
    localStorage.setItem(ROYAL_ORDERS_KEY, JSON.stringify(orders));
}

function getPayments() {
    return JSON.parse(localStorage.getItem(ROYAL_PAYMENTS_KEY) || "[]");
}

function savePayments(payments) {
    localStorage.setItem(ROYAL_PAYMENTS_KEY, JSON.stringify(payments));
}

function getMessages() {
    return JSON.parse(localStorage.getItem(ROYAL_MESSAGES_KEY) || "[]");
}

function saveMessages(msgs) {
    localStorage.setItem(ROYAL_MESSAGES_KEY, JSON.stringify(msgs));
}

function getAlerts() {
    return JSON.parse(localStorage.getItem(ROYAL_ALERTS_KEY) || "[]");
}

function saveAlerts(alerts) {
    localStorage.setItem(ROYAL_ALERTS_KEY, JSON.stringify(alerts));
}

function clearAllDashboardRecords() {
    localStorage.setItem(ROYAL_USERS_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_ORDERS_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_PAYMENTS_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_MESSAGES_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_ALERTS_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_RESELLER_LOGS_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_WITHDRAWALS_KEY, JSON.stringify([]));
    localStorage.setItem(ROYAL_PASSWORD_RESETS_KEY, JSON.stringify([]));
}

function getAuthUser() {
    return JSON.parse(localStorage.getItem(ROYAL_AUTH_KEY) || "null");
}

function saveAuthUser(user) {
    if (user) {
        localStorage.setItem(ROYAL_AUTH_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(ROYAL_AUTH_KEY);
    }
}

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
        b.textContent = count;
        b.style.display = count > 0 ? "inline-flex" : "none";
    });
}

function royalChangeLanguage(lang) {
    localStorage.setItem("royal_site_language", lang);
    if (lang === "en") { location.reload(); return; }
    if (!document.getElementById("google_translate_element")) {
        const host=document.createElement("div"); host.id="google_translate_element"; host.style.display="none"; document.body.appendChild(host);
        window.googleTranslateElementInit=()=>new google.translate.TranslateElement({pageLanguage:"en",includedLanguages:"fr,es,pt,ak",autoDisplay:false},"google_translate_element");
        const script=document.createElement("script"); script.src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"; document.body.appendChild(script);
    }
    setTimeout(()=>{const combo=document.querySelector(".goog-te-combo");if(combo){combo.value=lang==="tw"?"ak":lang;combo.dispatchEvent(new Event("change"));}},1800);
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    if (!document.getElementById("siteLanguage") && !document.getElementById("royalLanguagePicker")) {
        const wrap=document.createElement("div"); wrap.id="royalLanguagePicker"; wrap.className="fixed bottom-4 left-4 z-40 bg-slate-900/95 border border-blue-700 rounded-xl p-2 shadow-xl text-xs text-white";
        wrap.innerHTML='<label for="royalLangSelect" class="mr-2">Language</label><select id="royalLangSelect" class="bg-slate-800 text-white rounded p-1"><option value="en">English</option><option value="fr">Français</option><option value="es">Español</option><option value="pt">Português</option><option value="tw">Twi</option></select>';
        document.body.appendChild(wrap); const picker=wrap.querySelector("select"); picker.value=localStorage.getItem("royal_site_language")||"en"; picker.addEventListener("change",()=>royalChangeLanguage(picker.value));
    }
});


// Admin-managed storefront settings (local browser storage in this static edition).
const ROYAL_SETTINGS_KEY = "ROYAL_EXPRESS_SETTINGS_V1";
function getRoyalSettings(){ return JSON.parse(localStorage.getItem(ROYAL_SETTINGS_KEY) || JSON.stringify({categories: ROYAL_CATEGORIES.map(c=>c.name), deliveryFee:25, deliveryEnabled:true, discountEnabled:true, discountName:"Welcome Discount", discountPercent:10, adData:"", adType:"", adEnabled:true, ads:[], adPaused:false})); }
function saveRoyalSettings(settings){
    localStorage.setItem(ROYAL_SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('royal:settings-updated', {detail: settings}));
}
// Large ad/video files live in IndexedDB instead of localStorage (which is too small for video).
const ROYAL_MEDIA_DB = 'ROYAL_EXPRESS_MEDIA_V1';
let royalMediaDbPromise = null;
const royalMediaUrlCache = new Map();
function openRoyalMediaDb(){
    if(!('indexedDB' in window)) return Promise.reject(new Error('IndexedDB is not available in this browser.'));
    if(!royalMediaDbPromise) royalMediaDbPromise = new Promise((resolve,reject)=>{
        const req=indexedDB.open(ROYAL_MEDIA_DB,1);
        req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('media'))req.result.createObjectStore('media');};
        req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error||new Error('Could not open media storage.'));
    });
    return royalMediaDbPromise;
}
async function saveRoyalMedia(key, blob){const db=await openRoyalMediaDb();return new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');tx.objectStore('media').put(blob,key);tx.oncomplete=()=>resolve(key);tx.onerror=()=>reject(tx.error||new Error('Could not save media.'));});}
async function getRoyalMediaUrl(key){
    if(royalMediaUrlCache.has(key))return royalMediaUrlCache.get(key);
    const db=await openRoyalMediaDb();const blob=await new Promise((resolve,reject)=>{const req=db.transaction('media','readonly').objectStore('media').get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
    if(!blob)return '';const url=URL.createObjectURL(blob);royalMediaUrlCache.set(key,url);return url;
}
async function deleteRoyalMedia(key){if(!key)return;const db=await openRoyalMediaDb();await new Promise((resolve,reject)=>{const tx=db.transaction('media','readwrite');tx.objectStore('media').delete(key);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});const url=royalMediaUrlCache.get(key);if(url)URL.revokeObjectURL(url);royalMediaUrlCache.delete(key);}
function notifyRoyalSettingsRefresh(){window.dispatchEvent(new Event('royal:settings-updated'));}
function getDeliveryFee(){ const s=getRoyalSettings(); return s.deliveryEnabled ? Math.max(0, Number(s.deliveryFee)||0) : 0; }
function getRoyalCategories(){ const s=getRoyalSettings(); return (s.categories && s.categories.length ? s.categories : ROYAL_CATEGORIES.map(c=>c.name)); }
