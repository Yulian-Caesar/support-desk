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