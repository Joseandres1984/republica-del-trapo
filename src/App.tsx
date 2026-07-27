"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const phone = "5491157943584";

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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/papel-higienico-30m-x48.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/papel-higienico-80m-x30.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/newpel-extra-blanco-x30.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/jumbo-eco-x8.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/jumbo-extra-blanco-x8.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/jumbo-premium-300m-x8.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/higienol-max-plus-80m-x4.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/elegant-doble-hoja-20m-x4.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/toalla-papel-200m-x4.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/toalla-papel-blanca-200m-x4.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/bobina-papel-24cm-400m-x2.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/bobina-blanca-doble-hoja-400m-x2.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/toallas-intercaladas-beige-x10.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/toallas-intercaladas-blancas-np-x10.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/toallas-intercaladas-premium-2000.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/toallas-intercaladas-blancas-2500.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/servilletas-30x30-caja.webp",
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
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/newpel-cocina-120-panos-x3.webp",
  },
  {
    name: "Rollo Cocina Gigante 150 Paños",
    brand: "Newpel",
    quality: "150 paños por rollo",
    detail: "Formato gigante. Disponibilidad y precio a confirmar.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x8",
    category: "cocina",
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/newpel-cocina-150-panos.webp",
  },
  {
    name: "Rollo Cocina Gigante 200 Paños",
    brand: "Newpel",
    quality: "200 paños por rollo",
    detail: "El mayor formato de la línea. Precio a confirmar.",
    saleUnit: "1 rollo",
    sourcePack: "Presentación original x12",
    category: "cocina",
    image: "https://republica-del-trapo.joseandres1984.chatgpt.site/products/newpel-cocina-200-panos.webp",
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
    items: [
      { name: "Doble Hoja 20 m", quantity: 2 },
      { name: "Rollo Cocina 120 Paños", quantity: 2 },
    ],
  },
] as const;

