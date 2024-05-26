export interface Receptores {
	name: string,
	address: string
}
export interface EmailInfos {
	assunto: string,
	listaDePessoas: Receptores[],
	titulo: string,
	linkParaSala?: string,
	localizacaoSalaPresencial?: string,
}
