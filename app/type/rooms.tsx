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


export interface VirtualRoom {
	virtual_room_id: number
	virtual_room_name: string
	virtual_room_link: string
	is_active: boolean
	virtual_room_permission_level: number
	reservation: Reservation[]
}


export interface UpdatePhysicalRoom {
	physical_room_id: number
	physical_room_name: string
	physical_room_permission_level: number
	physical_room_vacancies: number
	physical_room_address: string
}