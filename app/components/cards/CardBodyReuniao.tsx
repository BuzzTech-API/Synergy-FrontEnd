
'use client'

import { Button, CardBody, Center, Flex, Heading, Link, Text, Stack, CardFooter, Grid, GridItem, Box, Divider} from "@chakra-ui/react";
import NextLink from 'next/link'
import { ReactNode } from "react";
import { HiUserGroup} from "react-icons/hi2";
import { GiLaptop } from "react-icons/gi";
import { RiHomeOfficeFill } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { FaHourglassStart } from "react-icons/fa";
import { FaHourglassEnd } from "react-icons/fa";

type props = {
	tipo: string,
	descricao: string,
	tituloReuniao: string,
	children: ReactNode,
	data: string,
	horaInicio: string,
	horaFim: string,
}

export function CardBodyReuniao({tipo, descricao, tituloReuniao, children, data, horaInicio, horaFim }: props) {
	if (tipo === 'Presencial'){
		return (
			<CardBody
				position={'relative'}
				zIndex={3}
				mt={'-2rem'}
			>
			<Stack>
				<CardBody>
					<Heading marginTop="-1rem" fontWeight={1} size='md' paddingBottom="1rem">{tituloReuniao}</Heading>
					<Grid 
						w='35rem'
						h='100%'
						templateRows='auto auto 2rem 10rem auto'
						templateColumns='repeat(2, 1fr)'
						gap={1}
						>
						<GridItem
							h={"auto"}
							colSpan={1}
							alignItems="center">
							<Grid
								templateRows='repeat(2, 1fr)'
								templateColumns='repeat(3, 1fr)'>
									<GridItem
										colSpan={1}
										alignItems="center">
										<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Data: </Heading>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center">{data}</Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center"><FaCalendarAlt /></Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center">
										<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Tipo: </Heading>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center">{tipo}</Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center"><HiUserGroup/></Text>
									</GridItem>
							</Grid>
						</GridItem>
						<GridItem
							h={"auto"}
							colSpan={1}
							alignItems="center">
							<Grid
									templateRows='repeat(2, 1fr)'
									templateColumns='repeat(3, 1fr)'>
										<GridItem
											colSpan={1}
											alignItems="center">
											<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Inicio: </Heading>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text>{horaInicio}</Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text display="flex" gap="1rem" alignItems="center"><FaHourglassStart /></Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center">
											<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Término:</Heading>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text>{horaFim}</Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text display="flex" gap="1rem" alignItems="center"><FaHourglassEnd /></Text>
										</GridItem>
								</Grid>
						</GridItem>
						<GridItem colSpan={2}>
							<Divider my={1} borderColor="#2F4F4F30" borderWidth="1px" borderStyle="solid" />
						</GridItem>
						<GridItem
							colSpan={2}>
								<Text fontWeight={"bold"}>
									Descrição: 
								</Text>
						</GridItem>
						<GridItem
							marginTop={"-0.7rem"}
							h={"auto"}
							overflow={"auto"}
							colSpan={2}
							justifyContent="center"
							alignItems="center"
							pl = "1rem">
								<Text>
									{descricao}
								</Text>
						</GridItem>
						<GridItem
							h='3rem'
							display='flex'
							colSpan={2}
							justifyContent="center"
							alignItems="center"
							gap = "10"
							padding = "1rem">
								{children}
						</GridItem>
					</Grid>
				</CardBody>
			</Stack>
		</CardBody>
		);
	} else if (tipo === "Virtual"){
		return (
			<CardBody
				position={'relative'}
				zIndex={3}
				mt={'-2rem'}
			>
			<Stack>
				<CardBody>
					<Heading marginTop="-1rem" fontWeight={1} size='md' paddingBottom="1rem">{tituloReuniao}</Heading>
					<Grid 
						w='35rem'
						h='100%'
						templateRows='auto auto 2rem 10rem auto'
						templateColumns='repeat(2, 1fr)'
						gap={1}
						>
						<GridItem
							h={"auto"}
							colSpan={1}
							alignItems="center">
							<Grid
								templateRows='repeat(2, 1fr)'
								templateColumns='repeat(3, 1fr)'>
									<GridItem
										colSpan={1}
										alignItems="center">
										<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Data: </Heading>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center">{data}</Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center"><FaCalendarAlt /></Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center">
										<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Tipo: </Heading>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center">{tipo}</Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center"><HiUserGroup/></Text>
									</GridItem>
							</Grid>
						</GridItem>
						<GridItem
							h={"auto"}
							colSpan={1}
							alignItems="center">
							<Grid
									templateRows='repeat(2, 1fr)'
									templateColumns='repeat(3, 1fr)'>
										<GridItem
											colSpan={1}
											alignItems="center">
											<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Inicio: </Heading>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text>{horaInicio}</Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text display="flex" gap="1rem" alignItems="center"><FaHourglassStart /></Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center">
											<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Término:</Heading>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text>{horaFim}</Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text display="flex" gap="1rem" alignItems="center"><FaHourglassEnd /></Text>
										</GridItem>
								</Grid>
						</GridItem>
						<GridItem colSpan={2}>
							<Divider my={1} borderColor="#2F4F4F30" borderWidth="1px" borderStyle="solid" />
						</GridItem>
						<GridItem
							colSpan={2}>
								<Text fontWeight={"bold"}>
									Descrição: 
								</Text>
						</GridItem>
						<GridItem
							marginTop={"-0.7rem"}
							h={"auto"}
							overflow={"auto"}
							colSpan={2}
							justifyContent="center"
							alignItems="center"
							pl = "1rem">
								<Text>
									{descricao}
								</Text>
						</GridItem>
						<GridItem
							h='3rem'
							display='flex'
							colSpan={2}
							justifyContent="center"
							alignItems="center"
							gap = "10"
							padding = "1rem">
								{children}
						</GridItem>
					</Grid>
				</CardBody>
			</Stack>
		</CardBody>
		);
	} else {
		return (
			<CardBody
				position={'relative'}
				zIndex={3}
				mt={'-2rem'}
			>
			<Stack>
				<CardBody>
					<Heading marginTop="-1rem" fontWeight={1} size='md' paddingBottom="1rem">{tituloReuniao}</Heading>
					<Grid 
						w='35rem'
						h='100%'
						templateRows='auto auto 2rem 10rem auto'
						templateColumns='repeat(2, 1fr)'
						gap={1}
						>
						<GridItem
							h={"auto"}
							colSpan={1}
							alignItems="center">
							<Grid
								templateRows='repeat(2, 1fr)'
								templateColumns='repeat(3, 1fr)'>
									<GridItem
										colSpan={1}
										alignItems="center">
										<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Data: </Heading>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center">{data}</Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center"><FaCalendarAlt /></Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center">
										<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Tipo: </Heading>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center">{tipo}</Text>
									</GridItem>
									<GridItem 
										colSpan={1}
										display={"flex"}
										alignItems="center"
										justifyContent="center">
										<Text display="flex" gap="1rem" alignItems="center"><HiUserGroup/></Text>
									</GridItem>
							</Grid>
						</GridItem>
						<GridItem
							h={"auto"}
							colSpan={1}
							alignItems="center">
							<Grid
									templateRows='repeat(2, 1fr)'
									templateColumns='repeat(3, 1fr)'>
										<GridItem
											colSpan={1}
											alignItems="center">
											<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Inicio: </Heading>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text>{horaInicio}</Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text display="flex" gap="1rem" alignItems="center"><FaHourglassStart /></Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center">
											<Heading fontWeight={1} fontSize={'1rem'} mr={"3rem"} ml={"1rem"}>Término:</Heading>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text>{horaFim}</Text>
										</GridItem>
										<GridItem 
											colSpan={1}
											display={"flex"}
											alignItems="center"
											justifyContent="center">
											<Text display="flex" gap="1rem" alignItems="center"><FaHourglassEnd /></Text>
										</GridItem>
								</Grid>
						</GridItem>
						<GridItem colSpan={2}>
							<Divider my={1} borderColor="#2F4F4F30" borderWidth="1px" borderStyle="solid" />
						</GridItem>
						<GridItem
							colSpan={2}>
								<Text fontWeight={"bold"}>
									Descrição: 
								</Text>
						</GridItem>
						<GridItem
							marginTop={"-0.7rem"}
							h={"auto"}
							overflow={"auto"}
							colSpan={2}
							justifyContent="center"
							alignItems="center"
							pl = "1rem">
								<Text>
									{descricao}
								</Text>
						</GridItem>
						<GridItem
							h='3rem'
							display='flex'
							colSpan={2}
							justifyContent="center"
							alignItems="center"
							gap = "10"
							padding = "1rem">
								{children}
						</GridItem>
					</Grid>
				</CardBody>
			</Stack>
		</CardBody>
		);
	}
}