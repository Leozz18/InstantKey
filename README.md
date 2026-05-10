# INSTANT KEY — Digital Game Marketplace

Marketplace e-commerce per la distribuzione automatizzata di chiavi digitali di videogiochi.
Consegna istantanea garantita in **meno di 5 secondi** dal pagamento.

> Progetto didattico full-stack basato sullo stack tecnologico definito nella documentazione ufficiale del progetto:
> **Laravel 11 + React 18 + Inertia.js + TailwindCSS + MariaDB/SQLite**.

---

## Stack tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Frontend | React 18, Inertia.js, TailwindCSS |
| Backend | Laravel 11, PHP 8.3 |
| Database | SQLite (predefinito) o MariaDB/MySQL |
| Auth | Laravel Breeze (email/password), middleware admin |
| Pagamenti | Stripe + PayPal (placeholder UI) + modalità Demo |
| Build tool | Vite 6 |

---

## Funzionalità implementate

### Area pubblica
- Home page in stile gaming con hero, sezioni "In evidenza", "Migliori offerte", "Nuove uscite"
- Catalogo con filtri per piattaforma, genere, prezzo, "solo offerte" + ordinamento (popolarità, prezzo, novità, rating)
- Pagina prodotto con galleria, trailer YouTube, requisiti di sistema, recensioni
- Carrello persistente in sessione + applicazione codici sconto (`WELCOME10`, `SUMMER20`, `INSTANT5`, `BLACKFRIDAY`)
- Pagine statiche: Chi siamo, FAQ, Contatti

### Area utente autenticata
- Registrazione, login, recupero password (Breeze)
- Dashboard personale con tile (Ordini, Wishlist, Supporto, Profilo)
- Checkout con scelta metodo di pagamento (Stripe/PayPal/Demo)
- **Consegna istantanea**: assegnazione automatica chiave dal pool al pagamento confermato
- Storico ordini con visualizzazione chiave (mostra/copia/nasconde) e ticket di sostituzione
- Wishlist con possibilità di rimozione rapida
- Recensioni verificate (solo dopo acquisto)
- Sistema ticket per chiavi non funzionanti

### Area admin
- Pannello dashboard con statistiche (ricavi, ordini, utenti, chiavi)
- Lista ultimi ordini e prodotti con stock basso
- Alert per ticket aperti

---

## Schema database (entità principali)

Le tabelle rispecchiano lo schema fisico del PDF di progetto:

- `platforms` (Steam, Epic, GOG, Origin, Battle.net, PSN, Xbox, Nintendo eShop)
- `genres` (Action, RPG, FPS, Strategy, Sports, ...)
- `products` (catalogo giochi con `price`, `original_price`, `release_date`, `rating_avg`)
- `keys_stock` (pool delle chiavi con stato `available/reserved/sold/invalid`)
- `orders` + `order_items` (con `key_id` collegata alla chiave erogata)
- `wishlists` (con `price_alert`)
- `reviews` (con `verified_purchase`)
- `tickets` (legati a `order_item_id`)
- `discount_codes` (con `usage_limit` e `expires_at`)

Migrations in `database/migrations/`, seeder in `database/seeders/`.

---

## Avvio rapido (Windows)

### Prerequisiti
- **PHP 8.3** (installato via winget: `winget install PHP.PHP.8.3`)
- **Composer 2.x** (installato in `%LOCALAPPDATA%\Composer`)
- **Node.js 20+** e npm

### 1. Installazione dipendenze

```bash
composer install
npm install
```

### 2. Configurazione

Il file `.env` è già preconfigurato per SQLite. Per usare MariaDB:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=instantkey
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Database (migrazioni + dati demo)

```bash
php artisan migrate:fresh --seed
```

Questo comando crea le tabelle e popola:
- **2 utenti**: 
  - `admin@instantkey.test` / `password` (admin)
  - `demo@instantkey.test` / `password` (utente normale)
- **8 piattaforme** + **14 generi**
- **20 videogiochi** con copertine, trailer, descrizioni
- **25 chiavi disponibili per ogni gioco** (500 chiavi totali nel pool)
- **4 codici sconto** funzionanti

### 4. Build assets frontend

```bash
npm run build
```

### 5. Avvio del server

```bash
php artisan serve
```

