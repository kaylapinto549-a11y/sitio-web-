const WHATSAPP = "573001640580";

const productos = [
    {
        nombre: "Vestido rosado largo",
        categoria: "vestidos",
        precio: 59900,
        imagen: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Vestido corto elegante",
        categoria: "vestidos",
        precio: 64900,
        imagen: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Conjunto casual",
        categoria: "conjuntos",
        precio: 79900,
        imagen: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Conjunto deportivo",
        categoria: "conjuntos",
        precio: 69900,
        imagen: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "deportivos",
        categoria: "pantalones",
        precio: 56900,
        imagen: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Blusa básica",
        categoria: "blusas",
        precio: 32900,
        imagen: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Blusa elegante",
        categoria: "blusas",
        precio: 39900,
        imagen: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Jogger",
        categoria: "otros",
        precio: 49900,
        imagen: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Buzo",
        categoria: "otros",
        precio: 45900,
        imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Falda",
        categoria: "otros",
        precio: 42900,
        imagen: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=90"
    },
    {
        nombre: "Short",
        categoria: "otros",
        precio: 36900,
        imagen: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=90"
    }
];

const contenedor = document.getElementById("productos");

function formatoPrecio(precio) {
    return precio.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

function mostrarProductos(filtro = "todos") {
    const lista = productos
        .map((producto, indice) => ({
            ...producto,
            id: indice
        }))
        .filter(producto =>
            filtro === "todos" || producto.categoria === filtro
        );

    contenedor.innerHTML = lista.map(producto => `
        <article class="producto">
            <div class="producto-foto">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='https://placehold.co/700x900/f9d8e2/35091b?text=Kayla+Boutique'"
                >

                <span class="etiqueta-nuevo">KAYLA ♡</span>
            </div>

            <div class="producto-info">
                <h3>${producto.nombre}</h3>

                <p class="tipo">${producto.categoria}</p>

                <p class="precio">
                    ${formatoPrecio(producto.precio)} COP
                </p>

                <button class="pedir" data-id="${producto.id}">
                    ♡ Pedir por WhatsApp
                </button>
            </div>
        </article>
    `).join("");
}

/* FILTROS DEL CATÁLOGO */

document.querySelectorAll("[data-filtro]").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll("[data-filtro]").forEach(elemento => {
            elemento.classList.remove("activo");
        });

        boton.classList.add("activo");
        mostrarProductos(boton.dataset.filtro);
    });
});

/* ENLACES DE LAS CATEGORÍAS */

document.querySelectorAll("[data-cat]").forEach(enlace => {
    enlace.addEventListener("click", () => {
        const categoria = enlace.dataset.cat;

        document.querySelectorAll("[data-filtro]").forEach(boton => {
            boton.classList.toggle(
                "activo",
                boton.dataset.filtro === categoria
            );
        });

        mostrarProductos(categoria);
    });
});

/* PEDIDOS POR WHATSAPP */

contenedor.addEventListener("click", evento => {
    const boton = evento.target.closest("[data-id]");

    if (!boton) return;

    const producto = productos[Number(boton.dataset.id)];

    const mensaje =
        "Hola, Kayla Boutique 💗. Quiero consultar la disponibilidad de " +
        producto.nombre +
        ". Precio: " +
        formatoPrecio(producto.precio) +
        " COP. ¿Me pueden dar más información?";

    const enlace =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(mensaje);

    window.open(enlace, "_blank");
});

/* MENÚ PARA CELULARES */

document.getElementById("menu").addEventListener("click", () => {
    document.getElementById("nav").classList.toggle("abierto");
});

document.querySelectorAll("#nav a").forEach(enlace => {
    enlace.addEventListener("click", () => {
        document.getElementById("nav").classList.remove("abierto");
    });
});

/* AÑO DEL PIE DE PÁGINA */

document.getElementById("year").textContent =
    new Date().getFullYear();

/* MOSTRAR PRODUCTOS AL CARGAR LA PÁGINA */

mostrarProductos();