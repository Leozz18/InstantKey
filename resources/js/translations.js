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
        
        // Tickets
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
        
        // Tickets
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
    }
};

let currentLang = typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'it') : 'it';
const listeners = new Set();

export const getLanguage = () => currentLang;

export const setLanguage = (lang) => {
    currentLang = lang;
    if (typeof window !== 'undefined') {
        localStorage.setItem('lang', lang);
    }
    listeners.forEach(listener => listener(lang));
};

export const useTranslation = () => {
    const [lang, setLang] = useState(currentLang);

    useEffect(() => {
        listeners.add(setLang);
        return () => listeners.delete(setLang);
    }, []);

    const t = (key) => {
        return translations[lang]?.[key] || translations['it']?.[key] || key;
    };

    return { lang, setLanguage, t };
};
