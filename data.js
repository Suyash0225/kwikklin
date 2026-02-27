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
    { id: '1', name: "Shirt", price: 60, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1621644670176-21b0dc561494?w=600' },
    { id: '2', name: "Trouser", price: 60, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1624371414361-e6e0efc5831f?w=600' },
    { id: '3', name: "T-Shirt", price: 60, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600' },
    { id: '4', name: "Plain Kurta", price: 70, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '5', name: "Fancy Kurta", price: 150, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '6', name: "Heavy Kurta", price: 200, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '7', name: "Dhoti", price: 60, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '8', name: "Pyjama", price: 60, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1632731050165-3453392430ae?w=600' },
    { id: '9', name: "Jeans", price: 60, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600' },
    { id: '10', name: "Lower", price: 50, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1632731050165-3453392430ae?w=600' },
    { id: '11', name: "Sorts", price: 49, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600' },
    { id: '12', name: "Top", price: 50, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1564859228273-274232fba518?w=600' },
    { id: '13', name: "Jacket", price: 250, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600' },
    { id: '14', name: "Heavy Jacket", price: 400, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600' },
    { id: '15', name: "Huddy", price: 180, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600' },
    { id: '16', name: "Half Sweater", price: 100, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1614033411039-38f328f41349?w=600' },
    { id: '17', name: "Full Sweater", price: 150, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600' },
    { id: '18', name: "Kurti", price: 70, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030469983-98e6005391d8?w=600' },
    { id: '19', name: "Heavy (Working)", price: 100, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1545173168-9f3d7d451fce?w=600' },
    { id: '20', name: "Ladies Suit", price: 150, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030469983-98e6005391d8?w=600' },
    { id: '21', name: "Gown", price: 350, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1612459284970-e8f027596582?w=600' },
    { id: '22', name: "Gown Heavy", price: 500, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1612459284970-e8f027596582?w=600' },
    { id: '23', name: "Lahenga", price: 350, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1583313261122-9907a900bd9b?w=600' },
    { id: '24', name: "Lahenga Heavy", price: 600, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1583313261122-9907a900bd9b?w=600' },
    { id: '25', name: "Dress-Small", price: 130, category: 'Dry Clean', subCategory: 'Child', image: 'https://images.unsplash.com/photo-1621451537084-482c730e3bd0?w=600' },
    { id: '26', name: "Dress- Long", price: 300, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1612459284970-e8f027596582?w=600' },
    { id: '27', name: "Heavy Lahenga Bridal", price: 800, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1583313261122-9907a900bd9b?w=600' },
    { id: '28', name: "Plain Saree", price: 200, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030465438-fca0a63ef7f0?w=600' },
    { id: '29', name: "Saree Quality", price: 350, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030465438-fca0a63ef7f0?w=600' },
    { id: '30', name: "Designer Saree", price: 300, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030465438-fca0a63ef7f0?w=600' },
    { id: '31', name: "Simple Sherwani", price: 350, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '32', name: "Heavy Sherwani", price: 450, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '33', name: "Nehru Jacket", price: 180, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600' },
    { id: '34', name: "Coat- Blazer", price: 350, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600' },
    { id: '35', name: "Over Coat", price: 350, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1539533377285-a921419746ba?w=600' },
    { id: '36', name: "Suit 3 pcs", price: 550, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600' },
    { id: '37', name: "Raxine Jacket", price: 250, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600' },
    { id: '38', name: "Leather", price: 499, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1521223890158-f9f7ad49769a?w=600' },
    { id: '39', name: "Curtain(Window)", price: 99, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600' },
    { id: '40', name: "Curtain(Door)", price: 149, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600' },
    { id: '41', name: "Towel", price: 39, category: 'Normal Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1583912267550-d46d03a1f49b?w=600' },
    { id: '42', name: "Hand Towel", price: 15, category: 'Normal Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1583912267550-d46d03a1f49b?w=600' },
    { id: '43', name: "Pillow Cover", price: 10, category: 'Normal Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600' },
    { id: '44', name: "Double Bedsheet", price: 59, category: 'Normal Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600' },
    { id: '45', name: "Single Bedsheet", price: 49, category: 'Normal Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600' },
    { id: '46', name: "Shoes", price: 299, category: 'Shoe Cleaning', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
    { id: '47', name: "Socks", price: 10, category: 'Normal Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1582966574042-89b940909673?w=600' },
    { id: '48', name: "Baby Frock", price: 99, category: 'Dry Clean', subCategory: 'Child', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600' },
    { id: '49', name: "Baby Suit", price: 99, category: 'Dry Clean', subCategory: 'Child', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600' },
    { id: '50', name: "Baby Dress", price: 49, category: 'Dry Clean', subCategory: 'Child', image: 'https://images.unsplash.com/photo-1621451537084-482c730e3bd0?w=600' },
    { id: '51', name: "Tie", price: 19, category: 'Dry Clean', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=600' },
    { id: '52', name: "Gloves", price: 29, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600' },
    { id: '53', name: "Stole", price: 39, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030469983-98e6005391d8?w=600' },
    { id: '54', name: "Shawl", price: 69, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030469983-98e6005391d8?w=600' },
    { id: '55', name: "Muffler", price: 39, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1614033411039-38f328f41349?w=600' },
    { id: '56', name: "Duvet", price: 100, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=600' },
    { id: '57', name: "Blanket Single", price: 400, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600' },
    { id: '58', name: "Blanket Double", price: 500, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600' },
    { id: '59', name: "Blanket Medium", price: 500, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600' },
    { id: '60', name: "Blanket Heavy", price: 500, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600' },
    { id: '61', name: "Shoes Laundry", price: 300, category: 'Shoe Cleaning', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
    { id: '62', name: "Ladies Suit -(Working)", price: 200, category: 'Dry Clean', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030469983-98e6005391d8?w=600' },
    { id: '63', name: "Sleeping Bag", price: 199, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600' },
    { id: '64', name: "Shirt (Classic Wash)", price: 35, category: 'Normal Wash', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1621644670176-21b0dc561494?w=600' },
    { id: '65', name: "Trouser (Normal Wash)", price: 35, category: 'Normal Wash', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1624371414361-e6e0efc5831f?w=600' },
    { id: '66', name: "Jeans(Normal Wash)", price: 35, category: 'Normal Wash', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600' },
    { id: '67', name: "T-Shirt(Normal Wash)", price: 35, category: 'Normal Wash', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600' },
    { id: '68', name: "Plain Kurta (Normal Wash)", price: 40, category: 'Normal Wash', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=600' },
    { id: '69', name: "Lower(Normal Wash)", price: 35, category: 'Normal Wash', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1632731050165-3453392430ae?w=600' },
    { id: '70', name: "Premium Laundry", price: 150, category: 'Premium Wash', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1545173168-9f3d7d451fce?w=600' },
    { id: '71', name: "Dry Clean Per Kg", price: 190, category: 'Dry Clean', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1545173168-9f3d7d451fce?w=600' },
    { id: '72', name: "Sofa Cleaning", price: 350, category: 'Cleaning Services', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600' },
    { id: '73', name: "Floor Cleaning", price: 8, category: 'Cleaning Services', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1580479762147-38435f299863?w=600' },
    { id: '74', name: "Carpet (Per sq ft)", price: 25, category: 'Cleaning Services', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600' },
    { id: '75', name: "Saree Polish", price: 80, category: 'Cleaning Services', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1610030465438-fca0a63ef7f0?w=600' },
    { id: '76', name: "Shirt (Iron)", price: 18, category: 'Ironing', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '77', name: "T-Shirt (Iron)", price: 18, category: 'Ironing', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '78', name: "Trouser (Iron)", price: 18, category: 'Ironing', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '79', name: "Plain Kurti (Iron)", price: 35, category: 'Ironing', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '80', name: "Plain Kurta (Steam Iron)", price: 35, category: 'Ironing', subCategory: 'Male', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '81', name: "Fancy Kurti (Iron)", price: 35, category: 'Ironing', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '82', name: "Gown (Iron)", price: 75, category: 'Ironing', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '83', name: "Saree (Steam Iron)", price: 69, category: 'Ironing', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=600' },
    { id: '84', name: "Lahenga Polish", price: 150, category: 'Cleaning Services', subCategory: 'Female', image: 'https://images.unsplash.com/photo-1583313261122-9907a900bd9b?w=600' },
    { id: '85', name: "Other Service", price: 35, category: 'Miscellaneous', subCategory: 'Other', image: 'https://images.unsplash.com/photo-1582735689369-4fe8d7520e2b?w=600' }
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

        // Auto-Migration for New Services (Check if we have the old small default list)
        const currentServices = JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES) || "[]");
        if (currentServices.length > 0 && currentServices.length < 10) {
            console.log("Old Service List Detected. Migrating to New Catalog...");
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
        }
    },

    getCategoryIcon(category) {
        const map = {
            'Men': 'bi-person-standing',
            'Women': 'bi-person-standing-dress',
            'Household': 'bi-house-door',
            'Dry Clean': 'bi-suit-spade',
            'Premium Wash': 'bi-stars',
            'Shoe Cleaning': 'bi-archive',
            'Normal Wash': 'bi-basket',
            'Ironing': 'bi-fire',
            'Cleaning Services': 'bi-droplet',
            'Miscellaneous': 'bi-grid-3x3-gap',
            'Woolen': 'bi-snow',
            'Accessories': 'bi-handbag',
            'All': 'bi-grid-fill'
        };
        return map[category] || 'bi-tag';
    },

    factoryReset() {
        if (confirm("This will delete all current services, blogs, and customized story and reset to brand new defaults. Your visits data will be preserved. Proceed?")) {
            localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
            localStorage.setItem(STORAGE_KEYS.STORY, JSON.stringify(DEFAULT_STORY));
            localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(DEFAULT_BLOGS));
            alert("System has been reset to defaults. Page will now reload.");
            location.reload();
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
        // Initialize if missing
        if (!data.loginLog) data.loginLog = { lastLogin: null, failedAttempts: 0, recentFailedAttempts: 0 };

        if (success) {
            data.loginLog.lastLogin = new Date().toLocaleString();

            // Store the failures allowed to check safely
            data.loginLog.recentFailedAttempts = data.loginLog.failedAttempts || 0;

            data.loginLog.failedAttempts = 0; // Reset for next session checks

            // Simplify User Agent
            const ua = navigator.userAgent;
            let device = "Unknown Device";
            if (ua.includes("Windows")) device = "Windows PC";
            else if (ua.includes("Android")) device = "Android Device";
            else if (ua.includes("iPhone")) device = "iPhone";
            else if (ua.includes("Mac")) device = "Mac";

            // Browser
            if (ua.includes("Chrome")) device += " (Chrome)";
            else if (ua.includes("Firefox")) device += " (Firefox)";
            else if (ua.includes("Safari")) device += " (Safari)";

            data.loginLog.device = device;
        } else {
            data.loginLog.failedAttempts = (data.loginLog.failedAttempts || 0) + 1;
            // Also update recent so it shows real-time if we were to poll it (though we can't see dashboard yet)
            data.loginLog.recentFailedAttempts = data.loginLog.failedAttempts;
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
