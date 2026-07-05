import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import {
  Menu, X, ArrowRight, Phone, Mail, MapPin, ShieldCheck, Award, Leaf,
  Package, Factory, Sparkles, Star, Quote, CheckCircle2, Truck, Ruler, MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

import dpLogoAsset from "@/assets/dp-logo.asset.json";
import heroBag from "@/assets/hero-bag.jpg";
import bagMockup from "@/assets/bag-mockup.jpg";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SIZES = ["00", "0", "1", "2", "3", "5", "7", "10"];

const PROCESS = [
  { title: "Resin Melting", desc: "Virgin LLDPE resin melted at precision temperature." },
  { title: "Die Shaping", desc: "Molten polymer routed through calibrated dies." },
  { title: "Blown Extrusion", desc: "Uniform film bubbles inflated to target gauge." },
  { title: "Film Conversion", desc: "Cooled film flattened, wound and prepared." },
  { title: "Cutting & Sealing", desc: "Cut to size, heat-sealed and quality-checked." },
];

const CERTS = [
  { title: "GST Registered", meta: "GSTIN 29BPTPS0788C1Z7", icon: ShieldCheck },
  { title: "Udyam / MSME", meta: "Micro Enterprise · UDYAM-KR-03-0631643", icon: Award },
  { title: "KSPCB Certified", meta: "Consent for Operation — valid through 2040", icon: Leaf },
];

const REASONS = [
  { title: "Quality Assurance", desc: "Batch-tested film gauge, consistent silky finish, zero-defect commitment.", icon: CheckCircle2 },
  { title: "Custom Sizing", desc: "Full spectrum from cover size 00 to 10, tailored specs on request.", icon: Ruler },
  { title: "Reliable Supply", desc: "16 years of on-time delivery to 30+ repeat B2B partners.", icon: Truck },
  { title: "Eco-conscious", desc: "KSPCB-compliant manufacturing under Water & Air Acts through 2040.", icon: Leaf },
];

const TESTIMONIALS = [
  { quote: "A dependable partner for over a decade. Consistency in film quality and turnaround we can plan around.", author: "Procurement Head", org: "FMCG Distributor" },
  { quote: "Dharshana's silky bags hold their finish beautifully. Our packaging line runs smoother because of it.", author: "Operations Lead", org: "Retail Chain" },
  { quote: "Straightforward, responsive, and always on-spec. Exactly what a manufacturing partner should be.", author: "Founder", org: "Regional Grocer" },
];

function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative rounded-lg overflow-hidden ring-1 ring-[oklch(0.82_0.13_82/0.3)]"
        style={{ width: size, height: size, boxShadow: "0 6px 20px -6px oklch(0.82 0.13 82 / 0.35)" }}
      >
        <img src={dpLogoAsset.url} alt="DP monogram" className="w-full h-full object-cover" />
      </div>
      <div className="leading-tight">
        <div className="font-display text-[15px] tracking-[0.22em] text-gold-gradient font-semibold">DHARSHANA</div>
        <div className="font-display text-[11px] tracking-[0.35em] text-muted-foreground">POLYMERS</div>
      </div>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-5 md:px-8 pt-4">
        <nav className="glass-card rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
          <a href="#home" className="shrink-0"><Logo /></a>
          <ul className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-foreground/80 hover:text-gold-gradient transition-colors relative group">
                  {n.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-gradient transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden md:inline-flex btn-gold btn-gold-hover sheen rounded-xl px-5 py-2.5 text-sm">
              Get a Quote
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground p-2" aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="lg:hidden glass-card mt-2 rounded-2xl p-4 space-y-2">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/5">
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-gold rounded-xl px-4 py-2.5 text-sm block text-center">Get a Quote</a>
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-onyx-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full bg-[oklch(0.82_0.13_82/0.12)] blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[oklch(0.55_0.11_65/0.18)] blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="lg:col-span-6"
        >
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 text-xs tracking-widest uppercase text-[oklch(0.9_0.08_88)]">
            <Sparkles size={13} /> Est. 2009 · Bengaluru
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-foreground">
            <span className="block">16 Years of</span>
            <span className="block text-gold-gradient italic">Trusted LLDPE</span>
            <span className="block">Manufacturing</span>
          </h1>
          <div className="mt-6 gold-divider max-w-xs" />
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Premium <span className="text-foreground">LLDPE Silky Bags</span>, engineered with precision-blown extrusion in Bengaluru. Serving 30+ long-term B2B partners.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#products" className="btn-gold btn-gold-hover sheen rounded-xl px-7 py-3.5 inline-flex items-center gap-2">
              View Products <ArrowRight size={17} />
            </a>
            <a href="#contact" className="glass-card rounded-xl px-7 py-3.5 inline-flex items-center gap-2 hover:bg-white/10 transition-colors">
              Get a Quote
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          <motion.div style={{ y, rotate, scale }} className="relative aspect-square max-w-[560px] mx-auto">
            <div className="absolute inset-8 rounded-full bg-gold-gradient opacity-30 blur-3xl animate-glow-pulse" />
            <div className="absolute inset-0 rounded-[2rem] glass-gold overflow-hidden">
              <div className="absolute inset-0 animate-float-slow">
                <img src={heroBag} alt="Glossy LLDPE silky bag" className="w-full h-full object-cover" width={1280} height={1280} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 hidden md:block">
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground">FILM GAUGE</div>
              <div className="font-display text-2xl text-gold-gradient">Silky Finish</div>
            </div>
            <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-5 py-3 hidden md:block">
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground">SIZES</div>
              <div className="font-display text-2xl text-gold-gradient">00 — 10</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { k: "16+", v: "Years Experience" },
    { k: "30+", v: "Permanent Customers" },
    { k: "GST & MSME", v: "Registered Enterprise" },
    { k: "KSPCB", v: "Certified · Valid 2040" },
  ];
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 md:p-7 relative overflow-hidden sheen group"
              style={{ boxShadow: "var(--shadow-glass)" }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gold-gradient opacity-10 blur-2xl group-hover:opacity-25 transition-opacity" />
              <div className="font-display text-4xl md:text-5xl text-gold-gradient">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground tracking-wide">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * 10}deg) rotateY(${px * 12}deg) translateZ(0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; };
  return (
    <div ref={ref} onMouseMove={handle} onMouseLeave={leave} className={`tilt-card ${className}`}>
      {children}
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.35em] text-gold-gradient uppercase">Product Range</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            LLDPE Silky Bags <span className="italic text-gold-gradient">across every size</span>
          </h2>
          <div className="mt-5 gold-divider max-w-[8rem]" />
          <p className="mt-5 text-muted-foreground">
            A full cover-size spectrum for retail, wholesale, agriculture and industrial packaging — each roll finished to Dharshana's silky-gauge standard.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {SIZES.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard className="glass-card rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:shadow-[var(--shadow-gold)]">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity">
                  <img src={bagMockup} alt="" loading="lazy" className="w-full h-full object-cover" width={768} height={768} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>
                <div className="relative aspect-[4/5] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="text-[10px] tracking-[0.3em] text-muted-foreground">SIZE</div>
                    <Package size={16} className="text-[oklch(0.82_0.13_82)]" />
                  </div>
                  <div>
                    <div className="font-display text-6xl md:text-7xl text-gold-gradient leading-none">{s}</div>
                    <div className="mt-3 text-xs text-foreground/80">LLDPE Silky · durable, flexible, moisture-resistant</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-xs tracking-[0.35em] text-gold-gradient uppercase">Manufacturing</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">
              From resin to <span className="italic text-gold-gradient">finished film</span>
            </h2>
          </div>
          <Factory className="text-[oklch(0.82_0.13_82)] hidden md:block" size={44} />
        </div>
        <div className="mt-4 gold-divider" />

        <div className="mt-14 relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.13_82/0.5)] to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center font-display text-xl text-[oklch(0.12_0.01_60)] shadow-[var(--shadow-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-5 glass-card rounded-2xl p-5 text-center">
                  <div className="font-display text-xl">{p.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.35em] text-gold-gradient uppercase">Compliance</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Certified. Compliant. <span className="italic text-gold-gradient">Accountable.</span>
          </h2>
          <div className="mt-5 gold-divider max-w-[8rem]" />
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {CERTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltCard className="glass-card rounded-3xl p-8 relative overflow-hidden hover:shadow-[var(--shadow-gold)] transition-shadow">
                  <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gold-gradient opacity-15 blur-3xl" />
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-[var(--shadow-gold)]">
                      <Icon className="text-[oklch(0.12_0.01_60)]" size={28} />
                    </div>
                    <h3 className="mt-6 font-display text-2xl">{c.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.meta}</p>
                    <div className="mt-6 gold-divider" />
                    <div className="mt-4 text-[11px] tracking-[0.25em] uppercase text-[oklch(0.9_0.08_88)]">Verified</div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.35em] text-gold-gradient uppercase">Why Dharshana</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Built on <span className="italic text-gold-gradient">reliability</span>, refined by craft.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 sheen group hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl glass-gold flex items-center justify-center">
                  <Icon size={20} className="text-[oklch(0.9_0.08_88)]" />
                </div>
                <h3 className="mt-5 font-display text-xl">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <div className="text-xs tracking-[0.35em] text-gold-gradient uppercase">Customer Trust</div>
        <div className="mt-3 font-display text-lg text-muted-foreground">Trusted by 30+ long-term business partners</div>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-10 glass-card rounded-3xl p-10 md:p-14 relative"
        >
          <Quote className="mx-auto text-[oklch(0.82_0.13_82)]" size={38} />
          <p className="mt-6 font-display text-2xl md:text-3xl leading-snug italic">"{t.quote}"</p>
          <div className="mt-8 flex items-center justify-center gap-1 text-[oklch(0.9_0.08_88)]">
            {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={15} fill="currentColor" />)}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="text-foreground">{t.author}</span> · {t.org}
          </div>
        </motion.div>
        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-gold-gradient" : "w-4 bg-white/20"}`}
              aria-label={`Testimonial ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ContactErrors = Partial<Record<"name" | "size" | "qty", string>>;

function Contact() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (fd: FormData): ContactErrors => {
    const next: ContactErrors = {};
    const name = String(fd.get("name") ?? "").trim();
    const size = String(fd.get("size") ?? "");
    const qtyRaw = String(fd.get("qty") ?? "").trim();
    const qty = Number(qtyRaw);
    if (!name) next.name = "Please enter your name.";
    else if (name.length > 100) next.name = "Name must be under 100 characters.";
    if (!size) next.size = "Please select a bag size.";
    if (!qtyRaw) next.qty = "Please enter a quantity.";
    else if (!Number.isFinite(qty) || qty < 1) next.qty = "Quantity must be at least 1.";
    return next;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const next = validate(fd);
    setErrors(next);
    const count = Object.keys(next).length;
    if (count > 0) {
      const firstKey = Object.keys(next)[0];
      setStatus(`Please fix ${count} field${count > 1 ? "s" : ""} before submitting.`);
      const el = form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    setSubmitting(true);
    setStatus("Sending your enquiry…");

    const name = String(fd.get("name") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const bag_size = String(fd.get("size") ?? "");
    const quantity = Number(String(fd.get("qty") ?? "").trim());
    const message = String(fd.get("msg") ?? "").trim();

    const { error } = await supabase.from("enquiries").insert({
      name,
      company: company || null,
      bag_size,
      quantity,
      message: message || null,
    });

    setSubmitting(false);

    if (error) {
      setStatus("We couldn't save your enquiry. Please try again or WhatsApp us.");
      toast.error("Something went wrong", { description: "Please try again in a moment." });
      return;
    }

    setStatus("Quote request received. Our team will reach out within 1 business day.");
    toast.success("Quote request received", { description: "Our team will reach out within 1 business day." });
    form.reset();
  };


  return (
    <section id="contact" className="relative py-24" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="text-xs tracking-[0.35em] text-gold-gradient uppercase">Contact</div>
            <h2 id="contact-heading" className="mt-4 font-display text-4xl md:text-5xl">
              Request a <span className="italic text-gold-gradient">Quote</span>
            </h2>
            <p className="mt-4 text-muted-foreground">Tell us your bag size, quantity and timeline. We'll respond with pricing and lead time.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center shrink-0" aria-hidden="true">
                <Phone size={16} className="text-[oklch(0.12_0.01_60)]" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">Phone</div>
                <a href="tel:+917019009508" className="text-foreground hover:text-gold-gradient rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0f]">+91 70190 09508</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center shrink-0" aria-hidden="true">
                <Mail size={16} className="text-[oklch(0.12_0.01_60)]" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">Email</div>
                <a href="mailto:lohithshekarbs@gmail.com" className="text-foreground hover:text-gold-gradient break-all rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0f]">lohithshekarbs@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-gradient flex items-center justify-center shrink-0" aria-hidden="true">
                <MapPin size={16} className="text-[oklch(0.12_0.01_60)]" />
              </div>
              <div>
                <div className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">Factory</div>
                <address className="not-italic text-sm text-foreground/90">
                  No. 281, 1st B Cross, Kasturi Badavani,<br />
                  Rajagopal Nagar Main Road,<br />
                  Bengaluru – 560058, Karnataka
                </address>
              </div>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          aria-labelledby="contact-heading"
          aria-describedby="contact-form-status"
          className="lg:col-span-3 glass-card rounded-3xl p-8 md:p-10 space-y-5"
        >
          <div
            id="contact-form-status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {status}
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Field id="contact-name" label="Name" required error={errors.name}>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                maxLength={100}
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={inputCls}
                placeholder="Your full name"
              />
            </Field>
            <Field id="contact-company" label="Company">
              <input
                id="contact-company"
                name="company"
                autoComplete="organization"
                maxLength={120}
                className={inputCls}
                placeholder="Business name"
              />
            </Field>
            <Field id="contact-size" label="Bag Size Required" required error={errors.size}>
              <select
                id="contact-size"
                name="size"
                required
                aria-required="true"
                aria-invalid={!!errors.size}
                aria-describedby={errors.size ? "contact-size-error" : undefined}
                className={inputCls}
                defaultValue=""
              >
                <option value="" disabled>Select size</option>
                {SIZES.map(s => <option key={s} value={s} className="bg-[oklch(0.14_0.01_60)]">Size {s}</option>)}
              </select>
            </Field>
            <Field id="contact-qty" label="Quantity" required error={errors.qty}>
              <input
                id="contact-qty"
                name="qty"
                type="number"
                inputMode="numeric"
                min={1}
                required
                aria-required="true"
                aria-invalid={!!errors.qty}
                aria-describedby={errors.qty ? "contact-qty-error" : undefined}
                className={inputCls}
                placeholder="e.g. 10,000"
              />
            </Field>
          </div>
          <Field id="contact-msg" label="Message">
            <textarea
              id="contact-msg"
              name="msg"
              rows={4}
              maxLength={1000}
              className={`${inputCls} resize-none`}
              placeholder="Timeline, specifications, delivery preferences…"
            />
          </Field>
          <button
            type="submit"
            className="btn-gold btn-gold-hover sheen rounded-xl px-8 py-3.5 inline-flex items-center gap-2 w-full md:w-auto justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0f]"
          >
            Send Request <ArrowRight size={17} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full bg-black/40 border border-white/10 focus:border-[oklch(0.82_0.13_82/0.6)] focus-visible:ring-2 focus-visible:ring-[oklch(0.82_0.13_82/0.35)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0b0f] outline-none rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:focus-visible:ring-red-400/40";

function Field({
  id,
  label,
  children,
  required,
  error,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="block">
      <label htmlFor={id} className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-gold-gradient ml-1">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Logo size={48} />
          <p className="mt-5 text-sm text-muted-foreground max-w-md">
            Precision LLDPE silky bag manufacturing in Bengaluru since 2009. GST & MSME registered. KSPCB certified through 2040.
          </p>
        </div>
        <div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-gold-gradient">Quick Links</div>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map(n => (
              <li key={n.href}><a href={n.href} className="text-muted-foreground hover:text-foreground transition">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] tracking-[0.3em] uppercase text-gold-gradient">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>+91 70190 09508</li>
            <li className="break-all">lohithshekarbs@gmail.com</li>
            <li>Rajagopal Nagar, Bengaluru – 560058</li>
          </ul>
        </div>
      </div>
      <div className="gold-divider" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Dharshana Polymers. All rights reserved.</div>
        <div className="tracking-[0.25em] uppercase">GSTIN 29BPTPS0788C1Z7 · UDYAM-KR-03-0631643</div>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-white relative z-10">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004c-1.009 0-2.006-.264-2.88-.731l-.206-.121-2.134.559 1.388-2.08-.097-.19C7.674 17.18 7.04 15.15 7.04 13c0-4.222 3.438-7.657 7.662-7.657 4.223 0 7.657 3.435 7.657 7.657 0 4.222-3.434 7.657-7.657 7.657M19.87 3.24A11.57 11.57 0 0 0 12.002 0C5.412 0 .057 5.355.057 11.946c0 2.096.55 4.14 1.595 5.942L.057 24l6.255-1.64a11.97 11.97 0 0 0 5.69 1.448h.004c6.59 0 11.944-5.355 11.944-11.946 0-3.19-1.242-6.19-3.499-8.45" />
    </svg>
  );
}

function WhatsAppButton() {
  const message = encodeURIComponent("Hi Dharshana Polymers, I'm interested in LLDPE Silky Bags. Please share pricing and lead time for size __ and quantity __.");
  return (
    <a
      href={`https://wa.me/917019009508?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp for bag size and quantity queries. Opens in a new tab."
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group outline-none"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] transition-transform transition-shadow duration-300 ease-out outline-none group-hover:scale-110 group-hover:shadow-[0_0_0_6px_rgba(37,211,102,0.25)] group-active:scale-95 group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-gold/80 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#0a0b0f] group-focus-visible:shadow-[0_0_0_6px_rgba(37,211,102,0.3)]">
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/20 rotate-45 translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-700" />
        </div>
        <WhatsAppIcon size={26} />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0a0b0f]" aria-hidden="true" />
      </div>
    </a>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <TrustBar />
      <Products />
      <Process />
      <Certifications />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
