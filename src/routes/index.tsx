import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import d1 from "@/assets/d1.jpg";
import d2 from "@/assets/d2.jpg";
import d3 from "@/assets/d3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rumbo — Agencia de viajes de autor" },
      { name: "description", content: "Viajes diseñados a tu medida: islas, montañas y ciudades legendarias." },
      { property: "og:title", content: "Rumbo — Agencia de viajes de autor" },
      { property: "og:description", content: "Viajes diseñados a tu medida: islas, montañas y ciudades legendarias." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const destinos = [
  { img: d1, name: "Santorini", country: "Grecia", price: "2.490" },
  { img: d2, name: "Machu Picchu", country: "Perú", price: "1.890" },
  { img: d3, name: "Kioto", country: "Japón", price: "3.290" },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const [y, setY] = useState(0);
  useEffect(() => {
    const f = () => setY(window.scrollY);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <main className="overflow-hidden">
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${y > 40 ? "glass py-3" : "py-6"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <span className="font-display text-2xl text-hero-foreground">Rumbo<span className="text-primary">.</span></span>
          <div className="hidden gap-8 text-sm text-hero-foreground/80 md:flex">
            <a href="#destinos" className="link-underline">Destinos</a>
            <a href="#experiencia" className="link-underline">Experiencia</a>
            <a href="#contacto" className="link-underline">Contacto</a>
          </div>
          <a href="#contacto" className="btn-primary text-sm">Reservar</a>
        </div>
      </nav>

      <section className="relative flex h-screen min-h-[640px] items-end">
        <img src={hero} alt="Laguna tropical" width={1920} height={1088}
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
          style={{ transform: `translateY(${y * 0.3}px) scale(1.1)` }} />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="blob left-[10%] top-[20%] bg-primary" />
        <div className="blob right-[5%] top-[40%] bg-accent [animation-delay:-4s]" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24">
          <p className="animate-rise mb-4 text-sm uppercase tracking-[0.4em] text-primary">Viajes de autor desde 2009</p>
          <h1 className="animate-rise font-display text-6xl leading-[0.95] text-hero-foreground [animation-delay:150ms] md:text-8xl lg:text-9xl">
            El mundo,<br /><em className="text-gradient">a tu ritmo.</em>
          </h1>
          <div className="animate-rise mt-10 flex flex-wrap gap-4 [animation-delay:300ms]">
            <a href="#destinos" className="btn-primary">Explorar destinos →</a>
            <a href="#experiencia" className="btn-ghost">Cómo viajamos</a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 h-12 w-6 -translate-x-1/2 rounded-full border-2 border-hero-foreground/50">
          <span className="mx-auto mt-2 block h-2 w-1 animate-bounce rounded-full bg-hero-foreground" />
        </div>
      </section>

      <div className="marquee bg-primary py-5 text-primary-foreground">
        <div className="marquee-track font-display text-3xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Bali", "Islandia", "Marrakech", "Patagonia", "Tulum", "Maldivas", "Cartagena", "Lisboa"].map((c) => (
              <span key={k + c} className="mx-8">{c} ✦</span>
            )),
          )}
        </div>
      </div>

      <section id="destinos" className="mx-auto max-w-7xl px-6 py-32">
        <div className="reveal mb-16 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl md:text-7xl">Destinos<br /><em className="text-primary">que inspiran</em></h2>
          <p className="max-w-sm text-muted-foreground">Itinerarios cuidados al detalle, con guías locales y alojamientos únicos.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {destinos.map((d, i) => (
            <article key={d.name} className="reveal card-dest group" style={{ transitionDelay: `${i * 120}ms` }}>
              <img src={d.img} alt={d.name} loading="lazy" width={768} height={1024}
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-card-overlay" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-hero-foreground">
                <p className="text-xs uppercase tracking-widest opacity-80">{d.country}</p>
                <h3 className="font-display text-4xl">{d.name}</h3>
                <div className="mt-3 flex items-center justify-between translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span>desde <b>USD {d.price}</b></span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experiencia" className="bg-secondary py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
          {[["15+", "años de experiencia"], ["80", "países visitados"], ["12k", "viajeros felices"], ["4.9", "valoración media"]].map(([n, l], i) => (
            <div key={l} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="font-display text-7xl text-gradient">{n}</p>
              <p className="mt-2 text-secondary-foreground/70">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <div className="reveal">
          <h2 className="font-display text-5xl md:text-7xl">¿A dónde<br /><em className="text-primary">vamos ahora?</em></h2>
          <form className="mx-auto mt-12 flex max-w-xl flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" required placeholder="tu@correo.com"
              className="flex-1 rounded-full border border-border bg-card px-6 py-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20" />
            <button className="btn-primary">Planear mi viaje</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        © 2026 Rumbo Viajes · Hecho para soñadores
      </footer>
    </main>
  );
}
