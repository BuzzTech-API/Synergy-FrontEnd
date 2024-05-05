import { PhysicalRooms } from "@/app/type/rooms";


export default function getAvailableTimes(room: PhysicalRooms, date: string): { roomId: number, availableTimes: { start: string, end: string }[] } {

    const reservations = room.reservation.filter(reserve => {
        const data1 = new Date(reserve.reserve_date).toISOString()
        const data2 = new Date(date + "T00:00:00.000Z").toISOString()

        return data1 === data2
    })

    const availableTimes = []
    let startTime = date + "T00:00:00.000Z"
    let endTime = date + "T23:59:00.000Z"

    for (const reserve of reservations) {
        if (reserve.reserve_start > startTime) {
            availableTimes.push({ start: startTime, end: reserve.reserve_start })
        }
        startTime = reserve.reserve_end
    }

    if (startTime < endTime) {
        availableTimes.push({ start: startTime, end: endTime })
    }

    return { roomId: room.physical_room_id, availableTimes }
}