export const calcularReserveEnd = (reserve_date: string, reserve_inicio: string, reserve_duração: string) => {
    const [horasInicio, minutosInicio] = reserve_inicio.split(":").map(Number)
    const [horasDuracao, minutosDuracao] = reserve_duração.split(":").map(Number)

    const totalMinutos = horasInicio * 60 + minutosInicio + horasDuracao * 60 + minutosDuracao

    const horasEnd = Math.floor(totalMinutos / 60)
    const minutosEnd = totalMinutos % 60

    const reserve_end = new Date(reserve_date)
    
    reserve_end.setDate(reserve_end.getDate() + 1)

    reserve_end.setHours(horasEnd, minutosEnd)

    return reserve_end
}
