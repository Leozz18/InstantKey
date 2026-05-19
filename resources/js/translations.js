import { useState, useEffect } from 'react';

export const translations = {
    it: {
        // SiteLayout / Navbar
        catalog: "Catalogo",
        wishlist: "Wishlist",
        orders: "Ordini",
        support: "Supporto",
        admin: "Admin",
        profile: "Profilo",
        login: "Accedi",
        register: "Registrati",
        logout: "Esci",
        search_placeholder: "Cerca tra migliaia di giochi...",
        footer_desc: "Marketplace di chiavi digitali per videogiochi. Consegna istantanea garantita in meno di 5 secondi, prezzi vantaggiosi e chiavi 100% legittime.",
        rights_reserved: "Progetto didattico — Tutti i diritti riservati.",
        nav: "Naviga",
        about: "Chi siamo",
        faq: "FAQ",
        contacts: "Contatti",
        account: "Account",
        my_orders: "I miei ordini",
        supported_platforms: "Piattaforme supportate",
        why_choose: "Perché scegliere",
        why_choose_desc: "Una piattaforma costruita per chi vuole risparmiare senza compromessi su sicurezza e velocità.",
        
        // Home
        delivery_badge: "Consegna istantanea garantita in < 5 secondi",
        hero_title: "Le tue chiavi",
        hero_title_accent: "in pochi secondi",
        hero_subtitle: "Migliaia di giochi per Steam, Epic, GOG, PSN, Xbox e Nintendo. Prezzi fino al -40% sui titoli ufficiali, chiavi 100% legittime, sostituzione immediata garantita.",
        explore_catalog: "Esplora il catalogo",
        view_offers: "Vedi le offerte",
        max_delivery: "Consegna max",
        legit_keys: "Chiavi legittime",
        availability: "Disponibilità",
        featured: "In evidenza",
        featured_sub: "I giochi più hot del momento",
        deals: "Migliori offerte",
        deals_sub: "Sconti fino al -70%, solo per oggi",
        new_releases: "Nuove uscite",
        new_releases_sub: "Le novità del mondo gaming",
        view_all: "Vedi tutto",
        
        f1_title: "Consegna < 5s",
        f1_text: "Pipeline automatizzata che assegna la chiave appena il pagamento è confermato.",
        f2_title: "Sicurezza certificata",
        f2_text: "HTTPS, 2FA TOTP, CSRF protection nativa Laravel e antifraud Stripe.",
        f3_title: "Sconti fino al -40%",
        f3_text: "Acquistiamo durante i sale stagionali e dai mercati internazionali a basso costo.",
        f4_title: "Garanzia 100%",
        f4_text: "Ogni chiave è verificata. Se non funziona, sostituzione immediata via ticket.",

        // Catalog
        catalog_title: "Catalogo Giochi",
        filters: "Filtri",
        genre: "Genere",
        platform: "Piattaforma",
        price_range: "Filtra per Prezzo",
        search: "Cerca",
        no_products: "Nessun prodotto trovato.",
        all_genres: "Tutti i generi",
        all_platforms: "Tutte le piattaforme",
        min_price: "Prezzo Min",
        max_price: "Prezzo Max",
        order_by: "Ordina per",
        
        // Product Details
        add_to_cart: "Aggiungi al carrello",
        buy_now: "Acquista ora",
        original_price: "Prezzo originale",
        discount: "Sconto",
        out_of_stock: "Non disponibile",
        system_requirements: "Requisiti di sistema",
        reviews: "Recensioni",
        no_reviews: "Nessuna recensione per questo gioco.",
        write_review: "Scrivi una recensione",
        rating: "Valutazione",
        comment: "Commento",
        submit: "Invia",
        
        // Cart
        cart_title: "Carrello",
        empty_cart: "Il tuo carrello è vuoto.",
        total: "Totale",
        checkout: "Procedi al Checkout",
        remove: "Rimuovi",
        discount_code: "Codice Sconto",
        apply: "Applica",
        subtotal: "Subtotale",
        
        // Checkout
        billing_info: "Informazioni di pagamento",
        payment_method: "Metodo di pagamento",
        pay: "Paga ora",
        order_summary: "Riepilogo Ordine",
        
        // Orders
        orders_title: "I miei ordini",
        order_number: "Ordine numero",
        date: "Data",
        status: "Stato",
        view: "Visualizza",
        no_orders: "Nessun ordine effettuato.",
        
        // Tickets (User & Common)
        tickets_title: "I miei Ticket",
        open_ticket: "Apri un ticket di supporto",
        subject: "Oggetto",
        message: "Descrivi il problema",
        send: "Invia ticket",
        ticket_history: "Storico delle tue richieste",
        your_message: "Il tuo messaggio:",
        admin_response: "Risposta dell'assistenza:",
        ticket_status_open: "Aperto",
        ticket_status_resolved: "Risolto",
        ticket_placeholder: "Spiega cosa è successo...",
        order_info: "Info Ordine",

        // Admin Dashboard
        admin_dashboard_title: "Admin Dashboard",
        control_panel: "Pannello di controllo",
        platform_overview: "Vista d'insieme della piattaforma",
        manage_products_keys: "Gestione Prodotti & Chiavi",
        manage_tickets: "Gestione Ticket",
        total_revenue: "Ricavi totali",
        completed_orders: "Ordini completati",
        registered_users: "Utenti registrati",
        active_products: "Prodotti attivi",
        available_keys_stat: "Chiavi disponibili",
        sold_keys_stat: "Chiavi vendute",
        open_tickets_alert: "ticket aperti richiedono la tua attenzione",
        latest_orders: "Ultimi ordini",
        no_orders_yet: "Nessun ordine ancora.",
        low_keys_stock: "Stock chiavi basso",
        all_stock_ok: "Tutti i prodotti hanno scorte adeguate.",
        keys_left: "chiavi",
        back_to_dashboard: "Torna alla Dashboard",

        // Admin Tickets
        ticket_support_title: "Ticket di Supporto",
        ticket_support_desc: "Gestisci le richieste di assistenza e le chiavi non funzionanti",
        admin_tickets_id: "ID",
        admin_tickets_user: "Utente",
        admin_tickets_product: "Prodotto (Ordine)",
        admin_tickets_date: "Data",
        admin_tickets_status: "Stato",
        admin_tickets_actions: "Azioni",
        admin_tickets_manage: "Gestisci",
        admin_tickets_view: "Visualizza",
        admin_tickets_no_tickets: "Nessun ticket presente.",
        admin_ticket_detail: "Dettagli Segnalazione",
        admin_ticket_resolution: "Risoluzione",
        admin_ticket_resolution_msg: "Messaggio di Risoluzione (inviato all'utente)",
        admin_ticket_resolution_placeholder: "Spiega come è stato risolto il problema...",
        admin_ticket_replace_key: "Sostituisci Chiave",
        admin_ticket_replace_key_desc: "La chiave attuale verrà marcata come 'invalid' e ne verrà assegnata automaticamente una nuova dal pool (se disponibile).",
        admin_ticket_resolve_btn: "Risolvi Ticket",
        admin_ticket_back_list: "Torna ai Ticket",
        admin_ticket_no_notes: "Nessuna nota fornita.",
        admin_ticket_product_label: "Prodotto",
        admin_ticket_platform_label: "Piattaforma",
        admin_ticket_key_assigned: "Chiave Assegnata",
        admin_ticket_key_status: "Stato Chiave",
        admin_ticket_key_invalid: "Invalida",
        admin_ticket_key_sold: "Venduta",
        admin_ticket_user_name: "Nome",
        admin_ticket_user_email: "Email",

        // Auth Pages
        welcome_back: "Bentornato",
        login_desc: "Accedi al tuo account INSTANT KEY",
        remember_me: "Ricordami",
        forgot_password: "Password dimenticata?",
        logging_in: "Accesso...",
        no_account: "Non hai un account?",
        demo_accounts: "Account di prova:",
        create_account: "Crea il tuo account",
        register_desc: "Inizia a giocare in pochi secondi",
        name_label: "Nome",
        confirm_password: "Conferma password",
        creating: "Creazione...",
        have_account: "Hai già un account?",
    },
    en: {
        // SiteLayout / Navbar
        catalog: "Catalog",
        wishlist: "Wishlist",
        orders: "Orders",
        support: "Support",
        admin: "Admin",
        profile: "Profile",
        login: "Login",
        register: "Register",
        logout: "Logout",
        search_placeholder: "Search thousands of games...",
        footer_desc: "Digital game key marketplace. Instant delivery guaranteed in under 5 seconds, best prices, and 100% legitimate keys.",
        rights_reserved: "Educational project — All rights reserved.",
        nav: "Navigate",
        about: "About Us",
        faq: "FAQ",
        contacts: "Contacts",
        account: "Account",
        my_orders: "My Orders",
        supported_platforms: "Supported Platforms",
        why_choose: "Why choose",
        why_choose_desc: "A platform built for those who want to save without compromising on speed and security.",
        
        // Home
        delivery_badge: "Instant delivery guaranteed in < 5 seconds",
        hero_title: "Your keys",
        hero_title_accent: "in seconds",
        hero_subtitle: "Thousands of games for Steam, Epic, GOG, PSN, Xbox, and Nintendo. Prices up to -40% on official retail, 100% legitimate keys, guaranteed instant replacement.",
        explore_catalog: "Explore catalog",
        view_offers: "View offers",
        max_delivery: "Max delivery",
        legit_keys: "Legit keys",
        availability: "Availability",
        featured: "Featured",
        featured_sub: "The hottest games right now",
        deals: "Best Deals",
        deals_sub: "Discounts up to -70%, today only",
        new_releases: "New Releases",
        new_releases_sub: "The latest in the gaming world",
        view_all: "View all",
        
        f1_title: "Delivery < 5s",
        f1_text: "Automated pipeline that assigns the key as soon as payment is confirmed.",
        f2_title: "Certified Security",
        f2_text: "HTTPS, 2FA TOTP, native Laravel CSRF protection, and Stripe anti-fraud.",
        f3_title: "Discounts up to -40%",
        f3_text: "We buy during seasonal sales and from international markets at lower costs.",
        f4_title: "100% Warranty",
        f4_text: "Every key is verified. If it doesn't work, get an immediate replacement via ticket.",

        // Catalog
        catalog_title: "Game Catalog",
        filters: "Filters",
        genre: "Genre",
        platform: "Platform",
        price_range: "Filter by Price",
        search: "Search",
        no_products: "No products found.",
        all_genres: "All genres",
        all_platforms: "All platforms",
        min_price: "Min Price",
        max_price: "Max Price",
        order_by: "Order by",
        
        // Product Details
        add_to_cart: "Add to Cart",
        buy_now: "Buy Now",
        original_price: "Original Price",
        discount: "Discount",
        out_of_stock: "Out of Stock",
        system_requirements: "System Requirements",
        reviews: "Reviews",
        no_reviews: "No reviews for this game.",
        write_review: "Write a Review",
        rating: "Rating",
        comment: "Comment",
        submit: "Submit",
        
        // Cart
        cart_title: "Shopping Cart",
        empty_cart: "Your cart is empty.",
        total: "Total",
        checkout: "Proceed to Checkout",
        remove: "Remove",
        discount_code: "Promo Code",
        apply: "Apply",
        subtotal: "Subtotal",
        
        // Checkout
        billing_info: "Billing Information",
        payment_method: "Payment Method",
        pay: "Pay Now",
        order_summary: "Order Summary",
        
        // Orders
        orders_title: "My Orders",
        order_number: "Order Number",
        date: "Date",
        status: "Status",
        view: "View",
        no_orders: "No orders placed.",
        
        // Tickets (User & Common)
        tickets_title: "My Tickets",
        open_ticket: "Open a support ticket",
        subject: "Subject",
        message: "Describe the problem",
        send: "Send ticket",
        ticket_history: "Your requests history",
        your_message: "Your message:",
        admin_response: "Support response:",
        ticket_status_open: "Open",
        ticket_status_resolved: "Resolved",
        ticket_placeholder: "Explain what happened...",
        order_info: "Order Info",

        // Admin Dashboard
        admin_dashboard_title: "Admin Dashboard",
        control_panel: "Control Panel",
        platform_overview: "Platform Overview",
        manage_products_keys: "Manage Products & Keys",
        manage_tickets: "Manage Tickets",
        total_revenue: "Total Revenue",
        completed_orders: "Completed Orders",
        registered_users: "Registered Users",
        active_products: "Active Products",
        available_keys_stat: "Available Keys",
        sold_keys_stat: "Sold Keys",
        open_tickets_alert: "open tickets require your attention",
        latest_orders: "Latest Orders",
        no_orders_yet: "No orders yet.",
        low_keys_stock: "Low Keys Stock",
        all_stock_ok: "All products have adequate stock.",
        keys_left: "keys",
        back_to_dashboard: "Back to Dashboard",

        // Admin Tickets
        ticket_support_title: "Support Tickets",
        ticket_support_desc: "Manage support requests and broken keys",
        admin_tickets_id: "ID",
        admin_tickets_user: "User",
        admin_tickets_product: "Product (Order)",
        admin_tickets_date: "Date",
        admin_tickets_status: "Status",
        admin_tickets_actions: "Actions",
        admin_tickets_manage: "Manage",
        admin_tickets_view: "View",
        admin_tickets_no_tickets: "No tickets found.",
        admin_ticket_detail: "Report Details",
        admin_ticket_resolution: "Resolution",
        admin_ticket_resolution_msg: "Resolution Message (sent to user)",
        admin_ticket_resolution_placeholder: "Explain how the issue was resolved...",
        admin_ticket_replace_key: "Replace Key",
        admin_ticket_replace_key_desc: "The current key will be marked as 'invalid' and a new one will be automatically assigned from the pool (if available).",
        admin_ticket_resolve_btn: "Resolve Ticket",
        admin_ticket_back_list: "Back to Tickets",
        admin_ticket_no_notes: "No notes provided.",
        admin_ticket_product_label: "Product",
        admin_ticket_platform_label: "Platform",
        admin_ticket_key_assigned: "Assigned Key",
        admin_ticket_key_status: "Key Status",
        admin_ticket_key_invalid: "Invalid",
        admin_ticket_key_sold: "Sold",
        admin_ticket_user_name: "Name",
        admin_ticket_user_email: "Email",

        // Auth Pages
        welcome_back: "Welcome Back",
        login_desc: "Login to your INSTANT KEY account",
        remember_me: "Remember me",
        forgot_password: "Forgot password?",
        logging_in: "Logging in...",
        no_account: "Don't have an account?",
        demo_accounts: "Demo accounts:",
        create_account: "Create your account",
        register_desc: "Start gaming in seconds",
        name_label: "Name",
        confirm_password: "Confirm password",
        creating: "Creating...",
        have_account: "Already have an account?",
    }
};

let currentLang = typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'it') : 'it';

export const getLanguage = () => currentLang;

export const setLanguage = (lang) => {
    currentLang = lang;
    if (typeof window !== 'undefined') {
        localStorage.setItem('lang', lang);
        window.dispatchEvent(new Event('languagechange'));
    }
};

export const useTranslation = () => {
    const [lang, setLang] = useState(currentLang);

    useEffect(() => {
        const handleLangChange = () => {
            setLang(currentLang);
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('languagechange', handleLangChange);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('languagechange', handleLangChange);
            }
        };
    }, []);

    const t = (key) => {
        return translations[lang]?.[key] || translations['it']?.[key] || key;
    };

    return { lang, setLanguage, t };
};
