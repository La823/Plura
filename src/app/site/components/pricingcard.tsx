import { pricingCards } from "@/lib/utils";

export default function PricingPage() {
  return (
    <section className="py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Choose your plan</h2>
        <p className="text-muted-foreground mb-10">
          Simple, transparent pricing that grows with your business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingCards.map((plan, index) => (
            <div key={index} className="border rounded-2xl p-6 shadow-lg bg-card">
              <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-4xl font-bold">
                {plan.price} <span className="text-base font-normal">/ {plan.duration}</span>
              </p>
              <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span>✔️</span> <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
