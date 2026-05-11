import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import SiteLayout from '@/Layouts/SiteLayout';
import Stepper, { Step } from '@/Components/react-bits/Stepper';

export default function CheckoutIndex({ cart }) {
    const form = useForm({ payment_method: 'demo' });
    const method = form.data.payment_method;
    const setMethod = (value) => form.setData('payment_method', value);
    const [payStep, setPayStep] = useState(1);

    const submit = (e) => {
        e.preventDefault();
        if (payStep < 2) return;
        form.post(route('checkout.process'));
    };

    return (
        <SiteLayout>
            <Head title="Checkout" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-4xl font-extrabold mb-2">Pagamento sicuro</h1>
                <p className="text-slate-400 mb-8">Le tue chiavi verranno consegnate immediatamente dopo il pagamento.</p>

                <form id="checkout-form" onSubmit={submit}>
                    <Stepper
                        onStepChange={setPayStep}
                        nextButtonText="Continua"
                        backButtonText="Indietro"
                        lastStepSubmit
                        submitButtonText={`Paga € ${Number(cart.total).toFixed(2)}`}
                        submitProcessing={form.processing}
                        stepCircleContainerClassName="border-cyan-500/10 shadow-cyan-500/10"
                    >
                        <Step>
                            <div className="space-y-6">
                                <div className="card">
                                    <h2 className="font-bold text-lg mb-4">Metodo di pagamento</h2>
                                    <div className="space-y-3">
                                        <PaymentOption
                                            selected={method === 'stripe'}
                                            onClick={() => setMethod('stripe')}
                                            title="Carta di credito / Debito"
                                            subtitle="Visa, Mastercard, American Express, Google Pay"
                                            icon={<CardIcon />}
                                        />
                                        <PaymentOption
                                            selected={method === 'paypal'}
                                            onClick={() => setMethod('paypal')}
                                            title="PayPal"
                                            subtitle="Paga con il tuo conto PayPal"
                                            icon={<PaypalIcon />}
                                        />
                                        <PaymentOption
                                            selected={method === 'demo'}
                                            onClick={() => setMethod('demo')}
                                            title="Modalità Demo"
                                            subtitle="Solo per scopi didattici — pagamento simulato"
                                            icon={<DemoIcon />}
                                            badge="DEMO"
                                        />
                                    </div>

                                    {method === 'stripe' && (
                                        <div className="mt-6 p-4 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-400">
                                            <strong className="text-slate-200">Modalità Stripe — placeholder.</strong> In produzione qui verrebbe integrato il widget Stripe Elements per inserire i dati della carta in modo sicuro.
                                        </div>
                                    )}
                                    {method === 'paypal' && (
                                        <div className="mt-6 p-4 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-400">
                                            <strong className="text-slate-200">Modalità PayPal — placeholder.</strong> In produzione verrai reindirizzato al portale PayPal per autorizzare il pagamento.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Step>
                        <Step>
                            <div className="space-y-6">
                                <div className="card">
                                    <h2 className="font-bold text-lg mb-4">Riepilogo prodotti</h2>
                                    <div className="divide-y divide-slate-800">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                                                <div className="w-12 h-14 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                                                    {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                                    <p className="text-xs text-slate-400">x{item.quantity} · {item.platform}</p>
                                                </div>
                                                <p className="font-semibold">€ {Number(item.subtotal).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="card">
                                    <h2 className="font-bold text-lg mb-4">Totale</h2>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Subtotale</span>
                                            <span>€ {Number(cart.subtotal).toFixed(2)}</span>
                                        </div>
                                        {cart.discount && (
                                            <div className="flex justify-between text-emerald-400">
                                                <span>Sconto ({cart.discount.code})</span>
                                                <span>−€ {Number(cart.discount.amount).toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-slate-800 pt-3 mt-3 flex justify-between text-2xl font-extrabold">
                                            <span>Totale</span>
                                            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">
                                                € {Number(cart.total).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="mt-6 space-y-2 text-xs text-slate-400">
                                        <li className="flex gap-2">
                                            <CheckIcon />
                                            Consegna chiave in &lt; 5 secondi
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckIcon />
                                            Protezione antifrode Stripe
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckIcon />
                                            Sostituzione gratuita se la chiave non funziona
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Step>
                    </Stepper>
                </form>
            </div>
        </SiteLayout>
    );
}

function PaymentOption({ selected, onClick, title, subtitle, icon, badge }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left p-4 rounded-lg border transition flex items-center gap-4 ${selected ? 'border-brand-500 bg-brand-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-600'}`}
        >
            <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">{icon}</div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{title}</p>
                    {badge && <span className="badge-warning text-[10px]">{badge}</span>}
                </div>
                <p className="text-xs text-slate-400">{subtitle}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${selected ? 'border-brand-500 bg-brand-500' : 'border-slate-600'}`}>
                {selected && <span className="w-2 h-2 rounded-full bg-white" />}
            </div>
        </button>
    );
}

function CardIcon() {
    return <svg className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/></svg>;
}
function PaypalIcon() {
    return <svg className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>;
}
function DemoIcon() {
    return <svg className="h-6 w-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/></svg>;
}
function CheckIcon() {
    return <svg className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>;
}
