import { BigBtnAgendamentos } from "./components/buttons/BigBtns/BigBtnAgendamentos";
import { BigBtnAgendar } from "./components/buttons/BigBtns/BigBtnAgendar";
import { BigBtnCadSalas } from "./components/buttons/BigBtns/BigBtnCadSalas";
import { BigBtnCadUsuario } from "./components/buttons/BigBtns/BigBtnCadUsuario";
import { BigBtnVisuSalas } from "./components/buttons/BigBtns/BigBtnVisuSalas";
import { BigBtnVisuUsuarios } from "./components/buttons/BigBtns/BigBtnVisuUsuarios";
import { BtnAdicionar2 } from "./components/buttons/BtnAdicionar2";
import { BtnCancelar } from "./components/buttons/IconBtns/BtnDesmarcar&Cancelar";
import { BtnEditar } from "./components/buttons/IconBtns/BtnEditar&Salvar";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <>
      <BtnEditar/>
      <BtnCancelar/>
      </>
    </main>
  );
}
