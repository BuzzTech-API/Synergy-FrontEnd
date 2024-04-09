import { Center } from "@chakra-ui/react";
import FormularioLogin from "./Components/formulario";


export default async function LoginPage() {

	return (
		<main>
			<Center pt={'12rem'}>
				<FormularioLogin />
			</Center>
		</main>
	)
}
