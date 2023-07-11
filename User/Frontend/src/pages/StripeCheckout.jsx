import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "../Stripe.css";
import { useSelector } from "react-redux";
import CheckOutForm from "./CheckOutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51MqZf8SHRtYzz7CgVFpHxAZvhMkFNkXdXqW8bHcHRjE0tx809oAKjj5aGOlR9qZnQmNkZTzQT9K52CFgWyM56zTo00qSmc9oht");

export default function StripeCheckout() {
    const [clientSecret, setClientSecret] = useState("");
    const currentOrder = useSelector(state => state.orders.currentOrder)

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ totalAmount: currentOrder?.totalAmount, orderId: currentOrder?.id }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            <div className="stripe">
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckOutForm />
                    </Elements>
                )}
            </div>
        </div>
    );
}