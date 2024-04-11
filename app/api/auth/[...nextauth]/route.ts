import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

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

					// const response = await fetch('http://localhost:5000/auth/login', { //Para pessoas rodando sem docker
					const response = await fetch('http://backend:5000/auth/login', {
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
			return token;
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
