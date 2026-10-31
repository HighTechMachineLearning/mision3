export const urlUsgs = (periodo) =>
    `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_${periodo}.geojson`;

export const COLORES_NIVEL = {
    leve: "#2ecc71",
    moderado: "#f39c12",
    fuerte: "#e74c3c",
};

export const MAGNITUD_MINIMA = 2.5;
export const MAGNITUD_MAXIMA = 10;

export const RANGOS_NIVEL = {
    leve: [MAGNITUD_MINIMA, 3.99],
    moderado: [4, 5.99],
    fuerte: [6, MAGNITUD_MAXIMA],
};

export const FILTROS_INICIALES = {
    periodo: "day",
    magnitudMinima: MAGNITUD_MINIMA,
    magnitudMaxima: MAGNITUD_MAXIMA,
    lugar: "",
    soloTsunami: false,
};

export function nivelDeMagnitud(magnitud) {
    if (magnitud < 4) return "leve";
    if (magnitud < 6) return "moderado";
    return "fuerte";
}

export function aSismo({ id, properties, geometry }) {
    const [longitud, latitud, profundidad] = geometry.coordinates;
    return {
        id,
        lugar: properties.place,
        magnitud: properties.mag,
        tiempo: properties.time,
        profundidad,
        tsunami: properties.tsunami === 1,
        url: properties.url,
        longitud,
        latitud,
    };
}

export function filtrarSismos(sismos, { magnitudMinima, magnitudMaxima, lugar, soloTsunami }) {
    const textoLugar = lugar.trim().toLowerCase();

    return sismos.filter(
        (sismo) =>
            sismo.magnitud >= magnitudMinima &&
            sismo.magnitud <= magnitudMaxima &&
            sismo.lugar.toLowerCase().includes(textoLugar) &&
            (!soloTsunami || sismo.tsunami),
    );
}

export function calcularEstadisticas(sismos) {
    const porNivel = { leve: 0, moderado: 0, fuerte: 0 };
    for (const { magnitud } of sismos) {
        porNivel[nivelDeMagnitud(magnitud)]++;
    }

    if (sismos.length === 0) {
        return { total: 0, maxima: null, media: null, mediana: null, porNivel };
    }

    const magnitudes = sismos.map(({ magnitud }) => magnitud).toSorted((a, b) => a - b);
    const mitad = Math.floor(magnitudes.length / 2);
    const mediana =
        magnitudes.length % 2 === 0
            ? (magnitudes[mitad - 1] + magnitudes[mitad]) / 2
            : magnitudes[mitad];

    return {
        total: magnitudes.length,
        maxima: magnitudes.at(-1),
        media: magnitudes.reduce((suma, magnitud) => suma + magnitud, 0) / magnitudes.length,
        mediana,
        porNivel,
    };
}

export const tamanoMarcador = (magnitud) => 6 + (magnitud - 2.5) * 3;
