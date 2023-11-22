import { lugares } from "../components/Lugares/Lugares";
import Seccion from "../components/Seccion/Seccion";

export default function Home() {
  return (
    <div>
      <Seccion title="Lugares" lugares={lugares}></Seccion>
    </div>
  );
}
