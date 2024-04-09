'use client';
import { ReactNode } from 'react'
import { CartProvider as USCProvider } from "use-shopping-cart"

export default function CardProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl="https://landi-academy.pl/kurs/kurs-tajemnice-nanoplastii"
      cancelUrl="https://landi-academy.pl/kurs"
      currency="pln"
      billingAddressCollection={false}
      shouldPersist={true}
      language="pl-PL"
    >
      {children}
    </USCProvider>
  )
}