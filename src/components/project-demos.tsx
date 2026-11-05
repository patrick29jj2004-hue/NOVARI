"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import {
  projects,
  type Locale,
  type Project,
} from "@/lib/content";
import {
  calculateSubtotal,
  filterProducts,
  updateCart,
  type CartLine,
  type Product,
} from "@/lib/store";

const demoMenu = {
  es: {
    categories: ["Entradas", "Principales", "Postres"],
    items: [
      { category: "Entradas", name: "Tiradito de temporada", note: "Pesca del día, cítricos y hierbas." },
      { category: "Entradas", name: "Conchas a la brasa", note: "Mantequilla de ají amarillo y limón." },
      { category: "Principales", name: "Arroz de mar", note: "Arroz meloso, pesca y fondo casero." },
      { category: "Principales", name: "Pesca del día", note: "Vegetales de estación y salsa de la casa." },
      { category: "Postres", name: "Mousse de cacao", note: "Cacao peruano y sal de Maras." },
      { category: "Postres", name: "Fruta y lúcuma", note: "Fruta fresca, lúcuma y crocante." },
    ],
  },
  en: {
    categories: ["Small plates", "Mains", "Dessert"],
    items: [
      { category: "Small plates", name: "Seasonal tiradito", note: "Catch of the day, citrus and herbs." },
      { category: "Small plates", name: "Charred scallops", note: "Yellow chili butter and lime." },
      { category: "Mains", name: "Sea rice", note: "Creamy rice, catch of the day and house stock." },
      { category: "Mains", name: "Daily catch", note: "Seasonal vegetables and house sauce." },
      { category: "Dessert", name: "Cacao mousse", note: "Peruvian cacao and Maras salt." },
      { category: "Dessert", name: "Fruit & lúcuma", note: "Fresh fruit, lúcuma and crisp." },
    ],
  },
} as const;

export function RestaurantMenu({ locale }: { locale: Locale }) {
  const copy = demoMenu[locale];
  const [category, setCategory] = useState<string>(copy.categories[0]);
  const visible = copy.items.filter((item) => item.category === category);
  return (
    <div>
      <div aria-label={locale === "es" ? "Categorías del menú" : "Menu categories"} className="button-row" role="group">
        {copy.categories.map((item) => (
          <button
            aria-pressed={category === item}
            className={`button${category === item ? "" : " button-secondary"}`}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="card-grid">
        {visible.map((item) => (
          <article className="content-card" key={item.name}>
            <span className="package-label">{locale === "es" ? "CARTA CONCEPTUAL" : "CONCEPT MENU"}</span>
            <h3>{item.name}</h3><p>{item.note}</p>
          </article>
        ))}
      </div>
      <p className="form-help">{locale === "es" ? "Carta conceptual: platos y descripciones ilustrativos." : "Concept menu: illustrative dishes and descriptions."}</p>
    </div>
  );
}

export function DemoRequestForm({
  locale,
  title,
  subject,
}: {
  locale: Locale;
  title: string;
  subject: string;
}) {
  const [message, setMessage] = useState("");
  const [selection, setSelection] = useState("");
  const [email, setEmail] = useState("");
  const isEnglish = locale === "en";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      isEnglish
        ? "Demo only — nothing was sent and no request was recorded."
        : "Solo demo: no se envió ni registró ninguna solicitud.",
    );
  }

  return (
    <form className="detail-panel" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <p>{isEnglish ? "Try the form. It validates your input locally and does not contact a real business." : "Prueba el formulario. Valida tus datos localmente y no contacta a un negocio real."}</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${subject}-selection`}>{isEnglish ? "Choose an option" : "Elige una opción"}</label>
          <select id={`${subject}-selection`} onChange={(event) => setSelection(event.target.value)} required value={selection}>
            <option value="">{isEnglish ? "Select one" : "Selecciona una opción"}</option>
            {(subject === "beauty"
              ? isEnglish ? ["Cut & style", "Color session", "Hair care"] : ["Corte y peinado", "Color", "Cuidado capilar"]
              : subject === "restaurant"
                ? isEnglish
                  ? ["Lunch reservation", "Dinner reservation", "Menu question"]
                  : ["Reserva para almuerzo", "Reserva para cena", "Consulta sobre la carta"]
                : isEnglish ? ["A new website", "E-commerce", "Custom solution"] : ["Sitio web", "E-commerce", "Solución a medida"]
            ).map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${subject}-email`}>{isEnglish ? "Email" : "Correo electrónico"}</label>
          <input autoComplete="email" id={`${subject}-email`} onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        </div>
      </div>
      <button className="button" style={{ marginTop: 16 }} type="submit">{isEnglish ? "Preview request" : "Probar solicitud"}</button>
      {message ? <p aria-live="polite" className="form-message">{message}</p> : null}
      <p className="form-help">{isEnglish ? "Concept project · no real booking or quote is created." : "Proyecto conceptual · no se genera una cita ni cotización real."}</p>
    </form>
  );
}

