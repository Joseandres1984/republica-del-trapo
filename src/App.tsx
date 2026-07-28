"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import embeddedImages from "./embeddedAssets";

const phone = "5491157943584";
const minimumHomeDeliveryOrder = 15_000;

type Product = {
  name: string;
  brand: string;
  quality: string;
  detail: string;
  saleUnit: string;
  sourcePack: string;
  price?: string;
  category: "higienicos" | "bobinas" | "intercaladas" | "cocina";
  image: string;
};

type CatalogFilter = "todos" | Product["category"];
type BotView = "menu" | "casa" | "comercio" | "envios" | "pagos";

type BotRecommendation = {
  id: string;
  audience: "casa" | "comercio";
  eyebrow: string;
  name: string;
  description: string;
  items: Array<{ name: string; quantity: number }>;
};

const products: Product[] = [
  {
    name: "Papel Higiénico 30 m",
    brand: "Línea clásica",
    quality: "Hoja simple",
    detail: "Rollo de 30 metros para el uso diario.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x48",
    price: "$420",
    category: "higienicos",
    image: embeddedImages["/products/papel-higienico-30m-x48.webp"],
  },
  {
    name: "Papel Higiénico 80 m",
    brand: "Línea rendidora",
    quality: "Hoja simple",
    detail: "Mayor metraje por rollo para reponer menos.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x30",
    price: "$830",
    category: "higienicos",
    image: embeddedImages["/products/papel-higienico-80m-x30.webp"],
  },
  {
    name: "Papel Higiénico Extra Blanco",
    brand: "Newpel",
    quality: "Hoja simple · Extra blanco",
    detail: "Una opción blanca, práctica y económica.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x30",
    price: "$1.110",
    category: "higienicos",
    image: embeddedImages["/products/newpel-extra-blanco-x30.webp"],
  },
  {
    name: "Papel Higiénico Jumbo Eco",
    brand: "Línea institucional",
    quality: "Jumbo · Económico",
    detail: "Apto para cono chico o grande. Ideal para alto tránsito.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x8",
    price: "$2.020",
    category: "higienicos",
    image: embeddedImages["/products/jumbo-eco-x8.webp"],
  },
  {
    name: "Papel Higiénico Jumbo Extra Blanco",
    brand: "Línea institucional",
    quality: "Jumbo · Extra blanco",
    detail: "Mayor blancura y rendimiento para uso intensivo.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x8",
    price: "$3.680",
    category: "higienicos",
    image: embeddedImages["/products/jumbo-extra-blanco-x8.webp"],
  },
  {
    name: "Papel Higiénico Premium 300 m",
    brand: "Línea premium",
    quality: "Blanco · 300 metros",
    detail: "Rollo de gran metraje para cono chico o grande.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x8",
    price: "$5.660",
    category: "higienicos",
    image: embeddedImages["/products/jumbo-premium-300m-x8.webp"],
  },
  {
    name: "Max Plus 80 m",
    brand: "Higienol",
    quality: "Marca reconocida · 80 metros",
    detail: "Paquete cerrado de cuatro rollos.",
    saleUnit: "1 paquete x4",
    sourcePack: "Caja original: 10 paquetes",
    price: "$6.620",
    category: "higienicos",
    image: embeddedImages["/products/higienol-max-plus-80m-x4.webp"],
  },
  {
    name: "Doble Hoja 20 m",
    brand: "Elegante",
    quality: "Doble hoja",
    detail: "Paquete cerrado de cuatro rollos de 20 metros.",
    saleUnit: "1 paquete x4",
    sourcePack: "Caja original: 10 paquetes",
    price: "$3.030",
    category: "higienicos",
    image: embeddedImages["/products/elegant-doble-hoja-20m-x4.webp"],
  },
  {
    name: "Toalla de Papel 200 m",
    brand: "Línea profesional",
    quality: "Rollo continuo",
    detail: "Bobina toalla de 200 metros para dispenser.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x4",
    price: "$4.690",
    category: "bobinas",
    image: embeddedImages["/products/toalla-papel-200m-x4.webp"],
  },
  {
    name: "Toalla de Papel Blanca 200 m",
    brand: "Línea profesional",
    quality: "Blanca · Rollo continuo",
    detail: "Más blancura, 200 metros y buen rendimiento.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x4",
    price: "$8.720",
    category: "bobinas",
    image: embeddedImages["/products/toalla-papel-blanca-200m-x4.webp"],
  },
  {
    name: "Bobina de Papel 24 cm",
    brand: "Línea profesional",
    quality: "24 cm · 400 metros",
    detail: "Bobina de gran tamaño para limpieza y secado.",
    saleUnit: "1 bobina",
    sourcePack: "Presentación original x2",
    price: "$14.440",
    category: "bobinas",
    image: embeddedImages["/products/bobina-papel-24cm-400m-x2.webp"],
  },
  {
    name: "Bobina Blanca Doble Hoja",
    brand: "Línea profesional",
    quality: "Doble hoja · 400 metros",
    detail: "Mayor absorción y resistencia en formato de gran rendimiento.",
    saleUnit: "1 bobina",
    sourcePack: "Presentación original x2",
    price: "$20.310",
    category: "bobinas",
    image: embeddedImages["/products/bobina-blanca-doble-hoja-400m-x2.webp"],
  },
  {
    name: "Toallas Intercaladas Beige",
    brand: "Línea económica",
    quality: "Papel beige",
    detail: "Toallas plegadas para dispenser. Venta por paquete.",
    saleUnit: "1 paquete",
    sourcePack: "Presentación original x10",
    price: "$1.550",
    category: "intercaladas",
    image: embeddedImages["/products/toallas-intercaladas-beige-x10.webp"],
  },
  {
    name: "Toallas Intercaladas Blancas NP",
    brand: "Línea NP",
    quality: "Papel blanco",
    detail: "Toallas plegadas blancas para dispenser.",
    saleUnit: "1 paquete",
    sourcePack: "Presentación original x10",
    price: "$2.070",
    category: "intercaladas",
    image: embeddedImages["/products/toallas-intercaladas-blancas-np-x10.webp"],
  },
  {
    name: "Toallas Intercaladas Premium",
    brand: "Línea premium",
    quality: "Blancas · 2.000 unidades",
    detail: "Caja completa para consumo intensivo.",
    saleUnit: "1 caja x2.000",
    sourcePack: "Caja cerrada",
    price: "$33.040",
    category: "intercaladas",
    image: embeddedImages["/products/toallas-intercaladas-premium-2000.webp"],
  },
  {
    name: "Toallas Intercaladas Blancas",
    brand: "Línea profesional",
    quality: "Blancas · 2.500 unidades",
    detail: "Caja de alto rendimiento para empresas y comercios.",
    saleUnit: "1 caja x2.500",
    sourcePack: "Caja cerrada",
    price: "$40.060",
    category: "intercaladas",
    image: embeddedImages["/products/toallas-intercaladas-blancas-2500.webp"],
  },
  {
    name: "Servilletas 30 × 30",
    brand: "Línea gastronómica",
    quality: "Formato 30 × 30 cm",
    detail: "Caja cerrada para gastronomía, eventos o uso diario.",
    saleUnit: "1 caja",
    sourcePack: "Caja cerrada",
    price: "$18.320",
    category: "intercaladas",
    image: embeddedImages["/products/servilletas-30x30-caja.webp"],
  },
  {
    name: "Rollo Cocina 120 Paños",
    brand: "Newpel",
    quality: "120 paños por rollo",
    detail: "Paquete cerrado con tres rollos rendidores.",
    saleUnit: "1 paquete x3",
    sourcePack: "Presentación original: 4 paquetes",
    price: "$5.970",
    category: "cocina",
    image: embeddedImages["/products/newpel-cocina-120-panos-x3.webp"],
  },
  {
    name: "Rollo Cocina Gigante 150 Paños",
    brand: "Newpel",
    quality: "150 paños por rollo",
    detail: "Formato gigante. Disponibilidad y precio a confirmar.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x8",
    category: "cocina",
    image: embeddedImages["/products/newpel-cocina-150-panos.webp"],
  },
  {
    name: "Rollo Cocina Gigante 200 Paños",
    brand: "Newpel",
    quality: "200 paños por rollo",
    detail: "El mayor formato de la línea. Precio a confirmar.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x12",
    category: "cocina",
    image: embeddedImages["/products/newpel-cocina-200-panos.webp"],
  },
];

const categories = [
  {
    id: "higienicos",
    kicker: "Para el baño",
    title: "Papeles higiénicos",
    description: "Desde la opción clásica hasta líneas extra blancas, jumbo y doble hoja.",
  },
  {
    id: "bobinas",
    kicker: "Alto rendimiento",
    title: "Bobinas y toallas",
    description: "Formatos profesionales para secado, limpieza y dispenser.",
  },
  {
    id: "intercaladas",
    kicker: "Para dispenser y mesa",
    title: "Intercaladas y servilletas",
    description: "Paquetes y cajas para hogares, comercios e instituciones.",
  },
  {
    id: "cocina",
    kicker: "Marca Newpel",
    title: "Rollos de cocina",
    description: "Packs de gran rendimiento para las tareas de todos los días.",
  },
] as const;

const combos = [
  {
    id: "casa-rendidora",
    label: "Para tener de sobra",
    name: "Casa rendidora",
    description: "Baño y cocina cubiertos para no salir corriendo a reponer.",
    discountRate: 0.04,
    items: [
      { name: "Papel Higiénico 80 m", quantity: 6 },
      { name: "Rollo Cocina 120 Paños", quantity: 1 },
    ],
  },
  {
    id: "comercio-al-dia",
    label: "Para local u oficina",
    name: "Comercio al día",
    description: "Un armado práctico para baño y secado de uso frecuente.",
    discountRate: 0.04,
    items: [
      { name: "Papel Higiénico Jumbo Eco", quantity: 2 },
      { name: "Toalla de Papel 200 m", quantity: 1 },
      { name: "Toallas Intercaladas Beige", quantity: 2 },
    ],
  },
  {
    id: "doble-hoja",
    label: "Más comodidad",
    name: "Doble hoja",
    description: "Papel de baño y cocina en formatos cerrados y rendidores.",
    discountRate: 0.04,
    items: [
      { name: "Doble Hoja 20 m", quantity: 2 },
      { name: "Rollo Cocina 120 Paños", quantity: 2 },
    ],
  },
] as const;

