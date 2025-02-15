export type LoginFormType = {
	email: string,
	password: string,
}

export type RegisterFormType = LoginFormType & {
	name: string,
	password2: string,
}

export type RegisterFormConfirmType = RegisterFormType & {
	password2: string,
}

export type TicketsType = {
	tickets: TicketType[];
	ticket: TicketType | null,
	isError: boolean,
	isSuccess: boolean,
	isLoading: boolean,
	message: string,
}

export type TicketFormType = {
	product: 'iPhone' | 'Macbook Pro' | 'iMac' | 'iPad',
	description: string
}

export type TicketType = TicketFormType & {
	_id: string,
	user: string,
	status: 'new' | 'open' | 'closed',
	createdAt: string,
	updatedAt: string,
}

export type NotesType = {
	notes: NoteType[];
	isError: boolean,
	isSuccess: boolean,
	isLoading: boolean,
	message: string,
}

export type NoteType = {
	_id: string,
	user: string,
	ticket: string,
	text: string,
	isStaff: boolean,
	createdAt: string,
	updatedAt: string,
}