const faqs = [
  {
    question: "¿Cómo recibo el link de Mercado Pago?",
    answer: "Cuando mandás el pedido confirmamos stock y envío. Después te enviamos por WhatsApp el enlace seguro de Mercado Pago.",
  },
  {
    question: "¿El envío ya está incluido?",
    answer: "No. El costo se calcula según la zona, el correo o el transporte elegido y te lo confirmamos antes de cobrar.",
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
  return `$${new Intl.NumberFormat("es-AR").format(value)}`;
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <div className="product-photo">
      <img
        src={product.image}
        alt={`${product.brand}: ${product.name}, ${product.sourcePack}`}
        width={1024}
        height={1024}
        loading="eager"
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
  const [cartReady, setCartReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{
    orderNumber: string;
    whatsAppUrl: string;
    payment: "mercadopago" | "efectivo";
  } | null>(null);
  const [delivery, setDelivery] = useState<"domicilio" | "retiro" | "correo">("domicilio");
  const [payment, setPayment] = useState<"mercadopago" | "efectivo">("mercadopago");

  useEffect(() => {
    const restoreCart = window.setTimeout(() => {
      try {
        const savedCart = window.localStorage.getItem("republica-del-trapo-cart");
        if (savedCart) setCart(JSON.parse(savedCart));
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
  }, [cart, cartReady]);

  useEffect(() => {
    const panelIsOpen = Boolean(selectedProduct || cartOpen || checkoutOpen || orderConfirmation);
    document.body.classList.toggle("panel-is-open", panelIsOpen);

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setSelectedProduct(null);
      setCartOpen(false);
      setCheckoutOpen(false);
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
    setCartOpen(true);
  }

  function sendOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          ? `Envío a domicilio${address ? `: ${address}` : ""}`
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
      `Subtotal de productos: ${money(subtotal)}`,
      "Envío: a calcular según zona / transporte",
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
            src="https://republica-del-trapo.joseandres1984.chatgpt.site/brand/republica-del-trapo-logo-trimmed.png"
            alt="República del Trapo · Limpieza Nacional"
            width={1522}
            height={531}
            decoding="sync"
          />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#higienicos">Higiénicos</a>
          <a href="#bobinas">Bobinas</a>
          <a href="#intercaladas">Intercaladas</a>
          <a href="#cocina">Cocina</a>
        </nav>
        <button className="nav-cta" type="button" onClick={() => setCartOpen(true)}>
          Mi carrito <span className="cart-count" aria-label={`${cartCount} productos`}>{cartCount}</span>
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
            <button className="button secondary" type="button" onClick={() => setCartOpen(true)}>
              Ver mi carrito <span>→</span>
            </button>
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
                src="https://republica-del-trapo.joseandres1984.chatgpt.site/products/higienol-max-plus-80m-x4.webp"
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
                src="https://republica-del-trapo.joseandres1984.chatgpt.site/products/newpel-cocina-120-panos-x3.webp"
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
                src="https://republica-del-trapo.joseandres1984.chatgpt.site/products/jumbo-premium-300m-x8.webp"
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

      <section className="patria-mural" aria-labelledby="mural-title">
        <img
          className="patria-mural-art"
          src="https://republica-del-trapo.joseandres1984.chatgpt.site/brand/mural-patria-barrio.webp"
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
          <div className="category-links" aria-label="Categorías">
            {categories.map((category) => (
              <a href={`#${category.id}`} key={category.id}>{category.title}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog-shell">
        {categories.map((category, categoryIndex) => (
          <div className="category-section" id={category.id} key={category.id}>
            <header className="category-heading">
              <div>
                <span>0{categoryIndex + 1}</span>
                <p>{category.kicker}</p>
              </div>
              <div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
            </header>
            <div className="product-grid">
              {products
                .filter((product) => product.category === category.id)
                .map((product) => (
                  <ProductCard
                    product={product}
                    key={product.name}
                    onView={openDetail}
                    onAdd={addToCart}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>

      <section className="combos shell" id="combos">
        <header className="combos-heading">
          <div>
            <p className="eyebrow">Armados para resolver</p>
            <h2>Combos del<br />barrio.</h2>
          </div>
          <p>
            Elegimos productos que se usan juntos. Sumás el combo completo al carrito,
            revisás las cantidades y podés cambiar lo que quieras antes de pedir.
          </p>
        </header>
        <div className="combo-grid">
          {combos.map((combo, index) => {
            const comboTotal = combo.items.reduce((total, item) => {
              const product = products.find((candidate) => candidate.name === item.name);
              return total + priceNumber(product?.price) * item.quantity;
            }, 0);
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
                  <div><small>Total de productos</small><strong>{money(comboTotal)}</strong></div>
                  <button type="button" onClick={() => addCombo(combo)}>Sumar combo <span>＋</span></button>
                </div>
              </article>
            );
          })}
        </div>
        <p className="combo-note">¿Necesitás más cantidad? Al confirmar el pedido consultanos por beneficios según volumen.</p>
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
            src="https://republica-del-trapo.joseandres1984.chatgpt.site/brand/republica-del-trapo-logo-trimmed.png"
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

      <a className="floating-wa" href={wa("¡Hola! Quiero hacer un pedido en República del Trapo.")} target="_blank" rel="noreferrer" aria-label="Hacer pedido por WhatsApp">
        <i>WA</i><b>¿Necesitás ayuda?</b>
      </a>

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
                <div><dt>Unidad de venta</dt><dd>{selectedProduct.saleUnit}</dd></div>
                <div><dt>Presentación original</dt><dd>{selectedProduct.sourcePack}</dd></div>
              </dl>
              {selectedProduct.price ? (
                <>
                  <div className="modal-buy-row">
                    <div>
                      <small>Precio por {selectedProduct.saleUnit}</small>
                      <strong>{selectedProduct.price}</strong>
                    </div>
                    <div className="quantity-control" aria-label="Cantidad">
                      <button type="button" onClick={() => setDetailQuantity((value) => Math.max(1, value - 1))} aria-label="Restar una unidad">−</button>
                      <span>{detailQuantity}</span>
                      <button type="button" onClick={() => setDetailQuantity((value) => value + 1)} aria-label="Sumar una unidad">＋</button>
                    </div>
                  </div>
                  <button className="modal-add" type="button" onClick={() => addToCart(selectedProduct, detailQuantity)}>
                    Agregar {detailQuantity} al carrito · {money(priceNumber(selectedProduct.price) * detailQuantity)}
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
                  <div><span>Subtotal de productos</span><strong>{money(subtotal)}</strong></div>
                  <p>El envío se calcula según la zona o el transporte elegido.</p>
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
                      <span><b>Envío a domicilio</b><small>CABA y zonas cercanas · costo según zona</small></span>
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
                <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                <div className="summary-line"><span>Envío</span><strong>A calcular</strong></div>
                <p className="checkout-honesty">
                  {payment === "mercadopago"
                    ? "Enviamos el pedido por WhatsApp. Después de confirmar stock y envío, recibís el enlace seguro de Mercado Pago."
                    : "Enviamos el pedido por WhatsApp y coordinamos el pago en efectivo al entregar o retirar."}
                </p>
                <button className="checkout-button" type="submit">
                  {payment === "mercadopago" ? "Enviar pedido y solicitar link" : "Enviar pedido"}{" "}
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
              <li><b>2.</b> Confirmamos stock y calculamos el envío.</li>
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
