
export type Reserva = {
	reserve_id: number;
	reserve_date: string;
	reserve_start: string;
	reserve_end: string;
};

export type Reuniao = {
	meeting_id: number;
	meeting_title: string;
	meeting_subject: string;
	meeting_type: string;
	reservations: Reserva;
};

export type Participacao = {
	user_id: number;
	user: User;
	meeting_id: number;
	user_status: string;
	meetings: Reuniao;
};

export type User = {
	user_id: number;
	user_permission_level: number;
	user_email: string;
	user_board: string;
	user_name: string;
	is_active: boolean;
	reservations: Reserva[];
	participate: Participacao[];
};