const products: Product[] = [
  { id: "coat", name: "Forma wool coat", category: "outerwear", price: 489, color: "S/ 489 · Demo" },
  { id: "overshirt", name: "Structure overshirt", category: "outerwear", price: 319, color: "S/ 319 · Demo" },
  { id: "shirt", name: "Everyday shirt", category: "essentials", price: 189, color: "S/ 189 · Demo" },
  { id: "tee", name: "Soft cotton tee", category: "essentials", price: 119, color: "S/ 119 · Demo" },
  { id: "tote", name: "Studio canvas tote", category: "accessories", price: 79, color: "S/ 79 · Demo" },
  { id: "scarf", name: "Soft wool scarf", category: "accessories", price: 149, color: "S/ 149 · Demo" },
];

const categoryLabels: Record<Locale, Record<string, string>> = {
  es: { all: "Todo", outerwear: "Abrigos", essentials: "Básicos", accessories: "Accesorios" },
  en: { all: "All", outerwear: "Outerwear", essentials: "Essentials", accessories: "Accessories" },
};

const CART_KEY = "fanami-demo-cart";
let cartSnapshot = "[]";
const cartListeners = new Set<() => void>();

function getCartSnapshot() {
  if (typeof window === "undefined") return cartSnapshot;
  try {
    cartSnapshot = window.localStorage.getItem(CART_KEY) ?? "[]";
  } catch {
    return cartSnapshot;
  }
  return cartSnapshot;
}

function getServerCartSnapshot() {
  return "[]";
}

function subscribeToCart(listener: () => void) {
  cartListeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
    window.addEventListener("fanami-cart-change", listener);
  }
  return () => {
    cartListeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
      window.removeEventListener("fanami-cart-change", listener);
    }
  };
}

function writeCart(lines: CartLine[]) {
  cartSnapshot = JSON.stringify(
    lines.map(({ product, size: itemSize, quantity }) => ({
      productId: product.id,
      size: itemSize,
      quantity,
    })),
  );
  let persisted = true;
  try {
    window.localStorage.setItem(CART_KEY, cartSnapshot);
  } catch {
    persisted = false;
  }
  window.dispatchEvent(new Event("fanami-cart-change"));
  return persisted;
}

function parseCart(raw: string): { lines: CartLine[]; invalid: boolean } {
  try {
    const saved: unknown = JSON.parse(raw);
    if (!Array.isArray(saved)) return { lines: [], invalid: true };
    let invalid = false;
    const lines = saved.flatMap((entry: unknown) => {
      if (!entry || typeof entry !== "object") {
        invalid = true;
        return [];
      }
      const record = entry as Record<string, unknown>;
      const product = products.find((item) => item.id === record.productId);
      if (
        !product ||
        typeof record.size !== "string" ||
        !["XS", "S", "M", "L", "XL"].includes(record.size) ||
        typeof record.quantity !== "number" ||
        !Number.isInteger(record.quantity) ||
        record.quantity < 1 ||
        record.quantity > 20
      ) {
        invalid = true;
        return [];
      }
      return [{ product, size: record.size, quantity: record.quantity }];
    });
    return { lines, invalid };
  } catch {
    return { lines: [], invalid: true };
  }
}

