import { BtnAddPresencial, BtnAddVirtual } from "./components/buttons/BtnAddPresencial&Virtual";
import { BtnAgendar, BtnReagendar } from "./components/buttons/BtnAgendar&Reagendar";
import { BtnCriarSala, BtnCriarUsuario } from "./components/buttons/BtnCriarSala&Usuario";
import { BtnCancelar, BtnDesmarcar } from "./components/buttons/BtnDesmarcar&Cancelar";
import { BtnEditar, BtnSalvar } from "./components/buttons/BtnEditar&Salvar";
import { BtnEntrar, BtnRemover } from "./components/buttons/BtnRemover&Entrar";
import { BtnAdicionar} from "./components/buttons/BtnsAdicionar";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <>
      <BtnAdicionar/>
      </>
    </main>
  );
}
