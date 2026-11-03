export type Locale = "es" | "en";

export type Service = {
  slug: string;
  icon: "spark" | "shop" | "code" | "chart" | "support";
  title: Record<Locale, string>;
  short: Record<Locale, string>;
  description: Record<Locale, string>;
  items: Record<Locale, string[]>;
};

export const services: Service[] = [
  {
    slug: "web-design",
    icon: "spark",
    title: { es: "Diseño y desarrollo web", en: "Web design & development" },
    short: {
      es: "Sitios que comunican el valor de tu marca y convierten visitas en oportunidades.",
      en: "Websites that communicate your value and turn visits into opportunities.",
    },
    description: {
      es: "Diseñamos experiencias digitales rápidas, claras y alineadas con los objetivos de tu negocio.",
      en: "We design fast, clear digital experiences aligned with your business goals.",
    },
    items: {
      es: ["Landing pages", "Webs corporativas", "Sitios multipágina", "UI/UX responsive", "SEO técnico inicial"],
      en: ["Landing pages", "Corporate websites", "Multi-page sites", "Responsive UI/UX", "Technical SEO foundations"],
    },
  },
  {
    slug: "ecommerce",
    icon: "shop",
    title: { es: "E-commerce", en: "E-commerce solutions" },
    short: {
      es: "Una tienda online pensada para presentar productos y simplificar la compra.",
      en: "An online store designed to present products and make buying easier.",
    },
    description: {
      es: "Creamos catálogos y experiencias de compra adaptables. Las pasarelas disponibles dependen del país y proveedor.",
      en: "We build adaptable catalogs and shopping flows. Payment gateways depend on country and provider.",
    },
    items: {
      es: ["Catálogo de productos", "Carrito y pedidos", "Integración de pagos según alcance", "Panel administrativo"],
      en: ["Product catalog", "Cart and orders", "Payment integrations by scope", "Admin dashboard"],
    },
  },
  {
    slug: "custom-development",
    icon: "code",
    title: { es: "Soluciones a medida", en: "Custom web solutions" },
    short: {
      es: "Aplicaciones y herramientas digitales creadas para procesos específicos.",
      en: "Digital products and tools built around specific workflows.",
    },
    description: {
      es: "Desarrollamos productos web integrados con los sistemas y flujos de trabajo de cada equipo.",
      en: "We develop web products that fit each team's systems and workflows.",
    },
    items: {
      es: ["Aplicaciones web", "APIs e integraciones", "Dashboards", "Autenticación", "Bases de datos"],
      en: ["Web applications", "APIs and integrations", "Dashboards", "Authentication", "Databases"],
    },
  },
  {
    slug: "digital-growth",
    icon: "chart",
    title: { es: "Crecimiento digital", en: "Digital growth" },
    short: {
      es: "Mejoras medibles en visibilidad, experiencia y conversión.",
      en: "Measurable improvements to visibility, experience and conversion.",
    },
    description: {
      es: "Optimizamos la base digital para ayudarte a aprender de tus visitas y tomar mejores decisiones.",
      en: "We improve your digital foundations so you can learn from visitors and make better decisions.",
    },
    items: {
      es: ["SEO y estructura", "Analítica", "Optimización de conversión", "Rendimiento web"],
      en: ["SEO and site structure", "Analytics", "Conversion optimization", "Web performance"],
    },
  },
  {
    slug: "maintenance",
    icon: "support",
    title: { es: "Mantenimiento y soporte", en: "Maintenance & support" },
    short: {
      es: "Acompañamiento para mantener tu sitio actualizado y en buen estado.",
      en: "Ongoing care to keep your website updated and in good shape.",
    },
    description: {
      es: "El alcance, la frecuencia y los tiempos de respuesta se definen en cada contrato.",
      en: "Scope, frequency and response times are defined in each agreement.",
    },
    items: {
      es: ["Actualizaciones", "Backups", "Revisión de seguridad", "Monitoreo", "Cambios menores según contrato"],
      en: ["Updates", "Backups", "Security reviews", "Monitoring", "Minor changes by agreement"],
    },
  },
];

