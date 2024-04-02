import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Img } from "@chakra-ui/react";

export default function NavbarRoot() {
    return (
        <Flex
            w='100vw'
            h='10rem'
            bg='white'
            p='24'
            alignItems='center'
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            backgroundRepeat='no-repeat'
            backgroundSize='100% auto'
            backgroundPosition='bottom'
            backgroundImage="/img-navbar.png">
            <Flex
                minW='50%'
                alignItems='center'>
                <IconButton
                    aria-label='menu-navbar'
                    boxSize={35}
                    icon={<HamburgerIcon boxSize={35} />}
                    bg='none'
                    _hover={{ bg: 'none' }} />
                <Box
                    pl='15rem'
                    fontSize='30px'>LOGO
                </Box>
            </Flex>
            <Flex
                minW='50%'
                justifyContent='end'
                fontSize='30px'>
                USER
            </Flex>
        </Flex>
    )
}