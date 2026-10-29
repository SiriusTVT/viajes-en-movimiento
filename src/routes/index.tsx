import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Facebook,
  FileCheck2,
  Instagram,
  Luggage,
  Menu,
  MessageCircle,
  Plane,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TravelQuote } from "@/components/travel-quote";
import { money, plans, whatsappNumber } from "@/lib/travel";
import wdLogo from "@/assets/wd-logo.png.asset.json";
import heroImg from "@/assets/hero.jpg";
import madridImg from "@/assets/madrid-hero.jpg";
import polandImg from "@/assets/poland.jpg";
import spainImg from "@/assets/spain.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "W.D Travel — Viajes y asesoría migratoria en Cali" },
      {
        name: "description",
        content: "Más que una agencia: tu aliado en cada paso del viaje. Descubre planes a Madrid, Polonia y España y cotiza por WhatsApp con W.D Travel.",
      },
      { property: "og:title", content: "W.D Travel — Tu próximo destino comienza aquí" },
      {
        property: "og:description",
        content: "Viajes a medida y asesoría migratoria en Cali. Planes a España y Polonia con acompañamiento personalizado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const wa = `https://wa.me/${whatsappNumber}`;

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M15 4v10.2a4.8 4.8 0 1 1-4.1-4.75v2.7a2.1 2.1 0 1 0 1.4 1.98V4H15Z" />
      <path d="M15 4c.3 1.7 1.25 2.72 3 3.05v2.45c-1.1-.08-2.1-.42-3-1.02V4Z" opacity=".65" />
    </svg>
  );
}

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/w.d.travel3/", Icon: Instagram },
  { name: "TikTok", href: "https://www.tiktok.com/@wdtravel6", Icon: TiktokIcon },
  { name: "Facebook", href: "https://www.facebook.com/people/WDTravel/61574445834395/", Icon: Facebook },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="W.D Travel inicio">
      <img src={wdLogo.url} alt="Logo W.D Travel" className="brand-logo" width={145} height={83} />
      <span className="brand-text">
        <em>Travel</em>
        <small>VIAJES & ASESORÍA MIGRATORIA</small>
      </span>
    </a>
  );
}

