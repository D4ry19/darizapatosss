// Sugerencias globales de estilos y marcas de zapatos
const globalSuggestions = [
    {
        keyword: "zapatos", suggestions: [
            "Zapatos de cuero",
            "Zapatos de tacón",
            "Zapatos Oxford",
            "Zapatos deportivos",
            "Zapatos casuales",
            "Zapatos Vans",
            "Zapatos Nike",
            "Zapatos Adidas",
            "Zapatos Puma"
        ]
    },
    {
        keyword: "tenis", suggestions: [
            "Tenis deportivos",
            "Tenis Converse",
            "Tenis Nike Air Max",
            "Tenis Adidas Superstar",
            "Tenis Reebok",
            "Tenis Puma"
        ]
    },
    {
        keyword: "zapatillas", suggestions: [
            "Zapatillas running",
            "Zapatillas Asics",
            "Zapatillas New Balance",
            "Zapatillas Skechers",
            "Zapatillas deportivas",
            "Zapatillas Fila"
        ]
    },
    {
        keyword: "sandalias", suggestions: [
            "Sandalias Birkenstock",
            "Sandalias de tacón",
            "Sandalias deportivas",
            "Sandalias Crocs"
        ]
    },
    {
        keyword: "botas", suggestions: [
            "Botas Timberland",
            "Botas Dr. Martens",
            "Botas de montaña",
            "Botas de lluvia"
        ]
    },
    {
        keyword: "mocasines", suggestions: [
            "Mocasines de cuero",
            "Mocasines casuales",
            "Mocasines Tommy Hilfiger"
        ]
    }
];

// Resultados simulados (pueden ser marcas, estilos, etc.)
const resultsDB = [
    {
        title: "Nike Air Max",
        desc: "Tenis deportivos icónicos que combinan confort y estilo."
    },
    {
        title: "Adidas Superstar",
        desc: "Zapatillas clásicas ideales para cualquier ocasión."
    },
    {
        title: "Zapatos Oxford",
        desc: "Elegantes zapatos de vestir para hombres y mujeres."
    },
    {
        title: "Zapatos de tacón",
        desc: "Variedad de estilos en tacones para eventos y fiestas."
    },
    {
        title: "Sandalias Birkenstock",
        desc: "Sandalias cómodas y modernas para verano."
    },
    {
        title: "Botas Timberland",
        desc: "Botas resistentes para aventuras urbanas y al aire libre."
    },
    {
        title: "Mocasines Tommy Hilfiger",
        desc: "Mocasines de calidad y estilo para tu día a día."
    }
];

// Palabras clave principales de búsqueda
const keywords = [
    "zapatos", "tenis", "zapatillas", "sandalias", "botas", "mocasines"
];

const searchInput = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');
const resultsDiv = document.getElementById('results');

// Encuentra sugerencias globales según lo escrito
function getSuggestions(query) {
    query = query.toLowerCase();
    let matched = [];
    for (let obj of globalSuggestions) {
        if (query.includes(obj.keyword)) {
            matched = matched.concat(obj.suggestions);
        }
    }
    // Sugerencias por coincidencia parcial en estilos y marcas
    let otherMatches = [];
    for (let obj of globalSuggestions) {
        for (let s of obj.suggestions) {
            if (s.toLowerCase().includes(query) && !matched.includes(s)) {
                otherMatches.push(s);
            }
        }
    }
    // Si no hay coincidencia directa, sugerir por coincidencia parcial
    return matched.concat(otherMatches).slice(0, 8);
}

// Muestra las sugerencias en el DOM
function showSuggestions(query) {
    const suggestions = getSuggestions(query);
    if (query.length < 2 || suggestions.length === 0) {
        suggestionsList.style.display = "none";
        suggestionsList.innerHTML = "";
        return;
    }
    suggestionsList.innerHTML = "";
    suggestions.forEach((sugg, idx) => {
        const li = document.createElement("li");
        li.textContent = sugg;
        li.tabIndex = 0;
        li.addEventListener("mousedown", () => {
            selectSuggestion(sugg);
        });
        suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = "block";
}

// Buscar resultados y mostrarlos
function showResults(query) {
    resultsDiv.innerHTML = "";
    let results = [];
    query = query.toLowerCase();
    // Si la búsqueda coincide con alguna palabra clave, mostrar resultados relacionados
    for (let obj of resultsDB) {
        if (
            obj.title.toLowerCase().includes(query) ||
            obj.desc.toLowerCase().includes(query)
        ) {
            results.push(obj);
        }
    }
    // Si no, mostrar resultados de estilos/marcas que coincidan
    for (let obj of globalSuggestions) {
        for (let s of obj.suggestions) {
            if (s.toLowerCase().includes(query)) {
                results.push({
                    title: s,
                    desc: `Explora diferentes modelos y estilos de ${s.toLowerCase()}.`
                });
            }
        }
    }
    // Eliminar duplicados
    const seen = new Set();
    results = results.filter(r => {
        if (seen.has(r.title)) return false;
        seen.add(r.title);
        return true;
    });
    // Mostrar resultados
    if (results.length === 0) {
        resultsDiv.innerHTML = "<div class='result-item'>No se encontraron resultados para tu búsqueda.</div>";
        return;
    }
    results.forEach(result => {
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML = `<div class="result-title">${result.title}</div>
      <div class="result-desc">${result.desc}</div>`;
        resultsDiv.appendChild(div);
    });
}

// Al seleccionar sugerencia
function selectSuggestion(sugg) {
    searchInput.value = sugg;
    suggestionsList.style.display = "none";
    showResults(sugg);
}

// Al escribir en la barra de búsqueda
searchInput.addEventListener("input", function (e) {
    showSuggestions(this.value);
    // Limpiar resultados si se borra la búsqueda
    if (this.value.length < 2) {
        resultsDiv.innerHTML = "";
    }
});

// Al presionar Enter en la barra de búsqueda
searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        suggestionsList.style.display = "none";
        showResults(this.value);
    }
});

// Cerrar sugerencias si se hace clic fuera
document.addEventListener('click', function (e) {
    if (!e.target.closest('.search-box')) {
        suggestionsList.style.display = "none";
    }
});