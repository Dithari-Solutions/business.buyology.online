import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BenefitIcon from "@/components/BenefitIcon";
import { partnerships } from "@/lib/qualification";

const introduction = "Partner with Buyology to bring quality-checked refurbished laptops and tablets to more customers through retail, resale and business distribution.";
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "Buyology Business | Stockist & Retail Partnerships", description: introduction },
};

const benefits = [
  { icon: "quality", title: "Quality-checked devices", body: "Access refurbished laptops and tablets inspected and tested for work, learning and everyday use." },
  { icon: "sourcing", title: "Product sourcing", body: "Discuss your inventory needs and available laptops and tablets with Buyology." },
  { icon: "terms", title: "Agreed commercial terms", body: "Discuss commercial terms for your business, subject to a partnership agreement." },
  { icon: "delivery", title: "Delivery & fulfilment", body: "Hold stock locally and fulfil Buyology online orders through the stockist partnership model." },
  { icon: "warranty", title: "Warranty & after-sales", body: "Product-specific warranty terms, with support for claims through Buyology’s support team." },
] as const;

export default function Home() {
  const schema = {
    "@context": "https://schema.org", "@type": "Organization", name: "Buyology",
    url: "https://business.buyology.online", logo: "https://business.buyology.online/logo-light.png",
    sameAs: ["https://buyology.online", "https://instagram.com/buyology.online"],
    description: introduction,
    contactPoint: { "@type": "ContactPoint", email: "support@buyology.online", contactType: "business enquiries" },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">BUYOLOGY PARTNER PROGRAMME</p>
          <h1>Good technology.<br />Great potential.<br /><span>Your next chapter.</span></h1>
          <p className="hero-description">{introduction}</p>
          <div className="hero-actions"><Link className="button" href="/become-partner/">Apply for partnership</Link><a className="text-link" href="#why-buyology">Why Buyology?</a></div>
          <p className="hero-note">For stockists, retailers and B2B distributors.</p>
        </div>
        <div className="hero-visual">
          <div className="visual-label">A SECOND LIFE FOR TECH.<br /><strong>A NEW OPPORTUNITY FOR YOU.</strong></div>
          <Image src="/partner-laptop.jpg" alt="Laptop representing the refurbished technology available through Buyology" width={1200} height={900} priority />
          <div className="visual-caption"><span>BUY THE WHY</span><span>Laptops & tablets</span></div>
        </div>
      </div>
    </section>
    <div className="brand-strip"><div className="container"><span>ONE BRAND. MORE WAYS TO GROW.</span><p>Local inventory</p><p>Retail opportunity</p><p>Business distribution</p></div></div>
    <section id="why-buyology" className="section container">
      <div className="section-heading"><p className="eyebrow">A PARTNERSHIP WITH PURPOSE</p><h2>Why Partner with Buyology?</h2><p>A focused product range. Local business knowledge. A shared opportunity to grow.</p></div>
      <div className="benefit-grid">{benefits.map(benefit => <article key={benefit.icon} className="benefit"><span className="benefit-icon"><BenefitIcon name={benefit.icon} /></span><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}</div>
    </section>
    <section className="partnership-section"><div className="container">
      <div className="section-heading"><p className="eyebrow">FIND YOUR FIT</p><h2>One ambition.<br />Your way to partner.</h2><p>Choose the partnership that fits your business and tell us about your plans.</p></div>
      <div className="partnership-grid">{partnerships.map(p => <article className="partnership-card" key={p.value}><span className="card-number">{p.number}</span><h3>{p.title}</h3><p>{p.description}.</p><Link href={`/become-partner/?interest=${p.value}`}>Explore this partnership <span aria-hidden="true">↗</span></Link></article>)}</div>
    </div></section>
    <section className="section container readiness">
      <div><p className="eyebrow">BUILDING TOGETHER</p><h2>Local inventory.<br /><span>Shared ambition.</span></h2></div>
      <div className="readiness-copy"><p>We’re looking for partners with the business capability, investment capacity and sales ambition to hold inventory locally and grow the business together.</p><p>Your local knowledge and customer relationships are the starting point. Tell us how a Buyology partnership could fit your business.</p></div>
    </section>
    <section className="closing"><div className="container"><p className="eyebrow">LET’S GROW TOGETHER</p><h2>Let’s put good technology<br />in more hands.</h2><Link className="button" href="/become-partner/">Apply for partnership</Link></div></section>
  </>;
}