function packageImage(id: string) {
  if (id === "madrid") return madridImg;
  if (id === "poland") return polandImg;
  return spainImg;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 35);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", scroll);
      io.disconnect();
    };
  }, []);

  const goToQuote = (plan?: string) => {
    if (plan) setSelectedPlan(plan);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="page">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#planes">Destinos y planes</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
          </nav>
          <div className="nav-actions">
            <Button asChild className="nav-quote">
              <a href="#cotizar" onClick={() => goToQuote()}>
                Cotiza tu viaje <ArrowUpRight size={16} />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-toggle"
              onClick={() => setMenu((m) => !m)}
              aria-label="Abrir menú"
            >
              <Menu />
            </Button>
          </div>
        </div>
        {menu && (
          <div className="mobile-nav">
            <a href="#inicio" onClick={() => setMenu(false)}>
              Inicio
            </a>
            <a href="#planes" onClick={() => setMenu(false)}>
              Destinos y planes
            </a>
            <a href="#servicios" onClick={() => setMenu(false)}>
              Servicios
            </a>
            <a href="#nosotros" onClick={() => setMenu(false)}>
              Nosotros
            </a>
            <a href="#cotizar" onClick={() => {
              setMenu(false);
              goToQuote();
            }}>
              Cotiza tu viaje
            </a>
          </div>
        )}
      </header>

      <section id="inicio" className="hero-wd reveal">
        <div className="hero-wrap">
          <img className="hero-bg" src={heroImg} alt="" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-eyebrow">W.D Travel · Viajes y asesoría migratoria</span>
            <h1>
              Tu próximo destino comienza <em>aquí.</em>
            </h1>
            <p>
              Planes a medida, tiquetes aéreos, asistencia y acompañamiento migratorio. Viaja seguro, viaja con respaldo.
            </p>
            <div className="hero-actions">
              <Button asChild className="hero-cta">
                <a href="#cotizar" onClick={() => goToQuote()}>
                  Cotizar mi viaje ahora <Send size={17} />
                </a>
              </Button>
              <Button
                variant="outline"
                className="hero-secondary"
                onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explorar paquetes y servicios
              </Button>
            </div>
            <div className="hero-reassurance">
              <ShieldCheck size={15} />
              <span>Asesoría personalizada 24/7</span>
              <Plane size={15} />
              <span>Tiquetes y visados</span>
              <MessageCircle size={15} />
              <span>WhatsApp directo</span>
            </div>
          </div>
          <button
            className="scroll-cue"
            aria-label="Desplazarse para descubrir más"
            onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </button>
        </div>
      </section>

      <div className="section-divider" style={{ fill: "var(--wd-sky)" }}></div>

      <section id="planes" className="packages-wd reveal" aria-labelledby="packages-title">
        <div className="container">
          <div className="packages-heading">
            <span className="section-eyebrow">Ofertas WD Travel</span>
            <h2 id="packages-title">Paquetes para hacer realidad tu próximo viaje</h2>
            <p>Elige una opción y recibe asesoría personalizada para reservarla.</p>
          </div>
          <div className="packages-grid">
            {plans.map((plan) => (
              <article className="package-card reveal" key={plan.id}>
                <div
                  className="package-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(13, 42, 82, 0.08), rgba(13, 42, 82, 0.85)), url(${packageImage(plan.id)})`,
                  }}
                >
                  <span className="package-badge">{plan.tag}</span>
                  <div className="package-destination">{plan.destination}</div>
                </div>
                <div className="package-content">
                  <h3>{plan.title}</h3>
                  <p className="package-details">{plan.label}</p>
                  <ul className="package-includes">
                    {plan.includes.map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                  <div className="package-price">
                    <span>{money(plan.price)}</span>
                    {plan.previousPrice && <small>{money(plan.previousPrice)}</small>}
                  </div>
                  <Button className="package-btn" onClick={() => goToQuote(plan.title)}>
                    Cotizar este plan
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ fill: "var(--wd-cream)" }}></div>

      <section id="nosotros" className="about-wd reveal" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="about-copy">
            <span className="section-eyebrow">Nuestra esencia</span>
            <h2 id="about-title">
              Más que una agencia.<br />
              <em>Tu aliado de viaje.</em>
            </h2>
            <p>
              Sabemos que detrás de cada viaje hay un sueño, un reencuentro o un nuevo comienzo. Por eso, en W.D Travel
              cuidamos mucho más que tu itinerario.
            </p>
            <p>
              Desde una escapada hasta un proyecto de vida en otro país, te damos orientación clara y acompañamiento
              personalizado, antes, durante y después del viaje.
            </p>
            <div className="about-highlights">
              <div>
                <strong>Viaja con respaldo real</strong>
                <span>Asesoría personalizada antes, durante y después de tu viaje.</span>
              </div>
              <div>
                <strong>Planes claros y a tu medida</strong>
                <span>Opciones pensadas para tus objetivos, presupuesto y estilo de vida.</span>
              </div>
            </div>
            <Button asChild variant="link" className="about-link">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp <ArrowUpRight size={15} />
              </a>
            </Button>
          </div>
          <div className="about-image">
            <img
              src={spainImg}
              alt="Arquitectura y mosaicos del Parque Güell en Barcelona"
              width={1024}
              height={1280}
              loading="lazy"
            />
            <div className="image-caption">
              <Compass size={30} />
              <span>
                No solo destinos.<br />
                <strong>Nuevos comienzos.</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ fill: "var(--wd-sky)" }}></div>

      <section id="servicios" className="services-wd reveal" aria-labelledby="services-title">
        <div className="container">
          <div className="packages-heading">
            <span className="section-eyebrow">Tú disfrutas. Nosotros coordinamos.</span>
            <h2 id="services-title">Todo listo <em>para el camino.</em></h2>
            <p>Más tranquilidad, menos trámites. Un solo equipo para todo tu viaje.</p>
          </div>
          <div className="services-grid">
            {[
              { title: "Paquetes vacacionales a medida", desc: "Escapadas nacionales e internacionales con vuelos, alojamientos y experiencias pensadas para ti.", icon: Compass },
              { title: "Asistencia y seguros", desc: "Asistencia médica, protección de equipaje y respaldo para disfrutar tu viaje con tranquilidad.", icon: ShieldCheck },
              { title: "Asesoría migratoria", desc: "Orientación en visados, requisitos de entrada y gestión documental, paso a paso.", icon: FileCheck2 },
              { title: "Logística y traslados", desc: "Conexiones, traslados y reservas coordinadas para que cada parte del camino fluya.", icon: Luggage },
            ].map(({ title, desc, icon: Icon }, i) => (
              <div className="service-item reveal" key={title}>
                <div className="service-top">
                  <div className="service-icon"><Icon size={26} /></div>
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ fill: "var(--wd-cream)" }}></div>

      <section id="cotizar" className="quote-wd reveal" aria-labelledby="cotizar-title">
        <div className="container">
          <div className="packages-heading">
            <span className="section-eyebrow">Aquí comienza tu viaje</span>
            <h2 id="cotizar-title">Lo imaginas.<br /><em>Lo planeamos.</em></h2>
            <p>Cuéntanos a dónde quieres ir y recibe una opción pensada para ti.</p>
          </div>
          <div className="quote-card">
            <TravelQuote selectedPlan={selectedPlan} />
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ fill: "var(--wd-sky)" }}></div>

      <section className="closing-cta reveal" aria-labelledby="closing-cta-title">
        <div className="container closing-inner">
          <div>
            <span className="section-eyebrow">Estamos para ayudarte</span>
            <h2 id="closing-cta-title">El viaje de tus sueños comienza con una conversación.</h2>
            <p>
              Cuéntanos a dónde quieres ir y nosotros nos encargamos del resto. Recibe una cotización personalizada en
              minutos o síguenos para inspirarte con nuestras ofertas y recomendaciones.
            </p>
          </div>
          <div className="closing-actions">
            <a className="whatsapp-btn" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} /> Hablar con un asesor por WhatsApp
            </a>
            <div className="social-buttons">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  className={`social-btn ${s.name.toLocaleLowerCase()}`}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar WD Travel en ${s.name}`}
                >
                  <s.Icon size={17} />
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-main">
          <Brand footer />
          <div>
            <p>
              Agencia de viajes y asesoría migratoria<br />
              Cali, Colombia · Hacia el mundo
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer">
              Hablemos de tu próximo viaje <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 W.D Travel. Todos los derechos reservados.</span>
          <span>Más que una agencia, tu aliado.</span>
        </div>
      </footer>

      <Button asChild size="icon" className="floating-whatsapp">
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Contactar W.D Travel por WhatsApp">
          <MessageCircle />
        </a>
      </Button>
    </main>
  );
}
