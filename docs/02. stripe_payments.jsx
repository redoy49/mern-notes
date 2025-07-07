FRONTEND: (React.js) Custom Stripe Payment Flow (Manual Way)

01.Install stripe package 
npm install @stripe/react-stripe-js @stripe/stripe-js

02.Create Custom Payment Form Wrapper | Payment.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Load Stripe with your publishable key
const stripePromise = loadStripe("your_publishable_key_here");

const App = () => {
  return (
    <div>
      <h1>Stripe Manual Payment Example</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default App;

03. Manual Payment Flow with Loading | CheckoutForm.jsx 
import React, { useEffect, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // Step 1: Fetch clientSecret from backend when component mounts
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        // Request payment intent from backend with additional metadata
        const res = await axios.post("http://localhost:5000/create-payment-intent", {
          amountInCents: 500, // $5.00
          parcelId: "parcel_1234",
          customerId: "user_001",
          notes: "Birthday Gift",
        });

        console.log("Response from Intent", res);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error fetching clientSecret:", err.message);
      }
    };

    fetchClientSecret();
  }, []);

   // Step 2a: Create payment method
    const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (pmError) {
      alert("Error: " + pmError.message);
      setLoading(false);
      return;
    }

    // Step 2b: Confirm the payment using created paymentMethod.id
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      alert("Payment failed: " + confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("🎉 Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay $5"}
      </button>
    </form>
  );
};
export default CheckoutForm;

04. Run the React Frontend ===
npm run dev   (if using Vite)
npm start     (if using CRA)

05. Use this test card:
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits

BACKEND: Create Payment Intent

01.Install required packages
npm install express cors stripe dotenv

02. Environment Setup | In .env file
STRIPE_SECRET_KEY=your_secret_key_here

03. POST: Create Payment Intent 
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
  const { amountInCents, parcelId, customerId } = req.body;

  if (!amountInCents) {
    return res.status(400).json({ error: "Amount is required" });
  }

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
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

04. Run the Server Code
nodemon index.js
