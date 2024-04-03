'use client'
import { InputPV } from "./components/inputs";
import { SwitchPV } from "./components/switch/Switch";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>

        {/* Teste Switch */}
       <SwitchPV/>
       <InputPV variant={'error'} />

      </div>
    </main>
  );
}
