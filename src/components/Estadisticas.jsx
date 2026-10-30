import { COLORES_NIVEL } from "../utils/sismos.js";

const NIVELES = ["leve", "moderado", "fuerte"];

const formatear = (valor, decimales) => (valor === null ? "—" : valor.toFixed(decimales));

export default function Estadisticas({ estadisticas }) {
    const { total, maxima, media, mediana, porNivel } = estadisticas;

    return (
        <section className="estadisticas">
            <h2>Estadísticas</h2>
            <dl>
                <dt>Terremotos</dt>
                <dd>{total}</dd>
                <dt>Magnitud máxima</dt>
                <dd>{maxima ?? "—"}</dd>
                <dt>Magnitud media</dt>
                <dd>{formatear(media, 2)}</dd>
                <dt>Magnitud mediana</dt>
                <dd>{formatear(mediana, 2)}</dd>
            </dl>
            <h3>Por nivel</h3>
            <dl>
                {NIVELES.map((nivel) => (
                    <div key={nivel}>
                        <dt>
                            <span
                                className="punto"
                                aria-hidden="true"
                                style={{ backgroundColor: COLORES_NIVEL[nivel] }}
                            />
                            {nivel}
                        </dt>
                        <dd>{porNivel[nivel]}</dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
