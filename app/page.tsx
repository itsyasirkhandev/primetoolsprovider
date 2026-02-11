import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | PrimeToolsProvider - Premium Digital Subscriptions",
  description: "Premium digital subscriptions at unbeatable prices. Get genuine software subscriptions for LinkedIn Premium, Adobe Creative Cloud, Canva Pro, and more with 90% off.",
  alternates: {
    canonical: "https://primetoolsprovider.vercel.app/",
  },
};

import Image from "next/image";
import products from "@/data/proiducts.json";
import MobileNav from "@/components/MobileNav";
import FeedbackCarousel from "@/components/FeedbackCarousel";
import { ThemeToggle } from "@/components/ThemeToggle";

const paymentMethods = [
  { name: "JazzCash", iconType: "card" },
  { name: "Easypaisa", iconType: "mobile" },
  { name: "Bank Account", iconType: "bank" },
  { name: "Binance", iconType: "crypto" },
  { name: "OKX", iconType: "exchange" },
  { name: "PayPal", iconType: "paypal" },
  { name: "Other Crypto", iconType: "bitcoin" },
  { name: "Cards", iconType: "card" },
];

const paymentIcons: Record<string, React.ReactNode> = {
  card: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <line x1="7" y1="15" x2="7.01" y2="15" />
      <line x1="11" y1="15" x2="13" y2="15" />
    </svg>
  ),
  mobile: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  bank: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M12 10V4" />
      <path d="M8 4h8" />
      <path d="M8 14v2" />
      <path d="M12 14v2" />
      <path d="M16 14v2" />
    </svg>
  ),
  crypto: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M8 12h8" />
      <path d="M10 9l4 6" />
      <path d="M14 9l-4 6" />
    </svg>
  ),
  exchange: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  paypal: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
    </svg>
  ),
  bitcoin: (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.279 5.61m3.436 4.643l-.347 1.97m-1.563-8.864c-4.924-.869-6.14 6.025-1.216 6.894m1.216-6.894l3.94.694m-5.155 6.2L15.721 18.39" />
    </svg>
  ),
};

