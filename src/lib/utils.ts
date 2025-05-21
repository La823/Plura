import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const pricingCards = [
  {
    title: "Starter",
    price: "$9",
    duration: "per month",
    features: [
      "1 Workspace",
      "Up to 3 Clients",
      "Basic Analytics",
      "Email Support"
    ]
  },
  {
    title: "Professional",
    price: "$29",
    duration: "per month",
    features: [
      "Unlimited Workspaces",
      "Unlimited Clients",
      "Advanced Analytics",
      "Priority Support",
      "Team Collaboration"
    ]
  },
  {
    title: "Agency",
    price: "$79",
    duration: "per month",
    features: [
      "All Pro Features",
      "White-label Branding",
      "Dedicated Account Manager",
      "Custom Integrations",
      "24/7 Premium Support"
    ]
  }
]
