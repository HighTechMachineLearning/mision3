import "./App.css";
import Globo from "./components/Globo.jsx";
import { useFetch } from "./hooks/useFetch.js";
import { aSismo, urlUsgs } from "./utils/sismos.js";

export default function App() {
    const { datos } = useFetch(urlUsgs("day"));
    const sismos = datos?.features.map(aSismo) ?? [];
    return (
        <main className="globo">
            <Globo sismos={sismos} />
        </main>
    );
}