export type Project = {
  slug: string;
  name: string;
  type: Record<Locale, string>;
  description: Record<Locale, string>;
  technologies: string[];
  dark: string;
  accent: string;
  glow: string;
  demoItems: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    slug: "restaurant",
    name: "MAREA",
    type: { es: "Restaurante & cocina", en: "Restaurant & dining" },
    description: {
      es: "Una experiencia digital cálida para un restaurante costero contemporáneo.",
      en: "A warm digital experience for a contemporary coastal restaurant.",
    },
    technologies: ["Responsive UI", "Menú interactivo", "Reservas demo"],
    dark: "#123b45",
    accent: "#9c6846",
    glow: "rgb(221 167 119 / 32%)",
    demoItems: {
      es: ["Menú por categorías", "Solicitud de reserva", "Historia y galería"],
      en: ["Menu categories", "Reservation request", "Story and gallery"],
    },
  },
  {
    slug: "beauty",
    name: "ATELIER",
    type: { es: "Beauty studio", en: "Beauty studio" },
    description: {
      es: "Un estudio de belleza sereno, editorial y centrado en sus servicios.",
      en: "A calm, editorial beauty studio focused on its services.",
    },
    technologies: ["Agenda demo", "Selección de servicios", "Mobile-first"],
    dark: "#392b35",
    accent: "#bc9a86",
    glow: "rgb(213 164 160 / 32%)",
    demoItems: {
      es: ["Servicios y equipo", "Solicitud de cita", "Galería conceptual"],
      en: ["Services and team", "Appointment request", "Concept gallery"],
    },
  },
  {
    slug: "fashion",
    name: "AUREN",
    type: { es: "Tienda de moda", en: "Fashion store" },
    description: {
      es: "Una tienda de moda editorial con selección de productos y carrito demostrativo.",
      en: "An editorial fashion store with product selection and a demo cart.",
    },
    technologies: ["Filtros", "Carrito frontend", "Checkout conceptual"],
    dark: "#2b302e",
    accent: "#8e927d",
    glow: "rgb(197 190 153 / 27%)",
    demoItems: {
      es: ["Filtros y tallas", "Carrito persistente", "Subtotal demostrativo"],
      en: ["Filters and sizes", "Persistent cart", "Demo subtotal"],
    },
  },
  {
    slug: "corporate",
    name: "VERTEX",
    type: { es: "Soluciones empresariales", en: "Business solutions" },
    description: {
      es: "Una presencia tecnológica y profesional para una firma de servicios B2B.",
      en: "A professional, technology-led presence for a B2B services firm.",
    },
    technologies: ["Arquitectura de contenido", "Formulario demo", "Responsive UI"],
    dark: "#17304a",
    accent: "#337b89",
    glow: "rgb(101 194 198 / 30%)",
    demoItems: {
      es: ["Servicios y sectores", "Proceso de trabajo", "Solicitud de cotización demo"],
      en: ["Services and industries", "Working process", "Demo quote request"],
    },
  },
];

export const packages = [
  {
    name: "STARTER",
    title: { es: "Presencia digital", en: "Digital presence" },
    description: {
      es: "Una página clara para presentar tu negocio y facilitar el contacto.",
      en: "A clear single page to introduce your business and make contact easy.",
    },
    features: {
      es: ["Landing page responsive", "Servicios o productos", "WhatsApp configurable", "Formulario de contacto"],
      en: ["Responsive landing page", "Services or products", "Configurable WhatsApp", "Contact form"],
    },
  },
  {
    name: "BUSINESS",
    title: { es: "Sitio profesional", en: "Professional website" },
    description: {
      es: "Una estructura multipágina para explicar mejor tu propuesta de valor.",
      en: "A multi-page structure to explain your value proposition in more detail.",
    },
    features: {
      es: ["Diseño personalizado", "Secciones y catálogo", "SEO inicial", "Integraciones comerciales"],
      en: ["Custom design", "Sections and catalog", "SEO foundations", "Business integrations"],
    },
  },
  {
    name: "PREMIUM",
    title: { es: "Experiencia digital", en: "Digital experience" },
    description: {
      es: "Un producto web con arquitectura y funcionalidades adaptadas al proyecto.",
      en: "A web product with architecture and features tailored to your project.",
    },
    features: {
      es: ["UI/UX personalizado", "Funcionalidades a medida", "APIs y analítica", "Seguridad y optimización"],
      en: ["Custom UI/UX", "Tailored features", "APIs and analytics", "Security and optimization"],
    },
  },
  {
    name: "E-COMMERCE",
    title: { es: "Tienda online", en: "Online store" },
    description: {
      es: "Una base de comercio digital con funcionalidades acordadas por alcance.",
      en: "A digital commerce foundation with features scoped to your needs.",
    },
    features: {
      es: ["Catálogo y carrito", "Gestión de pedidos", "Pagos según país y proveedor", "Panel administrativo"],
      en: ["Catalog and cart", "Order management", "Payments by country and provider", "Admin dashboard"],
    },
  },
];

export const navigation = {
  es: [
    { href: "/services", label: "Servicios" },
    { href: "/work", label: "Proyectos" },
    { href: "/pricing", label: "Planes" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ],
  en: [
    { href: "/en/services", label: "Services" },
    { href: "/en/work", label: "Our work" },
    { href: "/en/pricing", label: "Pricing" },
    { href: "/en/about", label: "About" },
    { href: "/en/contact", label: "Contact" },
  ],
} satisfies Record<Locale, { href: string; label: string }[]>;
