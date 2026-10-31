import Estadisticas from "./Estadisticas.jsx";
import Filtros from "./Filtros.jsx";

export default function PanelLateral({
    filtros,
    onCambiarFiltros,
    onFiltrarMagnitud,
    cargando,
    error,
    onReintentar,
    estadisticas,
}) {
    return (
        <aside className="panel">
            <h1>Sismo Radar</h1>
            <Filtros filtros={filtros} onChange={onCambiarFiltros} />
            {cargando && <p role="status">Cargando…</p>}
            {error && (
                <div role="alert">
                    <p>No se pudieron cargar los sismos.</p>
                    <button type="button" onClick={onReintentar}>
                        Reintentar
                    </button>
                </div>
            )}
            {!cargando && !error && (
                <>
                    {estadisticas.total === 0 && <p>Ningún sismo coincide con los filtros.</p>}
                    <Estadisticas estadisticas={estadisticas} onFiltrarMagnitud={onFiltrarMagnitud} />
                </>
            )}
        </aside>
    );
}