Apri il browser su [http://127.0.0.1:8000](http://127.0.0.1:8000).

> **Modalità sviluppo (hot reload)**: in un secondo terminale esegui `npm run dev` e poi `php artisan serve` nel primo.

---

## Account demo

| Ruolo | Email | Password |
|-------|-------|----------|
| Admin | `admin@instantkey.test` | `password` |
| Utente | `demo@instantkey.test` | `password` |

Codici sconto demo: `WELCOME10` (-10%), `SUMMER20` (-20%), `INSTANT5` (-5€), `BLACKFRIDAY` (-30%).

---

## Architettura della consegna istantanea

Il cuore del progetto è la pipeline di consegna chiave automatizzata implementata in `app/Services/KeyDeliveryService.php`:

1. L'utente conferma il pagamento (`POST /checkout`).
2. `CheckoutController` apre una transazione DB, crea l'`Order` e gli `OrderItems` (senza chiave assegnata).
3. Si simula la conferma del pagamento (Stripe/PayPal/Demo).
4. `KeyDeliveryService::deliverKeys()` blocca con `lockForUpdate()` una chiave dal pool, la marca come `sold`, e collega `key_id` all'`OrderItem`. Se il pool è esaurito, l'intera transazione rollback.
5. L'utente viene reindirizzato sulla pagina ordine dove può copiare la chiave.

In caso di chiave non funzionante, il `TicketController` permette all'utente di aprire un ticket; `KeyDeliveryService::replaceKey()` può assegnare una nuova chiave dal pool.

---

## Struttura del progetto

```
InstantKey/
├── app/
│   ├── Http/Controllers/      # Catalog, Product, Cart, Checkout, Order, Wishlist, Review, Ticket, Admin
│   ├── Http/Middleware/       # EnsureUserIsAdmin, HandleInertiaRequests
│   ├── Models/                # Product, KeyStock, Order, OrderItem, ...
│   └── Services/              # CartService, KeyDeliveryService
├── database/
│   ├── migrations/            # 11 migrations (incluso is_admin su users)
│   └── seeders/               # PlatformSeeder, GenreSeeder, ProductSeeder, DiscountCodeSeeder
├── resources/
│   ├── css/app.css            # Tailwind + utility classes (.btn-primary, .card, .game-card, ...)
│   ├── js/
│   │   ├── Components/        # GameCard
│   │   ├── Layouts/           # SiteLayout (header gaming + footer), GuestLayout
│   │   └── Pages/             # Home, Catalog, Products, Cart, Checkout, Orders, Wishlist, Tickets, Admin, Auth, Profile
│   └── views/app.blade.php
├── routes/
│   ├── web.php                # Tutte le route applicative
│   └── auth.php               # Route Breeze (login, register, ...)
├── tailwind.config.js         # Config con palette brand/accent + dark mode forzata
└── vite.config.js
```

---

## Funzionalità avanzate non incluse (roadmap)

Conforme alla documentazione, le seguenti feature sono **previste** ma non implementate (perché esulano dalle Fasi 1-2 del progetto didattico):

- 2FA TOTP (Laravel Fortify)
- Login OAuth Google/Steam (Laravel Socialite)
- Integrazione Stripe/PayPal reale (al momento sono placeholder UI; il flusso "demo" è funzionante)
- Notifiche email transazionali via Mailgun/SendGrid
- Meilisearch + Laravel Scout per ricerca full-text
- Code di lavoro (Laravel Queues + Supervisor)
- Cache Redis
- Pannello admin completo (CRUD prodotti/chiavi/ordini)
- Pipeline CI/CD GitHub Actions

---

## Comandi utili

```bash
# Reset completo del database con dati demo
php artisan migrate:fresh --seed

# Aggiungi più chiavi a uno specifico prodotto via tinker
php artisan tinker
>>> App\Models\KeyStock::factory()->count(50)->create(['product_id' => 1]);

# Pulizia cache
php artisan optimize:clear

# Lista route
php artisan route:list

# Build production
npm run build

# Dev server con hot reload
npm run dev
```

---

## Licenza

Progetto didattico realizzato per il corso di sviluppo web full-stack.
Architettura, scelte tecnologiche e schema DB derivati dal documento *INSTANT_KEY — Documentazione Finale*.
