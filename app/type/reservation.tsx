export type CreateReservationsVirtualParams = {
    reserve_date: Date
    reserve_start: Date
    reserve_end: Date
    virtual_room_id: number
}

export type Reservation = {
    reserve_id: number
    reserve_date: string
    reserve_start: string
    reserve_end: string
}