export function FashionStore({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const [category, setCategory] = useState("all");
  const [size, setSize] = useState("M");
  const [feedback, setFeedback] = useState("");
  const visible = useMemo(() => filterProducts(products, category), [category]);
  const savedCart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );
  const parsedCart = useMemo(() => parseCart(savedCart), [savedCart]);
  const cart = parsedCart.lines;
  const subtotal = calculateSubtotal(cart);

  function changeQuantity(product: Product, itemSize: string, change: number) {
    const updated = updateCart(cart, product, itemSize, change);
    const persisted = writeCart(updated);
    setFeedback(
      persisted
        ? ""
        : isEnglish
          ? "Local storage is unavailable; this cart will not persist."
          : "El almacenamiento local no está disponible; el carrito no persistirá.",
    );
  }

  return (
    <div className="detail-layout" style={{ gridTemplateColumns: "minmax(0, 1.5fr) minmax(260px, .7fr)" }}>
      <section>
        <div aria-label={isEnglish ? "Product categories" : "Categorías de producto"} className="button-row" role="group" style={{ marginBottom: 20 }}>
          {Object.entries(categoryLabels[locale]).map(([key, label]) => (
            <button aria-pressed={category === key} className={`button${category === key ? "" : " button-secondary"}`} key={key} onClick={() => setCategory(key)} type="button">{label}</button>
          ))}
        </div>
        <div className="product-grid">
          {visible.map((product, index) => (
            <article className="product-card" key={product.id}>
              <div className="product-art" style={{ "--product-a": index % 2 ? "#35403d" : "#33404c", "--product-b": index % 2 ? "#a99c83" : "#8a7568" } as React.CSSProperties}>
                <span aria-hidden="true" className="product-shape" />
              </div>
              <div className="product-details">
                <h3>{product.name}</h3><p>{product.color}</p>
                <div className="product-controls">
                  <label className="sr-only" htmlFor={`size-${product.id}`}>{isEnglish ? "Size" : "Talla"}</label>
                  <select className="select-small" id={`size-${product.id}`} onChange={(event) => setSize(event.target.value)} value={size}>
                    {["XS", "S", "M", "L", "XL"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                  <button className="button" onClick={() => changeQuantity(product, size, 1)} type="button">{isEnglish ? "Add" : "Añadir"}</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="detail-panel cart-panel">
        <p className="eyebrow">{isEnglish ? "Demo cart" : "Carrito demo"}</p>
        <h2>{isEnglish ? "Your selection" : "Tu selección"}</h2>
        {cart.length ? cart.map((line) => (
          <div className="cart-line" key={`${line.product.id}-${line.size}`}>
            <span>{line.product.name}<br /><small>{line.size} · S/ {line.product.price * line.quantity}</small></span>
            <span className="quantity-controls">
              <button aria-label={`${isEnglish ? "Remove one" : "Quitar uno"} ${line.product.name}`} onClick={() => changeQuantity(line.product, line.size, -1)} type="button">−</button>
              {line.quantity}
              <button aria-label={`${isEnglish ? "Add one" : "Añadir uno"} ${line.product.name}`} onClick={() => changeQuantity(line.product, line.size, 1)} type="button">+</button>
            </span>
          </div>
        )) : <p className="form-help">{isEnglish ? "Your demo cart is empty." : "Tu carrito demo está vacío."}</p>}
        {parsedCart.invalid ? <p className="form-message form-error">{isEnglish ? "Invalid saved cart entries were ignored." : "Se ignoraron datos inválidos del carrito guardado."}</p> : null}
        <div className="cart-total"><span>{isEnglish ? "Demo subtotal" : "Subtotal demo"}</span><span>S/ {subtotal.toFixed(2)}</span></div>
        <p className="notice">{isEnglish ? "Concept checkout only. No payment or personal financial information is collected." : "Checkout conceptual. No se procesa ningún pago ni se recopilan datos financieros."}</p>
        <button className="button button-secondary" disabled={!cart.length} onClick={() => setFeedback(isEnglish ? "Concept checkout only — no order was placed." : "Checkout conceptual: no se realizó ningún pedido.")} style={{ width: "100%", marginTop: 12 }} type="button">
          {isEnglish ? "Continue to demo checkout" : "Continuar al checkout demo"}
        </button>
        {feedback ? <p aria-live="polite" className="form-message">{feedback}</p> : null}
      </aside>
    </div>
  );
}

function DemoSections({ project, locale }: { project: Project; locale: Locale }) {
  const english = locale === "en";
  if (project.slug === "restaurant") {
    return (
      <>
        <section className="container section">
          <SectionHeading eyebrow={english ? "The menu" : "La carta"} title={english ? "Coastal flavors, thoughtfully prepared." : "Sabores de costa, preparados con cuidado."} copy={english ? "Choose a category to explore this fictional restaurant menu." : "Elige una categoría para explorar la carta de este restaurante ficticio."} locale={locale} />
          <RestaurantMenu locale={locale} />
        </section>
        <section className="container section-tight">
          <DemoRequestForm locale={locale} subject="restaurant" title={english ? "Request a table" : "Solicita una mesa"} />
        </section>
      </>
    );
  }
  if (project.slug === "beauty") {
    return (
      <>
        <section className="container section">
          <SectionHeading eyebrow={english ? "Studio services" : "Servicios del estudio"} title={english ? "A considered ritual, made personal." : "Un ritual pensado para ti."} locale={locale} />
          <div className="card-grid">
            {(english ? ["Cut & styling", "Color sessions", "Hair rituals"] : ["Corte y peinado", "Sesiones de color", "Rituales capilares"]).map((title, index) => (
              <article className="content-card" key={title}><span className="package-label">0{index + 1} · {english ? "CONCEPT" : "DEMO"}</span><h3>{title}</h3><p>{english ? "Service descriptions and prices would be confirmed by the real studio." : "El estudio real confirmaría los detalles y precios del servicio."}</p></article>
            ))}
          </div>
        </section>
        <section className="container section-tight">
          <DemoRequestForm locale={locale} subject="beauty" title={english ? "Request an appointment" : "Solicita una cita"} />
        </section>
      </>
    );
  }
  if (project.slug === "fashion") {
    return (
      <section className="container section">
        <SectionHeading eyebrow={english ? "Auren collection" : "Colección Auren"} title={english ? "Considered pieces for everyday life." : "Prendas pensadas para todos los días."} copy={english ? "Filter the collection, choose a size and add items to the local demo cart." : "Filtra la colección, elige una talla y agrega prendas al carrito local de demostración."} locale={locale} />
        <p className="notice" style={{ marginBlock: 24 }}>{english ? "All products and prices are fictional examples for this concept demo." : "Todos los productos y precios son ejemplos ficticios de esta demo conceptual."}</p>
        <FashionStore locale={locale} />
      </section>
    );
  }
  return (
    <>
      <section className="container section">
        <SectionHeading eyebrow={english ? "Business solutions" : "Soluciones empresariales"} title={english ? "Good systems make room for better work." : "Los buenos sistemas abren espacio para un mejor trabajo."} locale={locale} />
        <div className="card-grid">
          {(english ? ["Digital strategy", "Systems integration", "Business intelligence"] : ["Estrategia digital", "Integración de sistemas", "Inteligencia de negocio"]).map((title, index) => (
            <article className="content-card" key={title}><span className="package-label">0{index + 1}</span><h3>{title}</h3><p>{english ? "A concept service that can be scoped to each organization's workflows." : "Un servicio conceptual que puede adaptarse a los flujos de cada organización."}</p></article>
          ))}
        </div>
      </section>
      <section className="container section-tight">
        <DemoRequestForm locale={locale} subject="corporate" title={english ? "Request a project conversation" : "Solicita conversar sobre un proyecto"} />
      </section>
    </>
  );
}

export function ProjectDemoPage({
  slug,
  locale = "es",
}: {
  slug: string;
  locale?: Locale;
}) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return null;
  }
  const isEnglish = locale === "en";
  const back = isEnglish ? "/en" : "/";

  return (
    <>
      <header className="page-hero">
        <div className="container">
          <Link className="arrow-link" href={back}>{isEnglish ? "← Back to FANAMI" : "← Volver a FANAMI"}</Link>
          <p className="eyebrow" style={{ marginTop: 30 }}>{isEnglish ? "Concept project — interactive demo" : "Proyecto conceptual — demo interactiva"}</p>
          <h1 className="page-title">{project.name}</h1>
          <p className="page-description">{project.type[locale]} · {project.description[locale]}</p>
          <p className="notice" style={{ marginTop: 22 }}>{isEnglish ? "Portfolio concept only. This is not a real business, client project, reservation or order." : "Solo portafolio conceptual. No es un negocio real ni un proyecto, reserva o pedido de cliente."}</p>
        </div>
      </header>
      <section className="container section-tight">
        <div className="demo-hero-art" style={{ "--demo-dark": project.dark, "--demo-glow": project.glow } as React.CSSProperties}>
          <div aria-hidden="true" className="demo-orb" />
          <strong>{project.name}</strong>
        </div>
      </section>
      <DemoSections project={project} locale={locale} />
      <section className="container section-tight">
        <div className="cta-panel">
          <p className="eyebrow">{isEnglish ? "Made for demonstration" : "Hecho para demostrar"}</p>
          <h2 className="section-heading">{isEnglish ? "See what a tailored digital experience can do." : "Descubre lo que puede lograr una experiencia digital a medida."}</h2>
          <p>{isEnglish ? "These demos illustrate possible interactions; a real project would be scoped around your business." : "Estas demos ilustran interacciones posibles; un proyecto real se define según tu negocio."}</p>
          <Link className="button" href={isEnglish ? "/en/contact" : "/contact"}>{isEnglish ? "Start a project" : "Iniciar un proyecto"} <Icon name="arrow" /></Link>
        </div>
      </section>
    </>
  );
}
