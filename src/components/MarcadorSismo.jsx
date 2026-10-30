import { Marker } from "@vis.gl/react-maplibre";
import { COLORES_NIVEL, nivelDeMagnitud, tamanoMarcador } from "../utils/sismos.js";

export default function MarcadorSismo({ sismo }) {
    const { latitud, longitud, magnitud, lugar } = sismo;
    const diametro = tamanoMarcador(magnitud);

    return (
        <Marker longitude={longitud} latitude={latitud}>
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
