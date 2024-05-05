import { Reservation } from "./reservation"

export interface PhysicalRooms {
    physical_room_id: number
    physical_room_name: string
    physical_room_permission_level: number
    physical_room_vacancies: number
    physical_room_address: string
    is_active: boolean
    reservation: Reservation[]
}