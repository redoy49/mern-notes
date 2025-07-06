Frontend (React.js) — Custom Stripe Payment Flow

01.Install stripe package 
npm install @stripe/react-stripe-js @stripe/stripe-js

02.CREATE CUSTOM PAYMENT FORM
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Load Stripe with publishable key
const stripePromise = loadStripe("your_publishable_key_here");

function App() {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;

03. CheckoutForm.jsx Component 
import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  //Fetch clientSecret from backend
  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 }), // $5.00
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay $5
      </button>
    </form>
  );
};

export default CheckoutForm;

04. RUN THE FRONTEND CODE 
npm run dev

05. Use this test card:
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits


BACKEND: CREATE PAYMENT INTENT

01.Install required packages
npm install express cors stripe dotenv

02. Environment Setup
STRIPE_SECRET_KEY=your_secret_key_here

03. Create Payment Intent 
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // example: 500 for $5.00
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

04. Run the Client Code
nodemon index.js
