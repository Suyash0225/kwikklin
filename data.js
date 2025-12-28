/**
 * Kwik Klin Smart Services - Data & Logic Layer
 * Authentication: Simple PIN for Admin (Now Dynamic)
 * Storage: LocalStorage (Simulating Backend)
 */

const STORAGE_KEYS = {
    SERVICES: "kwikklin_services",
    CART: "kwikklin_cart",
    OFFERS: "kwikklin_offers",
    ADMIN_PROFILE: "kwikklin_admin",
    STORY: "kwikklin_story",
    BLOGS: "kwikklin_blogs"
};

// --- Defaults ---

const DEFAULT_ADMIN = {
    pin: "1234",
    profile: {
        name: "Admin User",
        phone: "9696856069",
        email: "admin@kwikklin.com",
        role: "Super Admin"
    },
    loginLog: {
        lastLogin: null,
        failedAttempts: 0
    },
    settings: {
        maintenanceMode: false,
        allowOrders: true,
        allowBlogs: true
    }
};

const DEFAULT_SERVICES = [
    {
        id: '1',
        name: "Men's Shirt",
        price: 50,
        category: 'Dry Clean',
        subCategory: 'Male',
        image: 'https://images.unsplash.com/photo-1621644670176-21b0dc561494?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '2',
        name: "Men's Trousers",
        price: 60,
        category: 'Dry Clean',
        subCategory: 'Male',
        image: 'https://images.unsplash.com/photo-1604176354273-d1418cc69e7e?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '3',
        name: 'Bed Sheet (Double)',
        price: 120,
        category: 'Household',
        subCategory: 'Other',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '4',
        name: 'Daily Wear (Kg)',
        price: 80,
        category: 'Normal Wash',
        subCategory: 'Other',
        image: 'https://images.unsplash.com/photo-1545173168-9f3d7d451fce?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '5',
        name: 'Saree (Heavy)',
        price: 150,
        category: 'Dry Clean',
        subCategory: 'Female',
        image: 'https://images.unsplash.com/photo-1610030469983-98e6005391d8?q=80&w=600&auto=format&fit=crop'
    },
    {
        id: '6',
        name: 'Curtains (Per Panel)',
        price: 100,
        category: 'Household',
        subCategory: 'Other',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
    }
];

const DEFAULT_STORY = {
    title: "Our Story",
    subtitle: "Bringing the future of laundry to Varanasi.",
    image: "https://images.unsplash.com/photo-1521656693074-0ef32e80a5d5?q=80&w=2070&auto=format&fit=crop",
    content: `Kwik Klin Smart Services was born from a simple idea: Laundry shouldn't be a chore. In the bustling city of Varanasi, finding time for quality fabric care can be difficult. We wanted to create a solution that combines the ease of modern technology with the trust of traditional cleaning.\n\nOur mission is to provide zero-effort laundry with premium results. Whether it's your daily wear or expensive sarees, we treat every cloth with expert care.`,
    vision: "To become Varanasi's most trusted online laundry partner, known for hygiene, speed, and customer satisfaction."
};

const DEFAULT_BLOGS = [
    {
        id: '1',
        title: "5 Tips to Keep Your Whites Bright",
        category: "Laundry Tips",
        image: "https://images.unsplash.com/photo-1517677280437-a8dabc8f403e?q=80&w=2069&auto=format&fit=crop",
        snippet: "Learn how to maintain the brightness of your white clothes with these simple hacks.",
        date: "2025-01-15"
    },
    {
        id: '2',
        title: "Why Dry Cleaning is Essential for Silk",
        category: "Fabric Care",
        image: "https://images.unsplash.com/photo-1545173168-9f3d7d451fce?q=80&w=2073&auto=format&fit=crop",
        snippet: "Silk is delicate. Discover why professional care is the only way to go.",
        date: "2025-01-10"
    },
    {
        id: '3',
        title: "Now Serving All of Varanasi!",
        category: "Service Update",
        image: "https://images.unsplash.com/photo-1582735689369-4fe8d7520e2b?q=80&w=2070&auto=format&fit=crop",
        snippet: "We have expanded our pickup and delivery zones to cover the entire city.",
        date: "2024-12-25"
    }
];

// --- Data Access Layer ---

