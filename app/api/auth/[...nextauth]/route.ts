import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"
import { BACKEND_URL } from "@/app/constants";

async function refreshToken(token: JWT): Promise<JWT> {
	try {
		const body = {refresh: token.backendTokens.refresh_token}
		
		const res = await fetch(BACKEND_URL + "/auth/refresh",
			{
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body)
			})
		if (res.ok) {
			const response = await res.json()
			return {
				...token,
				backendTokens: response,
			}
		} else {
			throw new Error(await res.text())
		}
	} catch (error) {
		console.log(error)
	} finally {
		return { ...token }
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: {
					label: "email",
					type: "email",
				},
				password: { label: "password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}
				const body = {
					"user_email": credentials.email,
					"user_password": credentials.password
				}

				try {

					const response = await fetch(BACKEND_URL + '/auth/login', {
						method: "POST",
						body: JSON.stringify(body),
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						}
					});
					if (response.status === 401) {
						return null;
					}
					const user = await response.json()

					return user;


				} catch (error) {
					console.log(error);

				}
			},
		})
	],
	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) return { ...token, ...user }
			if (new Date().getTime() < token.backendTokens.expiresIn) {
				console.log('access token ainda é valido');
				return token;
			}
			return await refreshToken(token)
		},

		async session({ token, session }) {
			session.user = token.user;
			session.backendTokens = token.backendTokens;

			return session;
		},

	}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
