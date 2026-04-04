import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { RefreshCw, Lock } from 'lucide-react';

const CheckoutForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
            redirect: 'if_required',
        });

        if (error) {
            setErrorMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            onSuccess();
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                <PaymentElement />
            </div>

            {errorMessage && (
                <div className="text-red-500 text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                    {errorMessage}
                </div>
            )}

            <button
                disabled={isProcessing || !stripe || !elements}
                className={`w-full py-3 px-4  font-bold text-white transition-all flex items-center justify-center gap-2 
                    ${isProcessing ? 'bg-gray-400' : 'bg-[#D35400] hover:bg-[#E67E22] active:scale-[0.98] '}`}
            >
                {isProcessing ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        Confirmer le paiement
                    </>
                )}
            </button>

            <p className="text-[10px] text-center text-gray-400">
                Vos données sont cryptées et sécurisées par Stripe.
            </p>
        </form>
    );
};

export default CheckoutForm;