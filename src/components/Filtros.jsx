import { MAGNITUD_MAXIMA, MAGNITUD_MINIMA, PASO_MAGNITUD } from "../utils/sismos.js";

const PERIODOS = [
    { valor: "hour", etiqueta: "Última hora" },
    { valor: "day", etiqueta: "24 horas" },
    { valor: "week", etiqueta: "7 días" },
    { valor: "month", etiqueta: "30 días" },
];

function SliderMagnitud({ etiqueta, valor, onChange }) {
    return (
        <label>
            {etiqueta}: {valor.toFixed(2)}
            <input
                type="range"
                min={MAGNITUD_MINIMA}
                max={MAGNITUD_MAXIMA}
                step={PASO_MAGNITUD}
                value={valor}
                onChange={(evento) => onChange(Number(evento.target.value))}
            />
        </label>
    );
}

export default function Filtros({ filtros, onChange }) {
    const { periodo, magnitudMinima, magnitudMaxima, lugar, soloTsunami } = filtros;

    return (
        <section className="filtros">
            <h2>Filtros</h2>

            <label>
                Periodo
                <select
                    value={periodo}
                    onChange={(evento) => onChange({ ...filtros, periodo: evento.target.value })}
                >
                    {PERIODOS.map(({ valor, etiqueta }) => (
                        <option key={valor} value={valor}>
                            {etiqueta}
                        </option>
                    ))}
                </select>
            </label>

            <SliderMagnitud
                etiqueta="Magnitud mínima"
                valor={magnitudMinima}
                onChange={(valor) => onChange({ ...filtros, magnitudMinima: Math.min(valor, magnitudMaxima) })}
            />

            <SliderMagnitud
                etiqueta="Magnitud máxima"
                valor={magnitudMaxima}
                onChange={(valor) => onChange({ ...filtros, magnitudMaxima: Math.max(valor, magnitudMinima) })}
            />

            <label>
                Lugar
                <input
                    type="search"
                    value={lugar}
                    onChange={(evento) => onChange({ ...filtros, lugar: evento.target.value })}
                />
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={soloTsunami}
                    onChange={(evento) => onChange({ ...filtros, soloTsunami: evento.target.checked })}
                />
                Solo con aviso de tsunami
            </label>
        </section>
    );
}