const productUseCases: Record<string, string> = {
  "Papel Higiénico 30 m": "Hogar · uso diario",
  "Papel Higiénico 80 m": "Hogar · mayor duración",
  "Papel Higiénico Extra Blanco": "Hogar y oficina",
  "Papel Higiénico Jumbo Eco": "Comercios · alto tránsito",
  "Papel Higiénico Jumbo Extra Blanco": "Oficinas e instituciones",
  "Papel Higiénico Premium 300 m": "Alto consumo · dispenser jumbo",
  "Max Plus 80 m": "Hogar · pack cerrado",
  "Doble Hoja 20 m": "Hogar · mayor suavidad",
  "Toalla de Papel 200 m": "Comercio y gastronomía",
  "Toalla de Papel Blanca 200 m": "Oficinas y atención al público",
  "Bobina de Papel 24 cm": "Cocina profesional y limpieza",
  "Bobina Blanca Doble Hoja": "Gastronomía · alta absorción",
  "Toallas Intercaladas Beige": "Baños de uso frecuente",
  "Toallas Intercaladas Blancas NP": "Oficinas y consultorios",
  "Toallas Intercaladas Premium": "Instituciones · consumo intensivo",
  "Toallas Intercaladas Blancas": "Empresas y grandes comercios",
  "Servilletas 30 × 30": "Gastronomía y eventos",
  "Rollo Cocina 120 Paños": "Hogar · pack rendidor",
  "Rollo Cocina Gigante 150 Paños": "Hogar · gran formato",
  "Rollo Cocina Gigante 200 Paños": "Alto consumo · gran formato",
};

// Tope validado fuera del sitio contra los costos actuales, incluyendo el recargo
// del proveedor, una reserva operativa del 8% y un aporte mínimo del 18%.
// Los costos mayoristas no se publican en este repositorio abierto.
const validatedMaximumDiscountRate = 0.05;
const partyColors = ["#79cbed", "#f4cb3c", "#ffffff", "#0e4d92", "#a8dab7"];

const builderProductNames = [
  "Papel Higiénico 80 m",
  "Papel Higiénico Extra Blanco",
  "Papel Higiénico Jumbo Eco",
  "Doble Hoja 20 m",
  "Toallas Intercaladas Beige",
  "Toallas Intercaladas Blancas NP",
  "Toalla de Papel 200 m",
  "Rollo Cocina 120 Paños",
] as const;

const builderPresets = [
  {
    id: "casa",
    label: "Para casa",
    caption: "Baño y cocina",
    quantities: {
      "Papel Higiénico 80 m": 5,
      "Rollo Cocina 120 Paños": 2,
      "Doble Hoja 20 m": 1,
    },
  },
  {
    id: "comercio",
    label: "Para comercio",
    caption: "Alto movimiento",
    quantities: {
      "Papel Higiénico Jumbo Eco": 5,
      "Toallas Intercaladas Beige": 5,
      "Toalla de Papel 200 m": 2,
    },
  },
  {
    id: "oficina",
    label: "Para oficina",
    caption: "Prolijo y rendidor",
    quantities: {
      "Papel Higiénico Extra Blanco": 5,
      "Toallas Intercaladas Blancas NP": 5,
      "Rollo Cocina 120 Paños": 1,
    },
  },
] as const;

const botRecommendations: BotRecommendation[] = [
  {
    id: "casa-chica",
    audience: "casa",
    eyebrow: "1 o 2 personas",
    name: "Casa práctica",
    description: "Baño y cocina cubiertos con formatos cerrados y fáciles de guardar.",
    items: [
      { name: "Max Plus 80 m", quantity: 1 },
      { name: "Rollo Cocina 120 Paños", quantity: 1 },
    ],
  },
  {
    id: "casa-media",
    audience: "casa",
    eyebrow: "3 o 4 personas",
    name: "Casa rendidora",
    description: "Una formación equilibrada para reponer menos y tener variedad.",
    items: [
      { name: "Papel Higiénico 80 m", quantity: 5 },
      { name: "Rollo Cocina 120 Paños", quantity: 2 },
      { name: "Doble Hoja 20 m", quantity: 1 },
    ],
  },
  {
    id: "casa-grande",
    audience: "casa",
    eyebrow: "5 personas o más",
    name: "Familia con aguante",
    description: "Más cantidad y el descuento máximo en el papel rendidor.",
    items: [
      { name: "Papel Higiénico 80 m", quantity: 10 },
      { name: "Rollo Cocina 120 Paños", quantity: 2 },
    ],
  },
  {
    id: "comercio-chico",
    audience: "comercio",
    eyebrow: "Local o consultorio",
    name: "Movimiento tranquilo",
    description: "Lo esencial para baño y secado sin ocupar demasiado espacio.",
    items: [
      { name: "Papel Higiénico Jumbo Eco", quantity: 2 },
      { name: "Toalla de Papel 200 m", quantity: 1 },
      { name: "Toallas Intercaladas Beige", quantity: 2 },
    ],
  },
  {
    id: "oficina",
    audience: "comercio",
    eyebrow: "Equipo u oficina",
    name: "Oficina prolija",
    description: "Papeles blancos y una reposición pensada para uso cotidiano.",
    items: [
      { name: "Papel Higiénico Extra Blanco", quantity: 5 },
      { name: "Toallas Intercaladas Blancas NP", quantity: 5 },
      { name: "Rollo Cocina 120 Paños", quantity: 1 },
    ],
  },
  {
    id: "alto-transito",
    audience: "comercio",
    eyebrow: "Alto tránsito",
    name: "Comercio a full",
    description: "Formatos institucionales para baños con movimiento todos los días.",
    items: [
      { name: "Papel Higiénico Jumbo Eco", quantity: 5 },
      { name: "Toallas Intercaladas Beige", quantity: 5 },
      { name: "Toalla de Papel 200 m", quantity: 2 },
    ],
  },
];

const weeklyOffers = [
  {
    id: "papel-80",
    productName: "Papel Higiénico 80 m",
    quantity: 10,
    headline: "Diez rollos. Cero apuro.",
    description: "El rendidor del catálogo para olvidarte de reponer por un buen rato.",
  },
  {
    id: "extra-blanco",
    productName: "Papel Higiénico Extra Blanco",
    quantity: 10,
    headline: "Más blanco, menos vueltas.",
    description: "Un armado práctico para casa, oficina o consultorio.",
  },
  {
    id: "intercaladas",
    productName: "Toallas Intercaladas Beige",
    quantity: 10,
    headline: "El dispenser, resuelto.",
    description: "Paquetes rendidores para baños con movimiento todos los días.",
  },
  {
    id: "papel-30",
    productName: "Papel Higiénico 30 m",
    quantity: 10,
    headline: "La clásica del barrio.",
    description: "Una opción simple y económica para tener siempre a mano.",
  },
] as const;

const shippingZones = [
  {
    id: "cercania",
    name: "Cercanía Quesada y Cabildo",
    detail: "Belgrano, Núñez, Coghlan, Saavedra, Villa Urquiza y Colegiales",
    price: 4900,
  },
  {
    id: "norte-centro",
    name: "CABA norte y centro",
    detail: "Palermo, Recoleta, Chacarita, Villa Crespo, Retiro y Centro",
    price: 6900,
  },
  {
    id: "resto-caba",
    name: "Resto de CABA",
    detail: "Barrios de Capital no incluidos en las zonas anteriores",
    price: 8900,
  },
] as const;

type ShippingZoneId = (typeof shippingZones)[number]["id"];

const faqs = [
  {
    question: "¿Cómo recibo el link de Mercado Pago?",
    answer: "Cuando mandás el pedido confirmamos stock y envío. Después te enviamos por WhatsApp el enlace seguro de Mercado Pago.",
  },
  {
    question: "¿El envío ya está incluido?",
    answer: "No. Para CABA elegís una zona y ves la tarifa antes de enviar el pedido. El retiro es sin cargo y los envíos por correo o transporte se cotizan aparte.",
  },
  {
    question: "¿Cómo funcionan los descuentos por cantidad?",
    answer: "Aplicamos 3% desde 5 unidades y 5% desde 10 unidades del mismo producto. Si sumaste un combo, el carrito compara las promociones y usa automáticamente la que más te conviene; no se acumulan.",
  },
  {
    question: "¿Dónde se puede retirar?",
    answer: "El punto de retiro se coordina por la zona de Quesada y Cabildo, en Capital Federal.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer: "Sí. Podemos despachar por correo o transporte. El costo y el plazo dependen de la localidad y del volumen del pedido.",
  },
  {
    question: "¿Qué pasa si un producto no tiene stock?",
    answer: "Te avisamos antes de pagar y te proponemos una alternativa equivalente. Nunca reemplazamos un producto sin consultarte.",
  },
  {
    question: "¿Puedo cambiar un producto?",
    answer: "Si el pedido todavía no fue despachado, escribinos con tu número de pedido y revisamos el cambio. Si ya fue entregado, debe conservarse cerrado y sin uso.",
  },
] as const;