const DataManager = {
    init() {
        if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.CART)) {
            localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
        }

        // Admin Init with Migration Check
        let adminData = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_PROFILE));
        if (!adminData) {
            localStorage.setItem(STORAGE_KEYS.ADMIN_PROFILE, JSON.stringify(DEFAULT_ADMIN));
        } else {
            // Migration: Ensure new fields exist if we have an old object
            let changed = false;
            // Ensure profile exists
            if (!adminData.profile) {
                adminData.profile = DEFAULT_ADMIN.profile;
                changed = true;
            }
            // Ensure loginLog exists
            if (!adminData.loginLog) {
                adminData.loginLog = DEFAULT_ADMIN.loginLog;
                changed = true;
            }
            // Ensure settings exist
            if (!adminData.settings) {
                adminData.settings = DEFAULT_ADMIN.settings;
                changed = true;
            }

            if (changed) {
                localStorage.setItem(STORAGE_KEYS.ADMIN_PROFILE, JSON.stringify(adminData));
            }
        }

        if (!localStorage.getItem(STORAGE_KEYS.STORY)) {
            localStorage.setItem(STORAGE_KEYS.STORY, JSON.stringify(DEFAULT_STORY));
        }
        if (!localStorage.getItem(STORAGE_KEYS.BLOGS)) {
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
        }

        // Analytics Migration
        if (localStorage.getItem('kwikklin_visits') && !localStorage.getItem('kwikklin_visits_legacy')) {
            const oldVisits = localStorage.getItem('kwikklin_visits');
            localStorage.setItem('kwikklin_visits_legacy', oldVisits);
            localStorage.removeItem('kwikklin_visits'); // Cleanup
            console.log("Analytics Migrated: " + oldVisits);
        }
    },

    // --- Admin Profile & Settings ---
    getAdminData() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_PROFILE));
    },

    saveAdminData(data) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_PROFILE, JSON.stringify(data));
    },

    // --- Secure PIN Helper ---
    _hash(str) {
        // Simple hash for client-side obfuscation (Not crypto-grade but better than plain text)
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    },

    checkAdmin(pin) {
        const data = this.getAdminData();
        // Check if stored pin is already hashed (simple length check or numeric)
        // If stored pin is '1234' (legacy), check plain then hash it.
        if (data.pin === pin) return true; // Legacy plain match
        if (data.pin === this._hash(pin)) return true; // Hashed match
        return false;
    },

    updateAdminPin(newPin) {
        const data = this.getAdminData();
        data.pin = this._hash(newPin); // Save Hashed
        this.saveAdminData(data);
    },

    logLogin(success) {
        const data = this.getAdminData();
        // Initialize if missing (backward compatibility)
        if (!data.loginLog) data.loginLog = { lastLogin: null, failedAttempts: 0 };

        if (success) {
            data.loginLog.lastLogin = new Date().toLocaleString();
            data.loginLog.failedAttempts = 0;
            data.loginLog.device = navigator.userAgent; // Simple device tracking
        } else {
            data.loginLog.failedAttempts = (data.loginLog.failedAttempts || 0) + 1;
        }
        this.saveAdminData(data);
    },

    updateSettings(key, value) {
        const data = this.getAdminData();
        if (!data.settings) data.settings = DEFAULT_ADMIN.settings;
        data.settings[key] = value;
        this.saveAdminData(data);
    },

    // --- Analytics ---
    // --- Analytics ---
    getVisits() {
        // Return total count (Legacy + New Logs)
        const legacy = parseInt(localStorage.getItem('kwikklin_visits_legacy') || '0');
        const logs = JSON.parse(localStorage.getItem('kwikklin_visit_log') || '[]');
        return legacy + logs.length;
    },

    trackVisit() {
        if (!sessionStorage.getItem('visit_tracked')) {
            // Log Timestamp
            const logs = JSON.parse(localStorage.getItem('kwikklin_visit_log') || '[]');
            logs.push(new Date().toISOString());
            localStorage.setItem('kwikklin_visit_log', JSON.stringify(logs));

            // Mark session
            sessionStorage.setItem('visit_tracked', 'true');
        }
    },

    getAnalytics(days) {
        const logs = JSON.parse(localStorage.getItem('kwikklin_visit_log') || '[]');
        const now = new Date();
        const cutoff = new Date();
        cutoff.setDate(now.getDate() - days);

        // Filter logs
        const recentLogs = logs.filter(timestamp => new Date(timestamp) >= cutoff);

        // Group by Date (YYYY-MM-DD)
        const dailyCounts = {};
        recentLogs.forEach(ts => {
            const dateStr = new Date(ts).toISOString().split('T')[0];
            dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
        });

        // Fill in missing dates for the chart
        const result = [];
        for (let i = 0; i < days; i++) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            result.push({
                date: dateStr,
                count: dailyCounts[dateStr] || 0
            });
        }
        return result.reverse(); // Oldest first
    },

    // --- Services ---
    getServices() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || "[]");
    },

    addService(service) {
        const services = this.getServices();
        service.id = Date.now().toString();
        services.push(service);
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    },

    deleteService(id) {
        let services = this.getServices();
        services = services.filter(s => String(s.id) !== String(id));
        localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    },

    updateService(updatedService) {
        let services = this.getServices();
        const index = services.findIndex(s => s.id === updatedService.id);
        if (index !== -1) {
            services[index] = updatedService;
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
        }
    },

    // --- Story ---
    getStory() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.STORY));
    },

    updateStory(storyData) {
        localStorage.setItem(STORAGE_KEYS.STORY, JSON.stringify(storyData));
    },

    // --- Blogs ---
    getBlogs() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || "[]");
    },

    addBlog(blog) {
        const blogs = this.getBlogs();
        blog.id = Date.now().toString();
        blog.date = new Date().toISOString().split('T')[0];
        blogs.unshift(blog); // Add to top
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    },

    deleteBlog(id) {
        let blogs = this.getBlogs();
        blogs = blogs.filter(b => String(b.id) !== String(id));
        localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
    },

    updateBlog(updatedBlog) {
        let blogs = this.getBlogs();
        const index = blogs.findIndex(b => b.id === updatedBlog.id);
        if (index !== -1) {
            blogs[index] = updatedBlog;
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogs));
        }
    },

    // --- Cart ---
    getCart() {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || "[]");
    },

    addToCart(serviceId, quantity = 1) {
        const cart = this.getCart();
        const services = this.getServices();
        const service = services.find(s => s.id === serviceId);

        if (!service) return;

        const existingItem = cart.find(item => item.id === serviceId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...service, quantity: quantity });
        }

        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        this.updateCartCount();
    },

    removeFromCart(serviceId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== serviceId);
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        this.updateCartCount();
    },

    updateQuantity(serviceId, change) {
        const cart = this.getCart();
        const item = cart.find(i => i.id === serviceId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(serviceId);
                return;
            }
        }
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
        this.updateCartCount();
    },

    clearCart() {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
        this.updateCartCount();
    },

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getOrderSummary() {
        const subtotal = this.getCartTotal();
        const delivery = subtotal > 500 ? 0 : 50;
        return {
            subtotal: subtotal,
            delivery: delivery,
            total: subtotal + delivery
        };
    },

    updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.innerText = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    },

    // --- WhatsApp Checkout ---
    checkoutWhatsApp(userDetails) {
        const cart = this.getCart();
        if (cart.length === 0) return;

        const summary = this.getOrderSummary();
        let message = `*New Order from Website*\n\n`;
        message += `*Name:* ${userDetails.name}\n`;
        message += `*Phone:* ${userDetails.phone}\n`;
        message += `*Address:* ${userDetails.address}\n\n`;
        message += `*Order Details:*\n`;

        cart.forEach(item => {
            message += `- ${item.name} x ${item.quantity}: ₹${item.price * item.quantity}\n`;
        });

        message += `\n*Subtotal: ₹${summary.subtotal}*`;
        if (summary.delivery === 0) {
            message += `\n*Delivery: FREE*`;
        } else {
            message += `\n*Delivery Charge: ₹${summary.delivery}*`;
        }

        message += `\n----------------\n*Grand Total: ₹${summary.total}*`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/9696856069?text=${encodedMessage}`;

        // Clear cart assumption
        this.clearCart();

        window.open(whatsappUrl, '_blank');
    }
};

// Global UI Helper
window.toggleMenu = function () {
    const nav = document.getElementById('nav-links');
    if (nav) nav.classList.toggle('active');
};

// Initialize on load
DataManager.init();
