import { CardHeader } from "@chakra-ui/react";
import CardRoot from "./CardRoot";
import { CardBodySala } from "./CardBodySala";
import { CardBodyDeitado } from "./CardBodyDeitado";
import { CardBodySalaAdm } from "./CardBodySalaAdm";
import { CardBodyReuniao } from "./CardBodyReuniao";
import { CardReunionHeader } from "./CardReunionHeader";
import { CardPhysicalHeader } from "./CardPhysicalHeader";
import { CardVirtualHeader } from "./CardVirtualHeader";
import { CardBodySalaVirtual } from "./CardBodySalaVirtual";

export const Cards = {
	Root: CardRoot,
	HeaderGeneric: CardHeader,            //Ivan: Um tipo de Carde genérico que usa o CardHeader do próprio Chakra
	HeaderPhysical: CardPhysicalHeader,   //Ivan: Este é o Cabeçalho dos Cards de Sala Física, que aparecem no "Formulário de Agendamento de Reuniões Presenciais".
	HeaderVirtual: CardVirtualHeader,     //Ivan: Este é o Cabeçalho dos Cards de Sala Física, que aparecem no "Formulário de Agendamento de Reuniões Virtuais".
	HeaderReunion: CardReunionHeader,	  //Ivan: Este é o Cabeçalho dos Cards de Reunião, que aparecem na página de "Meus Agendamentos"
	BodySala: CardBodySala,
	BodySalaVirtual: CardBodySalaVirtual,
	BodyDeitado: CardBodyDeitado,
	BodySalaAdm: CardBodySalaAdm,
	BodyReuniao: CardBodyReuniao,
}