export default function Home() {
  return (
    <main className="grain-overlay relative">
      {/* ===== DESKTOP HEADER ===== */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <a href="#hero" className="text-xl font-bold font-heading tracking-wide">
            <span className="gold-shimmer">PrimeToolsProvider</span>
          </a>
          <nav className="flex items-center gap-8">
            {[
              { href: "#products", label: "Products" },
              { href: "#feedback", label: "Reviews" },
              { href: "#payment", label: "Payment" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-accent-text transition-colors duration-200 font-body"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="https://wa.me/923438782614"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn bg-accent hover:bg-accent-light text-foreground px-5 py-2 rounded-full text-sm font-medium transition-all dark:text-background"
            >
              Order Now
            </a>
          </nav>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Background elements */}
        <div className="absolute inset-0 dots-pattern" />
        <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-accent/3 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="animate-fade-in-up opacity-0 inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] sm:text-xs text-accent-text font-body">Trusted by 1000+ Customers</span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up opacity-0 delay-100 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-4 sm:mb-6">
            Premium Digital Tools
            <br />
            <span className="gold-shimmer">At Unbeatable Prices</span>
          </h1>

          <p className="animate-fade-in-up opacity-0 delay-200 text-sm sm:text-base md:text-lg lg:text-xl text-muted max-w-xl md:max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 font-body leading-relaxed px-2">
            Get genuine subscriptions for LinkedIn Premium, Adobe CC, Canva Pro, and more &mdash; save up to 90% on premium software.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up opacity-0 delay-300 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2">
            <a
              href="https://wa.me/923438782614"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-foreground font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm transition-all dark:text-background"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 border-2 border-border bg-background text-foreground px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium hover:border-accent hover:text-accent-text transition-all dark:bg-surface-light"
            >
              Browse Products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up opacity-0 delay-500 mt-10 sm:mt-12 md:mt-16 grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-lg mx-auto px-2">
            {[
              { value: "1000+", label: "Happy Clients" },
              { value: "90%", label: "Savings" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-text font-heading">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted mt-1 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="relative py-16 sm:py-20 md:py-28 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-accent-text text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-body font-medium">Our Collection</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 mb-3 sm:mb-4">
              Premium <span className="gold-shimmer">Subscriptions</span>
            </h2>
            <p className="text-muted max-w-sm sm:max-w-xl mx-auto font-body text-sm sm:text-base">
              Genuine premium subscriptions at unbeatable prices. All products come with full activation support.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {products.map((product, i) => (
              <div
                key={i}
                className="product-card group flex flex-col bg-surface-light border border-border rounded-xl sm:rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square bg-surface overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.product_name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Discount badge */}
                  {product.discount && (
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-accent-badge text-background text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                      {product.discount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-3 sm:p-4">
                  <h3 className="font-heading font-semibold text-sm sm:text-base leading-tight mb-2 sm:mb-3 group-hover:text-accent-text transition-colors line-clamp-2">
                    {product.product_name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-accent-text font-bold text-lg sm:text-xl font-heading">{product.price}</span>
                      {product.original_price && (
                        <span className="text-muted text-xs sm:text-sm line-through ml-1 sm:ml-2">{product.original_price}</span>
                      )}
                    </div>
                  </div>
                  {/* Variations */}
                  {product.variations && product.variations.length > 0 && product.variations[0].option !== "Duration-based variants" && product.variations[0].option !== "Subscription Tiers" && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {product.variations.map((v, vi) => (
                          <span key={vi} className="text-[10px] sm:text-xs bg-surface border border-border text-foreground px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg font-body font-medium">
                            {v.option}: <span className="text-accent-text font-semibold">{"price" in v ? v.price : v.price_range}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Spacer to push button to bottom */}
                  <div className="flex-1" />
                  {/* Order button */}
                  <a
                    href={`https://wa.me/923438782614?text=${encodeURIComponent(`Hi, I'm interested in: ${product.product_name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 bg-accent text-background border border-accent py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium hover:bg-accent-light hover:text-background transition-all"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK SECTION ===== */}
      <section id="feedback" className="relative py-16 sm:py-20 md:py-28 bg-surface-light/50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-accent-text text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-body font-medium">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 mb-3 sm:mb-4">
              What Our <span className="gold-shimmer">Clients Say</span>
            </h2>
            <p className="text-muted max-w-sm sm:max-w-xl mx-auto font-body text-sm sm:text-base">
              Real screenshots from real customers. See why thousands trust PrimeToolsProvider for their premium subscriptions.
            </p>
          </div>

          <FeedbackCarousel />
        </div>
      </section>

      {/* ===== PAYMENT METHODS SECTION ===== */}
      <section id="payment" className="relative py-16 sm:py-20 md:py-28 min-h-[50vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-accent-text text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-body font-medium">Easy Checkout</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 mb-3 sm:mb-4">
              Payment <span className="gold-shimmer">Methods</span>
            </h2>
            <p className="text-muted max-w-sm sm:max-w-xl mx-auto font-body text-sm sm:text-base">
              We accept a wide range of payment methods to make your purchase as convenient as possible.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="group bg-surface-light border border-border rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center hover:border-accent/30 transition-all duration-300 hover:bg-surface-lighter"
              >
                <div className="mb-2 sm:mb-3 flex justify-center text-accent h-8 sm:h-10 w-8 sm:w-10">{paymentIcons[method.iconType]}</div>
                <span className="text-[10px] sm:text-xs md:text-sm font-body text-foreground group-hover:text-accent-text transition-colors">
                  {method.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="relative py-16 sm:py-20 md:py-28 bg-surface-light/50 min-h-[50vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-accent-text text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-body font-medium">Get In Touch</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 mb-3 sm:mb-4">
              Contact <span className="gold-shimmer">Us</span>
            </h2>
            <p className="text-muted max-w-sm sm:max-w-xl mx-auto font-body text-sm sm:text-base">
              Have questions? Reach out to us anytime. We&apos;re here to help you find the best deal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/923438782614"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface-light border border-border rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:border-accent/30 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#22c55e">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-base sm:text-lg mb-1">WhatsApp</h3>
              <p className="text-muted font-body text-xs sm:text-sm">+92 343 8782614</p>
              <span className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-accent-text font-body">Tap to chat &rarr;</span>
            </a>

            {/* Email Card */}
            <a
              href="mailto:providerprimetools@gmail.com"
              className="group bg-surface-light border border-border rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:border-accent/30 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-base sm:text-lg mb-1">Email</h3>
              <p className="text-muted font-body text-xs sm:text-sm">providerprimetools@gmail.com</p>
              <span className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-accent-text font-body">Send email &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-8 sm:py-10 pb-20 sm:pb-24 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <span className="font-heading font-bold text-base sm:text-lg gold-shimmer">PrimeToolsProvider</span>
              <p className="text-muted text-[10px] sm:text-xs font-body mt-1">Premium digital subscriptions at unbeatable prices.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a href="#products" className="text-[10px] sm:text-xs text-muted hover:text-accent-text transition-colors font-body">Products</a>
              <a href="#feedback" className="text-[10px] sm:text-xs text-muted hover:text-accent-text transition-colors font-body">Reviews</a>
              <a href="#payment" className="text-[10px] sm:text-xs text-muted hover:text-accent-text transition-colors font-body">Payment</a>
              <a href="#contact" className="text-[10px] sm:text-xs text-muted hover:text-accent-text transition-colors font-body">Contact</a>
            </div>
          </div>
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border text-center">
            <p className="text-[10px] sm:text-xs text-muted font-body">
              &copy; {new Date().getFullYear()} PrimeToolsProvider. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </main>
  );
}
