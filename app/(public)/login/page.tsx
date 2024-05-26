"use client"
import { Center } from "@chakra-ui/react";
import FormularioLogin from "./Components/formulario";


export default function LoginPage() {

	if (typeof window !== 'undefined') {
		localStorage.removeItem("zoom_token");
		localStorage.removeItem("zoom_refresh_token");
	  }

	return (
		<main>
			<Center pt={'12rem'}>
				<FormularioLogin />
			</Center>
		</main>
	)
}
