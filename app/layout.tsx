import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./chakraConfigs/Providers";
import AuthProviders from "./components/AutenticationProviders";

const poppins = Poppins({ weight: '300', subsets: ['latin'] });

export const metadata: Metadata = {
	title: "Synergy",
	description: "Sincronizando suas Reuniões"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={poppins.className}><AuthProviders><Providers>{children}</Providers></AuthProviders></body>
		</html>
	);
}