function wa(message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function priceNumber(price?: string) {
  return price ? Number(price.replace(/[^\d]/g, "")) : 0;
}

function money(value: number) {
  return `$${new Intl.NumberFormat("es-AR").format(Math.round(value))}`;
}

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("es-AR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function volumeDiscountRate(_product: Product, quantity: number) {
  const requestedRate = quantity >= 10 ? 0.05 : quantity >= 5 ? 0.03 : 0;
  return Math.min(requestedRate, validatedMaximumDiscountRate);
}

function botRecommendationTotal(recommendation: BotRecommendation) {
  const baseTotal = recommendation.items.reduce((total, item) => {
    const product = products.find((candidate) => candidate.name === item.name);
    return total + priceNumber(product?.price) * item.quantity;
  }, 0);
  const savings = recommendation.items.reduce((total, item) => {
    const product = products.find((candidate) => candidate.name === item.name);
    if (!product) return total;
    return (
      total +
      priceNumber(product.price) *
        item.quantity *
        volumeDiscountRate(product, item.quantity)
    );
  }, 0);
  return Math.round(baseTotal - savings);
}

function comboSafeDiscountRate(combo: (typeof combos)[number]) {
  return Math.min(combo.discountRate, validatedMaximumDiscountRate);
}

function currentWeeklyOffer() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), 0, 1);
  const elapsedDays = Math.floor((now.getTime() - firstDay.getTime()) / 86_400_000);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const weekNumber = Math.floor((elapsedDays + mondayOffset) / 7);
  return weeklyOffers[weekNumber % weeklyOffers.length];
}

function discountOpportunity(items: Array<{ product: Product; quantity: number }>) {
  const candidates = items
    .filter((item) => item.quantity > 0 && item.quantity < 10)
    .map((item) => {
      const target = item.quantity < 5 ? 5 : 10;
      return {
        ...item,
        target,
        remaining: target - item.quantity,
        nextRate: target === 5 ? 3 : 5,
        progress: Math.round((item.quantity / target) * 100),
      };
    })
    .sort(
      (first, second) =>
        first.remaining - second.remaining ||
        priceNumber(second.product.price) - priceNumber(first.product.price),
    );

  if (candidates.length) return candidates[0];

  const maximumLine = items.find((item) => item.quantity >= 10);
  if (!maximumLine) return null;
  return {
    ...maximumLine,
    target: 10,
    remaining: 0,
    nextRate: 5,
    progress: 100,
  };
}

function BotMascot({ large = false }: { large?: boolean }) {
  return (
    <span className={large ? "bot-roll-icon large" : "bot-roll-icon"} aria-hidden="true">
      <span>🧻</span>
    </span>
  );
}

function ProductVisual({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <div className="product-photo">
      <img
        src={product.image}
        alt={`${product.brand}: ${product.name}, ${product.sourcePack}`}
        width={1024}
        height={1024}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="brand-ribbon">{product.brand}</span>
      <span className="quality-stamp">{product.quality}</span>
    </div>
  );
}

