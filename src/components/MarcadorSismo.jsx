import { Marker } from "@vis.gl/react-maplibre";
import { COLORES_NIVEL, nivelDeMagnitud, tamanoMarcador } from "../utils/sismos.js";

export default function MarcadorSismo({ sismo, onClick }) {
    const { latitud, longitud, magnitud, lugar } = sismo;
    const diametro = tamanoMarcador(magnitud);

    function manejarClick(evento) {
        // Evita que el click llegue al mapa, que cerraría el popup recién abierto
        evento.originalEvent.stopPropagation();
        onClick();
    }
    
    return (
        <Marker longitude={longitud} latitude={latitud} onClick={manejarClick}>
            <button
                type="button"
                className="marcador"
                aria-label={`Magnitud ${magnitud}, ${lugar}`}
                style={{
                    width: diametro,
                    height: diametro,
                    backgroundColor: COLORES_NIVEL[nivelDeMagnitud(magnitud)],
                }}
            />
        </Marker>
    );
}
