import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: { label: "Senha", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}
				const { email, password } = credentials;
				const response = await fetch('http://localhost:5000/auth/login', {
					method: "POST",
					body: JSON.stringify({
						user_email: email,
						user_password: password,
					}),
					headers: {
						"Content-Type": "application/json",
					}
				});
				if (response.status === 401) {
					return null;
				}
				const user = await response.json()
				return user;
			},
		})
	]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