function ProductCard({
  product,
  onView,
  onAdd,
}: {
  product: Product;
  onView: (product: Product) => void;
  onAdd: (product: Product) => void;
}) {
  const message = product.price
    ? `¡Hola! Quiero consultar por ${product.name} (${product.saleUnit}) a ${product.price}.`
    : `¡Hola! Quiero consultar precio y disponibilidad de ${product.name}.`;

  return (
    <article className="product-card">
      <button
        className="product-visual-button"
        type="button"
        onClick={() => onView(product)}
        aria-label={`Ver detalle de ${product.name}`}
      >
        <ProductVisual product={product} />
      </button>
      <div className="product-info">
        <div className="product-brand">
          <span>{product.brand}</span>
          <span>{product.quality}</span>
        </div>
        <h3>{product.name}</h3>
        <span className="use-case">{productUseCases[product.name]}</span>
        <p>{product.detail}</p>
        <dl>
          <div><dt>Unidad de venta</dt><dd>{product.saleUnit}</dd></div>
          <div><dt>Presentación</dt><dd>{product.sourcePack}</dd></div>
        </dl>
        <div className="price-row">
          <div className={product.price ? "" : "price-pending"}>
            <small>{product.price ? "Precio final" : "Precio"}</small>
            <strong>{product.price ?? "Consultar"}</strong>
          </div>
          {product.price && <span className="volume-hint">3% desde 5 · 5% desde 10</span>}
        </div>
        <div className="product-actions">
          <button type="button" className="detail-button" onClick={() => onView(product)}>
            Ver detalle
          </button>
          {product.price ? (
            <button type="button" className="add-button" onClick={() => onAdd(product)}>
              Agregar <span>＋</span>
            </button>
          ) : (
            <a className="consult-button" href={wa(message)} target="_blank" rel="noreferrer">
              Consultar <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCombos, setActiveCombos] = useState<Record<string, number>>({});
  const [builderQuantities, setBuilderQuantities] = useState<Record<string, number>>({});
  const [selectedBuilderPreset, setSelectedBuilderPreset] = useState<string | null>("libre");
  const [catalogQuery, setCatalogQuery] = useState("");
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>("todos");
  const [celebrationId, setCelebrationId] = useState(0);
  const [cartReady, setCartReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [botOpen, setBotOpen] = useState(false);
  const [botView, setBotView] = useState<BotView>("menu");
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderNumber: string;
    whatsAppUrl: string;
    payment: "mercadopago" | "efectivo";
  } | null>(null);
  const [delivery, setDelivery] = useState<"domicilio" | "retiro" | "correo">("domicilio");
  const [shippingZone, setShippingZone] = useState<ShippingZoneId>("cercania");
  const [payment, setPayment] = useState<"mercadopago" | "efectivo">("mercadopago");

  useEffect(() => {
    const restoreCart = window.setTimeout(() => {
      try {
        const savedCart = window.localStorage.getItem("republica-del-trapo-cart");
        const savedCombos = window.localStorage.getItem("republica-del-trapo-combos");
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedCombos) setActiveCombos(JSON.parse(savedCombos));
      } catch {
        // Si el navegador bloquea el guardado, el carrito sigue funcionando en la sesión.
      } finally {
        setCartReady(true);
      }
    }, 0);
    return () => window.clearTimeout(restoreCart);
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    window.localStorage.setItem("republica-del-trapo-cart", JSON.stringify(cart));
    window.localStorage.setItem("republica-del-trapo-combos", JSON.stringify(activeCombos));
  }, [cart, activeCombos, cartReady]);

  useEffect(() => {
    if (!cartReady || Object.keys(cart).length || !Object.keys(activeCombos).length) return;
    setActiveCombos({});
  }, [cart, activeCombos, cartReady]);

  useEffect(() => {
    if (!celebrationId) return;
    const timer = window.setTimeout(() => setCelebrationId(0), 1250);
    return () => window.clearTimeout(timer);
  }, [celebrationId]);

  useEffect(() => {
    const panelIsOpen = Boolean(selectedProduct || cartOpen || checkoutOpen || orderConfirmation);
    document.body.classList.toggle("panel-is-open", panelIsOpen);

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setSelectedProduct(null);
      setCartOpen(false);
      setCheckoutOpen(false);
      setBotOpen(false);
      setOrderConfirmation(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("panel-is-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProduct, cartOpen, checkoutOpen, orderConfirmation]);

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => product.price && cart[product.name])
        .map((product) => ({ product, quantity: cart[product.name] })),
    [cart],
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + priceNumber(item.product.price) * item.quantity,
    0,
  );
  const volumeSavings = Math.round(
    cartItems.reduce(
      (total, item) =>
        total +
        priceNumber(item.product.price) *
          item.quantity *
          volumeDiscountRate(item.product, item.quantity),
      0,
    ),
  );
  const appliedCombos = useMemo(() => {
    const remainingCart = { ...cart };
    return combos.map((combo) => {
      const requestedCombos = activeCombos[combo.id] ?? 0;
      const availableCombos = combo.items.reduce(
        (available, item) =>
          Math.min(available, Math.floor((remainingCart[item.name] ?? 0) / item.quantity)),
        requestedCombos,
      );
      if (availableCombos > 0) {
        combo.items.forEach((item) => {
          remainingCart[item.name] = (remainingCart[item.name] ?? 0) - item.quantity * availableCombos;
        });
      }
      return { combo, quantity: availableCombos };
    });
  }, [cart, activeCombos]);
  const comboSavings = Math.round(
    appliedCombos.reduce((total, { combo, quantity }) => {
      if (!quantity) return total;
      const comboTotal = combo.items.reduce((comboSum, item) => {
        const product = products.find((candidate) => candidate.name === item.name);
        return comboSum + priceNumber(product?.price) * item.quantity;
      }, 0);
      return total + comboTotal * comboSafeDiscountRate(combo) * quantity;
    }, 0),
  );
  const promotionSavings = Math.min(subtotal, Math.max(volumeSavings, comboSavings));
  const productsTotal = subtotal - promotionSavings;
  const promotionLabel =
    promotionSavings === comboSavings && comboSavings > 0
      ? "Ahorro por combo"
      : "Descuento por cantidad";
  const selectedShippingZone = shippingZones.find((zone) => zone.id === shippingZone)!;
  const homeDeliveryMinimumMissing = Math.max(0, minimumHomeDeliveryOrder - subtotal);
  const homeDeliveryBlocked = delivery === "domicilio" && homeDeliveryMinimumMissing > 0;
  const shippingCost =
    delivery === "domicilio" ? selectedShippingZone.price : delivery === "retiro" ? 0 : null;
  const orderTotal = shippingCost === null ? null : productsTotal + shippingCost;
  const detailBaseTotal = selectedProduct
    ? priceNumber(selectedProduct.price) * detailQuantity
    : 0;
  const detailSavings = selectedProduct
    ? Math.round(detailBaseTotal * volumeDiscountRate(selectedProduct, detailQuantity))
    : 0;
  const detailTotal = detailBaseTotal - detailSavings;
  const cartOpportunity = discountOpportunity(cartItems);
  const builderItems = useMemo(
    () =>
      builderProductNames
        .map((name) => products.find((product) => product.name === name))
        .filter((product): product is Product => Boolean(product?.price))
        .map((product) => ({ product, quantity: builderQuantities[product.name] ?? 0 }))
        .filter((item) => item.quantity > 0),
    [builderQuantities],
  );
  const builderCount = builderItems.reduce((total, item) => total + item.quantity, 0);
  const builderSubtotal = builderItems.reduce(
    (total, item) => total + priceNumber(item.product.price) * item.quantity,
    0,
  );
  const builderSavings = Math.round(
    builderItems.reduce(
      (total, item) =>
        total +
        priceNumber(item.product.price) *
          item.quantity *
          volumeDiscountRate(item.product, item.quantity),
      0,
    ),
  );
  const builderTotal = builderSubtotal - builderSavings;
  const builderOpportunity = discountOpportunity(builderItems);
  const weeklyOffer = currentWeeklyOffer();
  const weeklyOfferProduct = products.find(
    (product) => product.name === weeklyOffer.productName,
  )!;
  const weeklyOfferBaseTotal =
    priceNumber(weeklyOfferProduct.price) * weeklyOffer.quantity;
  const weeklyOfferSavings = Math.round(
    weeklyOfferBaseTotal *
      volumeDiscountRate(weeklyOfferProduct, weeklyOffer.quantity),
  );
  const weeklyOfferTotal = weeklyOfferBaseTotal - weeklyOfferSavings;
  const normalizedCatalogQuery = normalizeSearch(catalogQuery.trim());
  const filteredCatalogProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          catalogFilter === "todos" || product.category === catalogFilter;
        if (!matchesCategory) return false;
        if (!normalizedCatalogQuery) return true;
        return normalizeSearch(
          [
            product.name,
            product.brand,
            product.quality,
            product.detail,
            productUseCases[product.name],
          ].join(" "),
        ).includes(normalizedCatalogQuery);
      }),
    [catalogFilter, normalizedCatalogQuery],
  );
  const catalogIsPreview = catalogFilter === "todos" && !normalizedCatalogQuery;
  const visibleCatalogCategories = categories
    .map((category) => {
      const matchingProducts = filteredCatalogProducts.filter(
        (product) => product.category === category.id,
      );
      return {
        ...category,
        matchingProducts,
        visibleProducts: catalogIsPreview
          ? matchingProducts.slice(0, 4)
          : matchingProducts,
      };
    })
    .filter((category) => category.matchingProducts.length > 0);

  function celebrate() {
    setCelebrationId(Date.now());
  }

  function addToCart(product: Product, quantity = 1) {
    if (!product.price) {
      setSelectedProduct(product);
      return;
    }
    setCart((current) => ({
      ...current,
      [product.name]: (current[product.name] ?? 0) + quantity,
    }));
    setSelectedProduct(null);
    setDetailQuantity(1);
    setCartOpen(true);
    celebrate();
  }

  function changeQuantity(productName: string, change: number) {
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[productName] ?? 0) + change);
      const nextCart = { ...current };
      if (nextQuantity === 0) delete nextCart[productName];
      else nextCart[productName] = nextQuantity;
      return nextCart;
    });
  }

  function openDetail(product: Product) {
    setDetailQuantity(1);
    setSelectedProduct(product);
  }

  function beginCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function addCombo(combo: (typeof combos)[number]) {
    setCart((current) => {
      const nextCart = { ...current };
      combo.items.forEach((item) => {
        nextCart[item.name] = (nextCart[item.name] ?? 0) + item.quantity;
      });
      return nextCart;
    });
    setActiveCombos((current) => ({
      ...current,
      [combo.id]: (current[combo.id] ?? 0) + 1,
    }));
    setCartOpen(true);
    celebrate();
  }

  function applyBuilderPreset(preset: (typeof builderPresets)[number]) {
    setBuilderQuantities({ ...preset.quantities });
    setSelectedBuilderPreset(preset.id);
  }

  function changeBuilderQuantity(productName: string, change: number) {
    setSelectedBuilderPreset(null);
    setBuilderQuantities((current) => {
      const nextQuantity = Math.max(0, (current[productName] ?? 0) + change);
      const next = { ...current };
      if (nextQuantity === 0) delete next[productName];
      else next[productName] = nextQuantity;
      return next;
    });
  }

  function addBuilderToCart() {
    if (!builderItems.length) return;
    setCart((current) => {
      const next = { ...current };
      builderItems.forEach(({ product, quantity }) => {
        next[product.name] = (next[product.name] ?? 0) + quantity;
      });
      return next;
    });
    setCartOpen(true);
    celebrate();
  }

  function showBotView(view: BotView) {
    setBotView(view);
  }

  function addBotRecommendation(recommendation: BotRecommendation) {
    setCart((current) => {
      const next = { ...current };
      recommendation.items.forEach((item) => {
        next[item.name] = (next[item.name] ?? 0) + item.quantity;
      });
      return next;
    });
    setBotOpen(false);
    setBotView("menu");
    setCartOpen(true);
    celebrate();
  }

  function sendOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (homeDeliveryBlocked) return;
    const data = new FormData(event.currentTarget);
    const customerName = String(data.get("name") ?? "").trim();
    const customerPhone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    const deliveryText =
      delivery === "retiro"
        ? "Retiro en punto a coordinar por Quesada y Cabildo"
        : delivery === "domicilio"
          ? `Envío a domicilio · ${selectedShippingZone.name} (${money(selectedShippingZone.price)})${address ? `: ${address}` : ""}`
          : `Correo o transporte a todo el país${address ? `: ${address}` : ""}`;
    const paymentText =
      payment === "mercadopago"
        ? "Mercado Pago — enviar enlace de pago después de confirmar stock y envío"
        : "Efectivo al entregar o retirar";
    const itemLines = cartItems.map(
      ({ product, quantity }) =>
        `• ${quantity} × ${product.name} (${product.saleUnit}) — ${money(priceNumber(product.price) * quantity)}`,
    );
    const now = new Date();
    const datePart = [
      String(now.getFullYear()).slice(-2),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("");
    const orderNumber = `RDT-${datePart}-${String(now.getTime()).slice(-4)}`;
    const message = [
      "¡Hola, República del Trapo! Quiero confirmar este pedido:",
      `Pedido: ${orderNumber}`,
      "",
      ...itemLines,
      "",
      `Subtotal de lista: ${money(subtotal)}`,
      promotionSavings ? `${promotionLabel}: -${money(promotionSavings)}` : "",
      `Total de productos: ${money(productsTotal)}`,
      delivery === "domicilio"
        ? `Envío: ${money(selectedShippingZone.price)}`
        : delivery === "retiro"
          ? "Envío: sin cargo — retiro"
          : "Envío: a cotizar según correo o transporte",
      orderTotal !== null ? `TOTAL DEL PEDIDO: ${money(orderTotal)}` : "",
      "",
      `Nombre: ${customerName}`,
      `Teléfono: ${customerPhone}`,
      email ? `Email: ${email}` : "",
      `Entrega: ${deliveryText}`,
      `Pago: ${paymentText}`,
      notes ? `Aclaraciones: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsAppUrl = wa(message);
    setCheckoutOpen(false);
    setOrderConfirmation({ orderNumber, whatsAppUrl, payment });
    window.open(whatsAppUrl, "_blank", "noopener,noreferrer");
  }

  function finishOrder() {
    setCart({});
    setActiveCombos({});
    setOrderConfirmation(null);
  }

  return (
    <main>
      <div className="topline">
        Precios por unidad · Carrito simple · Mercado Pago y efectivo · Envíos a todo el país
      </div>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="República del Trapo, inicio">
          <img
            className="brand-logo"
            src={embeddedImages["/brand/republica-del-trapo-logo-trimmed.png"]}
            alt="República del Trapo · Limpieza Nacional"
            width={1522}
            height={531}
            decoding="sync"
          />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#catalogo" onClick={() => setCatalogFilter("higienicos")}>Higiénicos</a>
          <a href="#catalogo" onClick={() => setCatalogFilter("bobinas")}>Bobinas</a>
          <a href="#catalogo" onClick={() => setCatalogFilter("intercaladas")}>Intercaladas</a>
          <a href="#catalogo" onClick={() => setCatalogFilter("cocina")}>Cocina</a>
          <a href="#oferta-del-barrio">Oferta</a>
          <a href="#arma-tu-pedido">Armá la tuya</a>
        </nav>
        <button className="nav-cta" type="button" onClick={() => setCartOpen(true)}>
          <span className="nav-cta-label">Mi carrito</span>
          <span className="cart-count" aria-label={`${cartCount} productos`}>{cartCount}</span>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">★ Del barrio para todo el país</p>
          <h1>Papel que<br /><span>rinde.</span></h1>
          <p className="painted-line">Bien argento. Sin chamuyo.</p>
          <p className="lead">
            Higiénicos, bobinas, toallas y servilletas con <b>precios claros</b>,
            presentaciones reales y un carrito fácil para armar tu pedido.
          </p>
          <div className="buttons">
            <a className="button primary" href="#catalogo">Ver catálogo <span>↓</span></a>
            <a className="button secondary" href="#arma-tu-pedido">
              Armar mi pedido <span>→</span>
            </a>
          </div>
          <div className="benefits">
            <p><i>1</i><span><b>Precio unitario</b><small>Sabés cuánto pagás</small></span></p>
            <p><i>✓</i><span><b>Calidad identificada</b><small>Simple, doble o premium</small></span></p>
            <p><i>＋</i><span><b>Carrito claro</b><small>Cantidades y subtotal a la vista</small></span></p>
          </div>
        </div>

        <div className="hero-art" aria-label="Productos de República del Trapo">
          <div className="burst" />
          <div className="hero-seal">DE BARRIO<br />Y SIN<br />VUELTAS</div>
          <div className="hero-products">
            <figure className="hero-product hero-product-higienol">
              <figcaption>HIGIÉNICOS</figcaption>
              <img
                src={embeddedImages["/products/higienol-max-plus-80m-x4.webp"]}
                alt="Higienol Max Plus de 80 metros, paquete de cuatro rollos"
                width={900}
                height={900}
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="hero-product hero-product-newpel">
              <figcaption>COCINA</figcaption>
              <img
                src={embeddedImages["/products/newpel-cocina-120-panos-x3.webp"]}
                alt="Newpel rollo de cocina de 120 paños, paquete de tres rollos"
                width={900}
                height={900}
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="hero-product hero-product-jumbo">
              <figcaption>INSTITUCIONAL</figcaption>
              <img
                src={embeddedImages["/products/jumbo-premium-300m-x8.webp"]}
                alt="Papel higiénico jumbo premium de 300 metros"
                width={900}
                height={900}
                loading="eager"
                decoding="async"
              />
            </figure>
          </div>
          <div className="hero-note"><b>20 PRODUCTOS</b><small>Precios por unidad</small></div>
        </div>
      </section>

      <div className="ticker">
        HOJA SIMPLE <b>✦</b> DOBLE HOJA <b>✦</b> EXTRA BLANCO <b>✦</b> JUMBO <b>✦</b> PREMIUM
      </div>

      <section className="weekly-offer shell" id="oferta-del-barrio">
        <div className="offer-copy">
          <p className="offer-kicker">La oferta del barrio · cambia cada semana</p>
          <h2>{weeklyOffer.headline}</h2>
          <p>{weeklyOffer.description}</p>
          <div className="offer-pricing">
            <span>
              <small>Precio de lista</small>
              <del>{money(weeklyOfferBaseTotal)}</del>
            </span>
            <span>
              <small>Precio del barrio</small>
              <strong>{money(weeklyOfferTotal)}</strong>
            </span>
          </div>
          <p className="offer-saving">
            Ahorrás {money(weeklyOfferSavings)} · 5% aplicado automáticamente
          </p>
          <button
            className="offer-button"
            type="button"
            onClick={() => addToCart(weeklyOfferProduct, weeklyOffer.quantity)}
          >
            Sumar la oferta <span>＋</span>
          </button>
          <small className="offer-honesty">
            Sin reloj falso ni letra chica: es el descuento real por llevar 10 unidades.
          </small>
        </div>
        <div className="offer-visual">
          <div className="offer-sun" />
          <span className="offer-badge">5%<small>menos</small></span>
          <span className="offer-week">SELECCIÓN SEMANAL</span>
          <figure>
            <img
              src={weeklyOfferProduct.image}
              alt={`${weeklyOffer.quantity} unidades de ${weeklyOfferProduct.name}`}
              width={720}
              height={720}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <b>{weeklyOffer.quantity}×</b>
              <span>{weeklyOfferProduct.name}</span>
              <small>{weeklyOfferProduct.saleUnit} cada uno</small>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="patria-mural" aria-labelledby="mural-title">
        <img
          className="patria-mural-art"
          src={embeddedImages["/brand/mural-patria-barrio.webp"]}
          alt="Mural argentino con el Obelisco, las Islas Malvinas, el Sol de Mayo y un homenaje futbolero al número diez"
          width={1536}
          height={1024}
          loading="eager"
          decoding="async"
        />
        <div className="patria-mural-shade" />
        <div className="patria-mural-copy">
          <p className="mural-script">Papel, barrio y palabra.</p>
          <h2 id="mural-title">Lo nuestro<br /><span>se defiende.</span></h2>
          <p>
            Productos que rinden, precios de frente y atención de persona a persona.
          </p>
          <div className="mural-badges" aria-label="Valores de la marca">
            <span>PRECIO CLARO</span>
            <span>TRATO DIRECTO</span>
            <span>ORGULLO ARGENTINO</span>
          </div>
        </div>
      </section>

      <div className="catalog-area">
      <section className="catalog-intro shell" id="catalogo">
        <div>
          <p className="eyebrow">El seleccionado del barrio</p>
          <h2>Elegí sin<br />comprar a ciegas.</h2>
        </div>
        <div className="catalog-intro-copy">
          <p>
            Cada ficha muestra la <strong>marca cuando está indicada</strong>, la calidad,
            la presentación original y la unidad que realmente te llevás.
          </p>
          <p className="image-disclaimer">
            Imágenes recreadas a partir de las presentaciones de referencia. El diseño del
            envase puede variar según disponibilidad del proveedor.
          </p>
        </div>
      </section>

      <section className="catalog-tools" aria-label="Buscar y filtrar productos">
        <label className="catalog-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={catalogQuery}
            onChange={(event) => setCatalogQuery(event.target.value)}
            placeholder="Buscar por producto, marca o calidad"
            aria-label="Buscar productos"
          />
        </label>
        <div className="category-links" aria-label="Filtrar por categoría">
          <button
            className={catalogFilter === "todos" ? "selected" : ""}
            type="button"
            onClick={() => setCatalogFilter("todos")}
          >
            Todo
          </button>
          {categories.map((category) => (
            <button
              className={catalogFilter === category.id ? "selected" : ""}
              type="button"
              key={category.id}
              onClick={() => setCatalogFilter(category.id)}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="catalog-result-count" aria-live="polite">
          <span><b>{filteredCatalogProducts.length}</b> {filteredCatalogProducts.length === 1 ? "producto encontrado" : "productos encontrados"}</span>
          {(catalogQuery || catalogFilter !== "todos") && (
            <button
              type="button"
              onClick={() => {
                setCatalogQuery("");
                setCatalogFilter("todos");
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      <section className="catalog-shell">
        {visibleCatalogCategories.map((category) => {
          const categoryIndex = categories.findIndex(
            (candidate) => candidate.id === category.id,
          );
          return (
          <div className="category-section" id={category.id} key={category.id}>
            <header className="category-heading">
              <div>
                <span>0{categoryIndex + 1}</span>
                <p>{category.kicker}</p>
              </div>
              <div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
                {category.matchingProducts.length > category.visibleProducts.length && (
                  <button
                    className="show-category"
                    type="button"
                    onClick={() => setCatalogFilter(category.id)}
                  >
                    Ver los {category.matchingProducts.length} productos <span>→</span>
                  </button>
                )}
              </div>
            </header>
            <div className="product-grid">
              {category.visibleProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product.name}
                  onView={openDetail}
                  onAdd={addToCart}
                />
              ))}
            </div>
          </div>
          );
        })}
        {!visibleCatalogCategories.length && (
          <div className="catalog-empty">
            <span>⌕</span>
            <h3>No encontramos ese producto.</h3>
            <p>Probá con “Newpel”, “doble hoja”, “bobina” o elegí otra categoría.</p>
            <button
              type="button"
              onClick={() => {
                setCatalogQuery("");
                setCatalogFilter("todos");
              }}
            >
              Ver todo el catálogo
            </button>
          </div>
        )}
      </section>
      </div>

      <section className="combos shell" id="combos">
        <header className="combos-heading">
          <div>
            <p className="eyebrow">Armados para resolver</p>
            <h2>Combos del<br />barrio.</h2>
          </div>
          <p>
            Elegimos productos que se usan juntos y les aplicamos un ahorro real.
            Sumás el combo, revisás las cantidades y podés cambiar todo antes de pedir.
          </p>
        </header>
        <div className="combo-grid">
          {combos.map((combo, index) => {
            const comboTotal = combo.items.reduce((total, item) => {
              const product = products.find((candidate) => candidate.name === item.name);
              return total + priceNumber(product?.price) * item.quantity;
            }, 0);
            const comboSavingsAmount = Math.round(comboTotal * comboSafeDiscountRate(combo));
            const comboOfferPrice = comboTotal - comboSavingsAmount;
            return (
              <article className="combo-card" key={combo.id}>
                <span className="combo-number">0{index + 1}</span>
                <div className="combo-visual" aria-hidden="true">
                  <span className="combo-stamp">{combo.items.reduce((total, item) => total + item.quantity, 0)} unidades</span>
                  {combo.items.map((item) => {
                    const product = products.find((candidate) => candidate.name === item.name);
                    return product ? (
                      <figure key={item.name}>
                        <img src={product.image} alt="" width={350} height={350} />
                        <figcaption>{item.quantity}×</figcaption>
                      </figure>
                    ) : null;
                  })}
                </div>
                <p className="combo-label">{combo.label}</p>
                <h3>{combo.name}</h3>
                <p className="combo-description">{combo.description}</p>
                <ul>
                  {combo.items.map((item) => {
                    const product = products.find((candidate) => candidate.name === item.name);
                    return <li key={item.name}><b>{item.quantity}×</b> {product?.name}</li>;
                  })}
                </ul>
                <div className="combo-bottom">
                  <div>
                    <small>Precio del combo</small>
                    <span className="combo-list-price">{money(comboTotal)}</span>
                    <strong>{money(comboOfferPrice)}</strong>
                    <em>Ahorrás {money(comboSavingsAmount)}</em>
                  </div>
                  <button type="button" onClick={() => addCombo(combo)}>Sumar combo <span>＋</span></button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="combo-note">
          La mejor promo se aplica sola: 3% desde 5 unidades o 5% desde 10 del mismo producto.
          Los descuentos no se acumulan entre sí.
        </p>
      </section>

      <section className="builder shell" id="arma-tu-pedido">
        <header className="builder-heading">
          <div>
            <p className="eyebrow">Ahora jugás de técnico</p>
            <h2>Armá la<br /><span>tuya.</span></h2>
          </div>
          <div className="builder-heading-copy">
            <p>
              Elegí una formación para arrancar o armala producto por producto.
              El ahorro aparece solo cuando llegás a cada cantidad.
            </p>
            <div className="builder-presets" aria-label="Formaciones sugeridas">
              {builderPresets.map((preset) => (
                <button
                  className={selectedBuilderPreset === preset.id ? "selected" : ""}
                  type="button"
                  key={preset.id}
                  onClick={() => applyBuilderPreset(preset)}
                >
                  <b>{preset.label}</b>
                  <small>{preset.caption}</small>
                </button>
              ))}
              <button
                className={selectedBuilderPreset === "libre" ? "selected" : ""}
                type="button"
                onClick={() => {
                  setBuilderQuantities({});
                  setSelectedBuilderPreset("libre");
                }}
              >
                <b>Desde cero</b>
                <small>A tu manera</small>
              </button>
            </div>
          </div>
        </header>

        <div className="builder-layout">
          <div className="builder-products">
            {builderProductNames.map((productName) => {
              const product = products.find((candidate) => candidate.name === productName);
              if (!product?.price) return null;
              const quantity = builderQuantities[product.name] ?? 0;
              return (
                <article className={quantity ? "builder-product selected" : "builder-product"} key={product.name}>
                  <img
                    src={product.image}
                    alt=""
                    width={180}
                    height={180}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="builder-product-copy">
                    <small>{product.brand}</small>
                    <h3>{product.name}</h3>
                    <p>{product.saleUnit} · {product.price}</p>
                  </div>
                  <div className="builder-quantity" aria-label={`Cantidad de ${product.name}`}>
                    <button
                      type="button"
                      onClick={() => changeBuilderQuantity(product.name, -1)}
                      aria-label={`Restar ${product.name}`}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => changeBuilderQuantity(product.name, 1)}
                      aria-label={`Sumar ${product.name}`}
                    >
                      ＋
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="builder-summary" aria-live="polite">
            <p className="builder-sticker">FORMACIÓN TITULAR</p>
            <div className="builder-ball">10</div>
            <h3>Tu pedido</h3>
            <p className="builder-count">{builderCount} {builderCount === 1 ? "unidad elegida" : "unidades elegidas"}</p>

            {builderItems.length ? (
              <div className="builder-lines">
                {builderItems.map(({ product, quantity }) => (
                  <p key={product.name}>
                    <span>{quantity}× {product.name}</span>
                    <b>{money(priceNumber(product.price) * quantity)}</b>
                  </p>
                ))}
              </div>
            ) : (
              <p className="builder-empty">Elegí al menos un producto para empezar.</p>
            )}

            {builderOpportunity && (
              <div className={builderOpportunity.remaining ? "discount-meter" : "discount-meter complete"}>
                <div>
                  <span>
                    {builderOpportunity.remaining
                      ? `Te faltan ${builderOpportunity.remaining} de ${builderOpportunity.product.name}`
                      : `¡Ya tenés el 5% en ${builderOpportunity.product.name}!`}
                  </span>
                  <b>{builderOpportunity.remaining ? `Desbloqueás ${builderOpportunity.nextRate}%` : "PROMO MÁXIMA"}</b>
                </div>
                <div className="discount-track">
                  <i style={{ width: `${builderOpportunity.progress}%` }} />
                </div>
              </div>
            )}

            <div className="builder-totals">
              <p><span>Subtotal</span><b>{money(builderSubtotal)}</b></p>
              {builderSavings > 0 && <p className="builder-saving"><span>Ahorrás</span><b>− {money(builderSavings)}</b></p>}
              <p className="builder-grand-total"><span>Total</span><strong>{money(builderTotal)}</strong></p>
            </div>
            <button className="builder-add" type="button" disabled={!builderItems.length} onClick={addBuilderToCart}>
              Sumar mi formación <span>＋</span>
            </button>
            <small className="builder-rule">3% desde 5 · 5% desde 10 del mismo producto</small>
          </aside>
        </div>
      </section>

      <section className="how shell">
        <div className="how-title">
          <p className="eyebrow">Cero burocracia</p>
          <h2>Tres pasos.<br />Pedido listo.</h2>
        </div>
        <div className="steps">
          <article><b>1</b><div><h3>Elegí</h3><p>Mirá marca, calidad, formato y precio.</p></div></article>
          <article><b>2</b><div><h3>Sumá</h3><p>Elegí la cantidad de cada producto y revisá el subtotal.</p></div></article>
          <article><b>3</b><div><h3>Confirmá</h3><p>Seleccioná entrega y pago. Después coordinamos el envío.</p></div></article>
        </div>
      </section>

      <section className="price-note">
        <div className="price-note-badge">$</div>
        <div>
          <p className="eyebrow">Precios simples, decisión fácil</p>
          <h2>Lo que ves es<br />lo que pedís.</h2>
          <p>
            Los valores publicados corresponden a la unidad de venta indicada en cada ficha.
            Los productos sin importe confirmado se consultan directamente antes de pedir.
          </p>
        </div>
      </section>

      <section className="faq shell" id="preguntas">
        <header className="faq-heading">
          <p className="eyebrow">Todo claro desde el arranque</p>
          <h2>Preguntas<br />frecuentes.</h2>
          <p>Si te queda alguna duda, escribinos. Del otro lado contesta una persona.</p>
        </header>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question}>
              <summary><span>0{index + 1}</span>{faq.question}<b>＋</b></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="reviews shell" id="opiniones">
        <header className="reviews-heading">
          <p className="eyebrow">La voz del barrio</p>
          <h2>Opiniones<br /><span>de verdad.</span></h2>
          <p>
            Esta vidriera recién empieza. Las reseñas van a aparecer solamente cuando
            las mande un cliente y nos autorice a publicarlas.
          </p>
        </header>
        <div className="reviews-board">
          <article className="reviews-promise">
            <span className="quote-mark">“</span>
            <p className="reviews-script">Acá no compramos estrellas.</p>
            <h3>Cero reseñas inventadas.</h3>
            <p>
              Preferimos arrancar sin testimonios antes que llenar la página de nombres
              y comentarios que nunca existieron.
            </p>
            <div className="review-seals">
              <span>CLIENTES REALES</span>
              <span>CON PERMISO</span>
              <span>SIN CHAMUYO</span>
            </div>
          </article>
          <aside className="review-invite">
            <p className="review-pin">¿YA COMPRASTE?</p>
            <h3>Dejanos tu opinión.</h3>
            <p>Contanos tres cosas y ayudá al próximo vecino a elegir:</p>
            <ol>
              <li><b>1</b><span>Qué producto compraste.</span></li>
              <li><b>2</b><span>Cómo fue la entrega.</span></li>
              <li><b>3</b><span>Qué tal rindió.</span></li>
            </ol>
            <a
              href={wa("¡Hola! Ya compré en República del Trapo y quiero dejar una opinión.\n\nProducto:\nMi experiencia:\n¿Autorizo a publicar mi nombre de pila?: Sí / No")}
              target="_blank"
              rel="noreferrer"
            >
              Mandar mi opinión por WhatsApp <span>↗</span>
            </a>
            <small>Antes de publicar cualquier mensaje te pedimos autorización.</small>
          </aside>
        </div>
      </section>

      <section className="closing">
        <i>✦</i>
        <p>República del Trapo</p>
        <h2>¿Armamos tu<br />primer pedido?</h2>
        <button className="button light" type="button" onClick={() => setCartOpen(true)}>
          Abrir carrito <span>→</span>
        </button>
        <small>Mercado Pago o efectivo · Retiro o envío</small>
      </section>

      <footer>
        <a className="brand" href="#inicio">
          <img
            className="brand-logo footer-logo"
            src={embeddedImages["/brand/republica-del-trapo-logo-trimmed.png"]}
            alt="República del Trapo · Limpieza Nacional"
            width={1522}
            height={531}
            loading="eager"
            decoding="async"
          />
        </a>
        <p>Todo para que la mugre pierda.</p>
        <a href={wa("¡Hola! Quiero hacer un pedido.")} target="_blank" rel="noreferrer">11 5794-3584</a>
      </footer>

      <button
        className={botOpen ? "help-bot-trigger is-open" : "help-bot-trigger"}
        type="button"
        aria-expanded={botOpen}
        aria-controls="help-bot-panel"
        onClick={() => setBotOpen((current) => !current)}
      >
        <BotMascot />
        <span>
          <small>¿Necesitás una mano?</small>
          <b>Preguntale al Trapo</b>
        </span>
        <em>{botOpen ? "×" : "↑"}</em>
      </button>

      {botOpen && (
        <aside className="help-bot-panel" id="help-bot-panel" role="dialog" aria-label="Asistente de compras">
          <header className="help-bot-header">
            <BotMascot large />
            <div>
              <small>ASESOR DEL BARRIO</small>
              <h2>El Trapo te da una mano</h2>
              <p><i /> Responde al toque</p>
            </div>
            <button type="button" onClick={() => setBotOpen(false)} aria-label="Cerrar asistente">×</button>
          </header>

          <div className="help-bot-body">
            {botView !== "menu" && (
              <button className="bot-back" type="button" onClick={() => showBotView("menu")}>
                ← Volver a las opciones
              </button>
            )}

            {botView === "menu" && (
              <>
                <div className="bot-message">
                  <p>¡Buenas! Soy <b>El Trapo</b> 👋</p>
                  <span>Te ayudo a elegir, armo una recomendación y la mando directo al carrito. Sin chamuyo.</span>
                </div>
                <p className="bot-question">¿Qué necesitás resolver?</p>
                <div className="bot-menu">
                  <button type="button" onClick={() => showBotView("casa")}>
                    <i>⌂</i><span><b>Comprar para casa</b><small>Según cuántos sean</small></span><em>→</em>
                  </button>
                  <button type="button" onClick={() => showBotView("comercio")}>
                    <i>▦</i><span><b>Comercio u oficina</b><small>Según el movimiento</small></span><em>→</em>
                  </button>
                  <button type="button" onClick={() => showBotView("envios")}>
                    <i>➜</i><span><b>Envíos y retiro</b><small>Zonas, costos y mínimo</small></span><em>→</em>
                  </button>
                  <button type="button" onClick={() => showBotView("pagos")}>
                    <i>$</i><span><b>¿Cómo puedo pagar?</b><small>Mercado Pago o efectivo</small></span><em>→</em>
                  </button>
                </div>
              </>
            )}

            {(botView === "casa" || botView === "comercio") && (
              <>
                <div className="bot-message">
                  <p>{botView === "casa" ? "Vamos con la casa 🏠" : "Vamos con el negocio 💪"}</p>
                  <span>
                    {botView === "casa"
                      ? "Elegí cuántos son y te dejo un pedido como punto de partida. Después podés cambiar cualquier cantidad."
                      : "Elegí el nivel de movimiento. Los productos se suman al carrito y después podés ajustarlos."}
                  </span>
                </div>
                <div className="bot-recommendations">
                  {botRecommendations
                    .filter((recommendation) => recommendation.audience === botView)
                    .map((recommendation) => {
                      const recommendationTotal = botRecommendationTotal(recommendation);
                      const minimumMissing = Math.max(
                        0,
                        minimumHomeDeliveryOrder - recommendationTotal,
                      );
                      return (
                        <article className="bot-recommendation" key={recommendation.id}>
                          <small>{recommendation.eyebrow}</small>
                          <h3>{recommendation.name}</h3>
                          <p>{recommendation.description}</p>
                          <ul>
                            {recommendation.items.map((item) => (
                              <li key={item.name}><b>{item.quantity}×</b> {item.name}</li>
                            ))}
                          </ul>
                          <div className="bot-recommendation-total">
                            <span>
                              <small>Total estimado</small>
                              <strong>{money(recommendationTotal)}</strong>
                            </span>
                            <button type="button" onClick={() => addBotRecommendation(recommendation)}>
                              Sumar al carrito ＋
                            </button>
                          </div>
                          <p className={minimumMissing ? "bot-minimum-note" : "bot-minimum-note complete"}>
                            {minimumMissing
                              ? `Para envío CABA faltan ${money(minimumMissing)} · retiro sin mínimo`
                              : "Ya alcanza el mínimo para envío CABA"}
                          </p>
                        </article>
                      );
                    })}
                </div>
              </>
            )}

            {botView === "envios" && (
              <>
                <div className="bot-message">
                  <p>Te lo hacemos simple 🚚</p>
                  <span>Para envío a domicilio dentro de CABA el pedido mínimo es de <b>{money(minimumHomeDeliveryOrder)}</b> antes de descuentos.</span>
                </div>
                <div className="bot-info-list">
                  {shippingZones.map((zone) => (
                    <article key={zone.id}>
                      <div><b>{zone.name}</b><span>{zone.detail}</span></div>
                      <strong>{money(zone.price)}</strong>
                    </article>
                  ))}
                  <article>
                    <div><b>Retiro a coordinar</b><span>Zona Quesada y Cabildo</span></div>
                    <strong>Gratis</strong>
                  </article>
                  <article>
                    <div><b>Todo el país</b><span>Correo o transporte a elección</span></div>
                    <strong>A cotizar</strong>
                  </article>
                </div>
              </>
            )}

            {botView === "pagos" && (
              <>
                <div className="bot-message">
                  <p>Elegí como te quede cómodo 💸</p>
                  <span>No te pedimos datos de tarjeta dentro de esta página.</span>
                </div>
                <div className="bot-payment-list">
                  <article>
                    <i>MP</i>
                    <div><b>Mercado Pago</b><span>Primero confirmamos stock y envío. Después recibís el enlace seguro.</span></div>
                  </article>
                  <article>
                    <i>$</i>
                    <div><b>Efectivo</b><span>Pagás cuando recibís el pedido o cuando lo retirás.</span></div>
                  </article>
                </div>
              </>
            )}
          </div>

          <div className="help-bot-foot">
            <span><b>{cartCount}</b> {cartCount === 1 ? "producto" : "productos"} en tu carrito</span>
            <a
              href={wa("¡Hola! Estaba usando el asistente de República del Trapo y quiero hablar con una persona.")}
              target="_blank"
              rel="noreferrer"
            >
              Hablar con una persona <b>WA</b>
            </a>
          </div>
        </aside>
      )}

      {celebrationId > 0 && (
        <div className="paper-party" key={celebrationId} aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <i
              className={`paper-piece shape-${index % 3}`}
              key={index}
              style={{
                left: `${(index * 37 + 5) % 100}%`,
                backgroundColor: partyColors[index % partyColors.length],
                animationDelay: `${(index % 7) * 0.045}s`,
                animationDuration: `${0.8 + (index % 5) * 0.08}s`,
              }}
            />
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="panel-layer" role="presentation">
          <button
            type="button"
            className="panel-backdrop"
            onClick={() => setSelectedProduct(null)}
            aria-label="Cerrar detalle"
          />
          <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <button className="panel-close" type="button" onClick={() => setSelectedProduct(null)} aria-label="Cerrar">
              ×
            </button>
            <div className="product-modal-image">
              <ProductVisual product={selectedProduct} />
            </div>
            <div className="product-modal-copy">
              <p className="modal-kicker">{selectedProduct.brand}</p>
              <h2 id="product-modal-title">{selectedProduct.name}</h2>
              <p className="modal-detail">{selectedProduct.detail}</p>
              <dl className="modal-specs">
                <div><dt>Calidad</dt><dd>{selectedProduct.quality}</dd></div>
                <div><dt>Ideal para</dt><dd>{productUseCases[selectedProduct.name]}</dd></div>
                <div><dt>Unidad de venta</dt><dd>{selectedProduct.saleUnit}</dd></div>
                <div><dt>Presentación original</dt><dd>{selectedProduct.sourcePack}</dd></div>
              </dl>
              {selectedProduct.price ? (
                <>
                  <div className="modal-buy-row">
                    <div>
                      <small>{detailSavings ? "Total con descuento" : `Precio por ${selectedProduct.saleUnit}`}</small>
                      <strong>{detailSavings ? money(detailTotal) : selectedProduct.price}</strong>
                      {detailSavings > 0 && (
                        <span className="modal-saving">
                          Ahorrás {money(detailSavings)} por cantidad
                        </span>
                      )}
                    </div>
                    <div className="quantity-control" aria-label="Cantidad">
                      <button type="button" onClick={() => setDetailQuantity((value) => Math.max(1, value - 1))} aria-label="Restar una unidad">−</button>
                      <span>{detailQuantity}</span>
                      <button type="button" onClick={() => setDetailQuantity((value) => value + 1)} aria-label="Sumar una unidad">＋</button>
                    </div>
                  </div>
                  <button className="modal-add" type="button" onClick={() => addToCart(selectedProduct, detailQuantity)}>
                    Agregar {detailQuantity} al carrito · {money(detailTotal)}
                  </button>
                </>
              ) : (
                <div className="pending-product">
                  <p>Este producto todavía no tiene precio confirmado.</p>
                  <a href={wa(`¡Hola! Quiero consultar precio y disponibilidad de ${selectedProduct.name}.`)} target="_blank" rel="noreferrer">
                    Consultar disponibilidad <span>↗</span>
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="panel-layer" role="presentation">
          <button
            type="button"
            className="panel-backdrop"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
          />
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <header className="drawer-header">
              <div>
                <p>Tu selección</p>
                <h2 id="cart-title">Mi carrito</h2>
              </div>
              <button className="panel-close" type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar">×</button>
            </header>

            {cartItems.length ? (
              <>
                <div className="cart-items">
                  {cartItems.map(({ product, quantity }) => (
                    <article className="cart-item" key={product.name}>
                      <img src={product.image} alt="" width={112} height={112} />
                      <div className="cart-item-copy">
                        <h3>{product.name}</h3>
                        <p>{product.saleUnit} · {product.price} c/u</p>
                        <div className="cart-item-bottom">
                          <div className="quantity-control quantity-small" aria-label={`Cantidad de ${product.name}`}>
                            <button type="button" onClick={() => changeQuantity(product.name, -1)} aria-label="Restar una unidad">−</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => changeQuantity(product.name, 1)} aria-label="Sumar una unidad">＋</button>
                          </div>
                          <strong>{money(priceNumber(product.price) * quantity)}</strong>
                        </div>
                        <button className="remove-item" type="button" onClick={() => changeQuantity(product.name, -quantity)}>
                          Sacar
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="drawer-total">
                  {cartOpportunity && (
                    <div className={cartOpportunity.remaining ? "discount-meter cart-meter" : "discount-meter cart-meter complete"}>
                      <div>
                        <span>
                          {cartOpportunity.remaining
                            ? `Sumá ${cartOpportunity.remaining} más de ${cartOpportunity.product.name}`
                            : `¡Descuento máximo en ${cartOpportunity.product.name}!`}
                        </span>
                        <b>{cartOpportunity.remaining ? `Llegás al ${cartOpportunity.nextRate}%` : "5% ACTIVO"}</b>
                      </div>
                      <div className="discount-track">
                        <i style={{ width: `${cartOpportunity.progress}%` }} />
                      </div>
                    </div>
                  )}
                  <div><span>Subtotal de lista</span><strong>{money(subtotal)}</strong></div>
                  {promotionSavings > 0 && (
                    <div className="saving-line">
                      <span>{promotionLabel}</span><strong>− {money(promotionSavings)}</strong>
                    </div>
                  )}
                  <div className="products-total"><span>Total de productos</span><strong>{money(productsTotal)}</strong></div>
                  <div className={homeDeliveryMinimumMissing ? "cart-minimum" : "cart-minimum complete"}>
                    <b>
                      {homeDeliveryMinimumMissing
                        ? `Para envío CABA te faltan ${money(homeDeliveryMinimumMissing)}`
                        : "Tu pedido ya alcanza el mínimo para envío CABA"}
                    </b>
                    <span>
                      Mínimo {money(minimumHomeDeliveryOrder)} antes de descuentos · retiro sin mínimo
                    </span>
                  </div>
                  <p>
                    Aplicamos automáticamente la mejor promoción. El envío se elige y calcula
                    en el siguiente paso.
                  </p>
                  <button className="checkout-button" type="button" onClick={beginCheckout}>
                    Continuar con la compra <span>→</span>
                  </button>
                  <button className="keep-buying" type="button" onClick={() => setCartOpen(false)}>
                    Seguir mirando productos
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span>＋</span>
                <h3>El carrito está vacío</h3>
                <p>Sumá productos del catálogo y volvé cuando quieras. Quedan guardados en este dispositivo.</p>
                <button type="button" onClick={() => setCartOpen(false)}>Ver catálogo</button>
              </div>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="panel-layer" role="presentation">
          <button
            type="button"
            className="panel-backdrop"
            onClick={() => setCheckoutOpen(false)}
            aria-label="Cerrar checkout"
          />
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <header className="drawer-header checkout-header">
              <div>
                <button className="checkout-back" type="button" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }}>
                  ← Volver al carrito
                </button>
                <h2 id="checkout-title">Confirmá tu pedido</h2>
              </div>
              <button className="panel-close" type="button" onClick={() => setCheckoutOpen(false)} aria-label="Cerrar">×</button>
            </header>

            <form className="checkout-grid" onSubmit={sendOrder}>
              <div className="checkout-fields">
                <fieldset>
                  <legend>1. Tus datos</legend>
                  <div className="field-grid">
                    <label>
                      Nombre y apellido
                      <input name="name" type="text" autoComplete="name" required placeholder="Ej: Juan Pérez" />
                    </label>
                    <label>
                      Teléfono
                      <input name="phone" type="tel" autoComplete="tel" required placeholder="11 1234 5678" />
                    </label>
                  </div>
                  <label>
                    Email <small>(opcional)</small>
                    <input name="email" type="email" autoComplete="email" placeholder="tu@email.com" />
                  </label>
                </fieldset>

                <fieldset>
                  <legend>2. ¿Cómo te lo entregamos?</legend>
                  <div className="choice-list">
                    <label className={delivery === "domicilio" ? "choice-card selected" : "choice-card"}>
                      <input type="radio" name="delivery" value="domicilio" checked={delivery === "domicilio"} onChange={() => setDelivery("domicilio")} />
                      <span><b>Envío a domicilio</b><small>CABA · mínimo {money(minimumHomeDeliveryOrder)}</small></span>
                    </label>
                    <label className={delivery === "retiro" ? "choice-card selected" : "choice-card"}>
                      <input type="radio" name="delivery" value="retiro" checked={delivery === "retiro"} onChange={() => setDelivery("retiro")} />
                      <span><b>Retiro a coordinar</b><small>Zona Quesada y Cabildo, Capital</small></span>
                    </label>
                    <label className={delivery === "correo" ? "choice-card selected" : "choice-card"}>
                      <input type="radio" name="delivery" value="correo" checked={delivery === "correo"} onChange={() => setDelivery("correo")} />
                      <span><b>Correo o transporte</b><small>Envíos a todo el país · costo a cotizar</small></span>
                    </label>
                  </div>
                  {delivery === "domicilio" && (
                    <div className={homeDeliveryBlocked ? "delivery-minimum-alert" : "delivery-minimum-alert complete"}>
                      <b>
                        {homeDeliveryBlocked
                          ? `Te faltan ${money(homeDeliveryMinimumMissing)} para elegir envío a domicilio.`
                          : "Tu pedido ya alcanza el mínimo para envío a domicilio."}
                      </b>
                      <span>
                        El mínimo se calcula sobre los productos antes de descuentos.
                        También podés elegir retiro sin mínimo.
                      </span>
                    </div>
                  )}
                  {delivery === "domicilio" && (
                    <label>
                      Zona de envío
                      <select
                        name="shippingZone"
                        value={shippingZone}
                        onChange={(event) => setShippingZone(event.target.value as ShippingZoneId)}
                      >
                        {shippingZones.map((zone) => (
                          <option value={zone.id} key={zone.id}>
                            {zone.name} · {money(zone.price)}
                          </option>
                        ))}
                      </select>
                      <small>{selectedShippingZone.detail}</small>
                    </label>
                  )}
                  {delivery !== "retiro" && (
                    <label>
                      {delivery === "domicilio" ? "Dirección y barrio" : "Localidad, provincia y código postal"}
                      <input
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        required
                        placeholder={delivery === "domicilio" ? "Ej: Cabildo 3500, Núñez" : "Ej: Córdoba Capital, Córdoba, 5000"}
                      />
                    </label>
                  )}
                </fieldset>

                <fieldset>
                  <legend>3. ¿Cómo pagás?</legend>
                  <div className="choice-list choice-payment">
                    <label className={payment === "mercadopago" ? "choice-card selected" : "choice-card"}>
                      <input type="radio" name="payment" value="mercadopago" checked={payment === "mercadopago"} onChange={() => setPayment("mercadopago")} />
                      <span><b>Mercado Pago</b><small>Te enviamos el link al confirmar el pedido</small></span>
                      <em>MP</em>
                    </label>
                    <label className={payment === "efectivo" ? "choice-card selected" : "choice-card"}>
                      <input type="radio" name="payment" value="efectivo" checked={payment === "efectivo"} onChange={() => setPayment("efectivo")} />
                      <span><b>Efectivo</b><small>Al entregar o al retirar</small></span>
                      <em>$</em>
                    </label>
                  </div>
                </fieldset>

                <label>
                  Aclaraciones <small>(opcional)</small>
                  <textarea name="notes" rows={3} placeholder="Horarios, referencias o algo que necesitemos saber" />
                </label>
              </div>

              <aside className="order-summary">
                <p className="modal-kicker">Resumen</p>
                <h3>{cartCount} {cartCount === 1 ? "producto" : "productos"}</h3>
                <div className="summary-items">
                  {cartItems.map(({ product, quantity }) => (
                    <p key={product.name}>
                      <span>{quantity} × {product.name}</span>
                      <b>{money(priceNumber(product.price) * quantity)}</b>
                    </p>
                  ))}
                </div>
                <div className="summary-line"><span>Subtotal de lista</span><strong>{money(subtotal)}</strong></div>
                {promotionSavings > 0 && (
                  <div className="summary-line summary-saving">
                    <span>{promotionLabel}</span><strong>− {money(promotionSavings)}</strong>
                  </div>
                )}
                <div className="summary-line"><span>Total de productos</span><strong>{money(productsTotal)}</strong></div>
                <div className="summary-line">
                  <span>Envío</span>
                  <strong>
                    {delivery === "domicilio"
                      ? money(selectedShippingZone.price)
                      : delivery === "retiro"
                        ? "Sin cargo"
                        : "A cotizar"}
                  </strong>
                </div>
                <div className="summary-line summary-grand-total">
                  <span>Total del pedido</span>
                  <strong>{orderTotal === null ? `${money(productsTotal)} + envío` : money(orderTotal)}</strong>
                </div>
                <p className="checkout-honesty">
                  {delivery === "domicilio"
                    ? `Tarifa para ${selectedShippingZone.name}. Si la dirección no corresponde a esa zona, la corregimos antes de confirmar. `
                    : delivery === "retiro"
                      ? "Retiro sin costo en punto a coordinar por Quesada y Cabildo. "
                      : "El correo o transporte se cotiza por separado y se confirma antes de despachar. "}
                  {payment === "mercadopago"
                    ? "Enviamos el pedido por WhatsApp. Después de confirmar stock y envío, recibís el enlace seguro de Mercado Pago."
                    : "Enviamos el pedido por WhatsApp y coordinamos el pago en efectivo al entregar o retirar."}
                </p>
                <button className="checkout-button" type="submit" disabled={homeDeliveryBlocked}>
                  {homeDeliveryBlocked
                    ? `Faltan ${money(homeDeliveryMinimumMissing)} para envío`
                    : payment === "mercadopago"
                      ? "Enviar pedido y solicitar link"
                      : "Enviar pedido"}{" "}
                  <span>↗</span>
                </button>
              </aside>
            </form>
          </section>
        </div>
      )}

      {orderConfirmation && (
        <div className="panel-layer" role="presentation">
          <div className="panel-backdrop" />
          <section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
            <div className="confirmation-mark">✓</div>
            <p className="modal-kicker">Pedido preparado</p>
            <h2 id="confirmation-title">¡Ya está en marcha!</h2>
            <p className="confirmation-copy">
              Abrimos WhatsApp con todos los datos. Guardá este número para cualquier consulta:
            </p>
            <strong className="order-number">{orderConfirmation.orderNumber}</strong>
            <ol>
              <li><b>1.</b> Enviá el mensaje que quedó preparado en WhatsApp.</li>
              <li><b>2.</b> Confirmamos stock, zona y modalidad de entrega.</li>
              <li><b>3.</b> {orderConfirmation.payment === "mercadopago"
                ? "Te mandamos el link de Mercado Pago."
                : "Coordinamos el pago en efectivo."}</li>
            </ol>
            <a className="confirmation-wa" href={orderConfirmation.whatsAppUrl} target="_blank" rel="noreferrer">
              Abrir WhatsApp nuevamente <span>↗</span>
            </a>
            <button className="confirmation-finish" type="button" onClick={finishOrder}>
              Listo, vaciar carrito
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
