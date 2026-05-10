import { Head } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';

const faqs = [
    {
        q: 'Quanto tempo ci vuole per ricevere la chiave?',
        a: 'Meno di 5 secondi dal pagamento confermato. La pipeline è completamente automatizzata: appena il gateway approva il pagamento, una chiave dal nostro pool viene assegnata al tuo ordine e ti viene mostrata in pagina + inviata via email.',
    },
    {
        q: 'Su quali piattaforme posso usare le chiavi?',
        a: 'Steam, Epic Games Store, GOG, Origin/EA, Battle.net, PlayStation Network, Xbox Live e Nintendo eShop. Ogni prodotto indica chiaramente la piattaforma di riferimento.',
    },
    {
        q: 'Le chiavi sono originali e legittime?',
        a: 'Sì. Acquistiamo le chiavi durante i sale stagionali (Steam Sale, Humble Bundle, ecc.) o da mercati internazionali dove il prezzo in valuta locale è inferiore al cambio euro. Ogni chiave viene verificata prima di essere immessa nello stock.',
    },
    {
        q: 'Cosa succede se la chiave non funziona?',
        a: 'Apri un ticket dalla pagina del tuo ordine. Il sistema verifica automaticamente la validità del codice e, se invalida, ti consegniamo una sostituzione gratuita immediata.',
    },
    {
        q: 'Quali metodi di pagamento accettate?',
        a: 'Stripe (carte di credito/debito Visa, Mastercard, Amex e Google Pay) e PayPal. Per il progetto didattico è disponibile anche una modalità Demo per testare tutto il flusso.',
    },
    {
        q: 'Posso ricevere notifiche quando il prezzo scende?',
        a: 'Sì! Aggiungi i giochi alla tua wishlist e imposta una soglia di prezzo. Riceverai una notifica email/push quando il prezzo scenderà sotto la soglia.',
    },
    {
        q: 'Le mie informazioni di pagamento sono sicure?',
        a: 'Assolutamente. Tutti i dati sensibili passano attraverso Stripe/PayPal e non vengono mai memorizzati sui nostri server. Il sito utilizza HTTPS/TLS, CSRF protection e supporta 2FA con TOTP.',
    },
];

export default function Faq() {
    const [open, setOpen] = useState(0);

    return (
        <SiteLayout>
            <Head title="FAQ" />

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-5xl font-extrabold mb-2">FAQ</h1>
                <p className="text-slate-400 mb-10">Le risposte alle domande più frequenti</p>

                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <div key={i} className="card !p-0 overflow-hidden">
                            <button
                                onClick={() => setOpen(open === i ? -1 : i)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition"
                            >
                                <span className="font-semibold pr-4">{f.q}</span>
                                <svg
                                    className={`h-5 w-5 text-slate-400 shrink-0 transition ${open === i ? 'rotate-180' : ''}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </button>
                            {open === i && (
                                <div className="px-5 pb-5 text-slate-300 animate-fade-in">
                                    {f.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </SiteLayout>
    );
}
