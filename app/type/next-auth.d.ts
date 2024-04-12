import NextAuth from "next-auth/next";

declare module "next-auth" {
	interface Session {
		user: {
			user_id: number,
			user_name: string,
			user_email: string,
			user_permission_level: number
		},
		backendTokens: {
			access_token: string,
			refresh_token: string,
			expiresIn: number
		},

	}
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
	interface JWT {
		user: {
			user_id: number,
			user_name: string,
			user_email: string,
			user_permission_level: number
		},
		backendTokens: {
			access_token: string,
			refresh_token: string
			expiresIn: number
		},
	}

}
